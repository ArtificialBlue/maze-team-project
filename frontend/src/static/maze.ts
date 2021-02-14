console.log('Starting canvas game...')

/* General vector class for physics calculations */
class Vector {
  // Instance properties
  x_component: number
  y_component: number

  // Instantiation methods
  constructor(x: number, y: number) {
    this.x_component = x
    this.y_component = y
  }

  // Accessors
  get x(): number {
    return this.x_component
  }

  get y(): number {
    return this.y_component
  }

  get mag(): number {
    return Math.sqrt((this.x_component ^ 2) + (this.y_component ^ 2))
  }

  get dir(): number {
    return Math.atan(this.y_component / this.x_component)
  }

  // Modifiers
  update(new_x: number, new_y: number): void {
    this.x_component = new_x
    this.y_component = new_y
  }
}

/* This class will represent our base class for everything we draw on the screen */
class Sprite {
  // Instance properties
  position: Vector
  prevPosition: Vector
  velocity: Vector
  size: Vector
  color: string
  movable: boolean

  // Instantiation
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
    movable: boolean
  ) {
    this.position = new Vector(x, y)
    this.prevPosition = new Vector(x, y)
    this.velocity = new Vector(0, 0)
    this.size = new Vector(width, height)
    this.color = color
    this.movable = movable
  }

  // Accessors
  get x(): number {
    return this.position.x
  }

  get y(): number {
    return this.position.y
  }

  get width(): number {
    return this.size.x
  }

  get height(): number {
    return this.size.y
  }

  // Modifiers
  updatePosition(delta: Vector): void {
    if (this.movable) {
      const new_x = this.x + delta.x
      const new_y = this.y + delta.y
      this.prevPosition = new Vector(this.x, this.y)
      this.position.update(new_x, new_y)
    }
  }

  setPosition(newPos: Vector): void {
    if (this.movable) {
      this.position.update(newPos.x, newPos.y)
    }
  }

  revertPosition(): void {
    if (this.movable) {
      this.position.update(this.prevPosition.x, this.prevPosition.y)
    }
  }

  updateVelocity(delta: Vector): void {
    if (this.movable) {
      const new_x = this.velocity.x + delta.x
      const new_y = this.velocity.y + delta.y
      this.velocity.update(new_x, new_y)
    }
  }

  setColor(color: string): void {
    this.color = color
  }

  // Check for collisions
  checkCollision(target: Sprite): boolean {
    if (
      this.position.x + this.size.x > target.position.x &&
      this.position.x < target.position.x + target.size.x
    ) {
      if (
        this.position.y + this.size.y > target.position.y &&
        this.position.y < target.position.y + target.size.y
      ) {
        return true
      }
    }
    return false
  }

  // Render
  draw(ctx: CanvasRenderingContext2D): void {
    // Draw the object using our instance properties
    ctx.beginPath()
    ctx.rect(this.x, this.y, this.width, this.height)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.closePath()
  }

  // Updating position for sprite will utilize velocity
  move() {
    this.updatePosition(this.velocity)
  }
  moveX() {
    this.updatePosition(new Vector(this.velocity.x, 0))
  }
  moveY() {
    this.updatePosition(new Vector(0, this.velocity.y))
  }
}

class MazeGame {
  // Instance properties
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  canvasBounds: Array<Sprite>
  maze: Array<Sprite>
  player: Sprite
  winArea: Sprite
  speed: number
  isWon: boolean
  theme: string

  constructor(canvas: HTMLCanvasElement, mazeData: Array<string>) {
    const style = getComputedStyle(document.body)
    this.theme = style.getPropertyValue('--device-theme')
    this.canvas = canvas!
    this.canvas.width = 400
    this.canvas.height = 400
    this.ctx = this.canvas.getContext('2d')!
    this.canvasBounds = [
      new Sprite(-100, -100, 100, this.canvas.height + 100, 'none', false),
      new Sprite(-100, -100, this.canvas.width + 100, 100, 'none', false),
      new Sprite(
        this.canvas.width,
        -100,
        100,
        this.canvas.height + 100,
        'none',
        false
      ),
      new Sprite(
        -100,
        this.canvas.height,
        this.canvas.width + 100,
        100,
        'none',
        false
      ),
    ]
    const bricks: Array<Sprite> = []
    const numCols: number = Math.sqrt(mazeData.length)
    const brickSize: number = this.canvas.width / numCols
    let col: number = 0
    let row: number = 0
    let winAreaPos = { x: 0, y: 0 }
    let playerPos = { x: -10, y: 0 }
    mazeData.forEach((bit) => {
      const x: number = col * brickSize
      const y: number = row * brickSize
      if (bit === '2') {
        if (playerPos.x < 0) {
          // Player has not been placed, meaning this is the first 2
          playerPos = { x, y }
        } else {
          // Player has been placed, time to place win area
          winAreaPos = { x, y }
        }
      }
      if (bit === '1') {
        bricks.push(
          new Sprite(
            x,
            y,
            brickSize - 1,
            brickSize - 1,
            style.getPropertyValue('--color-maze-bricks'),
            false
          )
        )
      }
      col++
      if (col >= numCols) {
        col = 0
        row++
      }
    })

    this.winArea = new Sprite(
      winAreaPos.x,
      winAreaPos.y,
      brickSize,
      brickSize,
      style.getPropertyValue('--color-maze-winarea'),
      false
    )
    this.player = new Sprite(
      playerPos.x,
      playerPos.y,
      brickSize * 0.75,
      brickSize * 0.75,
      style.getPropertyValue('--color-maze-player'),
      true
    )
    // define player speed
    this.speed = 4

    this.maze = bricks
    this.isWon = false
  }

  // Note: lamba syntax is required here to make sure the 'this' context persists through animation frames
  setup = (): void => {
    this.maze.forEach((brick) => {
      brick.draw(this.ctx)
    })

    this.winArea.draw(this.ctx)
  }

  animationLoop = (): void => {
    const { ctx, maze, player, canvasBounds, winArea } = this
    const style = getComputedStyle(document.body)

    // Clear canvas for redrawing
    ctx.clearRect(
      Math.floor(player.x),
      Math.floor(player.y),
      player.size.x,
      player.size.y
    )

    // Update colors on theme change
    if (style.getPropertyValue('--device-theme') !== this.theme) {
      player.setColor(style.getPropertyValue('--color-maze-player'))
      winArea.setColor(style.getPropertyValue('--color-maze-winarea'))
      ctx.clearRect(winArea.x, winArea.y, winArea.size.x, winArea.size.y)
      winArea.draw(ctx)
      maze.forEach((brick) => {
        // Set brick color
        brick.setColor(style.getPropertyValue('--color-maze-bricks'))
        ctx.clearRect(brick.x, brick.y, brick.size.x, brick.size.y)
        brick.draw(ctx)
      })
      this.theme = style.getPropertyValue('--device-theme')
    }

    // Move player, then check/handle collisions, then draw player
    player.moveX()

    canvasBounds.forEach((wall) => {
      if (player.checkCollision(wall)) {
        player.revertPosition()
      }
    })

    // Check wall brick collisions
    maze.forEach((brick) => {
      if (player.checkCollision(brick)) {
        //player.revertPosition()
        if (player.velocity.x > 0) {
          // player is moving rightward, move back to left side of wall
          const newPos = new Vector(brick.x - player.size.x, player.y)
          player.setPosition(newPos)
        } else {
          // player is moving leftward, move back to right side of wall
          const newPos = new Vector(brick.x + brick.size.x, player.y)
          player.setPosition(newPos)
        }
      }
    })

    player.moveY()

    canvasBounds.forEach((wall) => {
      if (player.checkCollision(wall)) {
        player.revertPosition()
      }
    })

    // Check wall bricks collisions
    maze.forEach((brick) => {
      if (player.checkCollision(brick)) {
        //player.revertPosition()
        if (player.velocity.y > 0) {
          // player is moving downward, move back to top side of wall
          const newPos = new Vector(player.x, brick.y - player.size.y)
          player.setPosition(newPos)
        } else {
          // player is moving upward, move back to bottom side of wall
          const newPos = new Vector(player.x, brick.y + brick.size.y)
          player.setPosition(newPos)
        }
      }
    })

    player.draw(ctx)

    // Check win condition
    if (player.checkCollision(winArea)) {
      // Win
      this.isWon = true
    }
  }

  keyDownHandler = (e: KeyboardEvent): void => {
    const { player, speed } = this
    const key = e.key.toLowerCase()
    if (key === 'd' || key === 'arrowright') {
      if (this.player.velocity.x <= 0) {
        player.updateVelocity(new Vector(speed, 0))
      }
    } else if (key === 'a' || key === 'arrowleft') {
      if (player.velocity.x >= 0) {
        player.updateVelocity(new Vector(-speed, 0))
      }
    } else if (key === 'w' || key === 'arrowup') {
      if (player.velocity.y >= 0) {
        player.updateVelocity(new Vector(0, -speed))
      }
    } else if (key === 's' || key === 'arrowdown') {
      if (player.velocity.y <= 0) {
        player.updateVelocity(new Vector(0, speed))
      }
    }
  }

  keyUpHandler = (e: KeyboardEvent): void => {
    const { player, speed } = this
    if (e.key === 'd' || e.key === 'ArrowRight') {
      if (player.velocity.x >= 0) {
        player.updateVelocity(new Vector(-speed, 0))
      }
    } else if (e.key === 'a' || e.key === 'ArrowLeft') {
      if (player.velocity.x <= 0) {
        player.updateVelocity(new Vector(speed, 0))
      }
    } else if (e.key === 'w' || e.key === 'ArrowUp') {
      if (player.velocity.y <= 0) {
        player.updateVelocity(new Vector(0, speed))
      }
    } else if (e.key === 's' || e.key === 'ArrowDown') {
      if (player.velocity.y >= 0) {
        player.updateVelocity(new Vector(0, -speed))
      }
    }
  }
}

export default MazeGame
