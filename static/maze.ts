/* Upper level interface for all objects within our game
interface RenderableObject {
  // Properties for all renderable objects
   position:Vector;
   size:Vector;
   color:string;
   movable:boolean;

   // We need to be able to change the position
   // Always return the new position
   updatePosition(delta:Vector):Vector;

   // Check for collision between this object and a specified object
   // Based on both objects positions and sizes
   checkCollision(target:RenderableObject):boolean;

   // Every drawn object needs to have some logic that draws it
   // Dependency injection is the canvas context
   draw(ctx:CanvasRenderingContext2D):void;
}
*/

/* General vector class for physics calculations */
class Vector {
    // Instance properties
    x_component:number;
    y_component:number;

    // Instantiation methods
    constructor(x:number, y:number) {
        this.x_component = x;
        this.y_component = y;
    }

    // Accessors
    get x():number {
        return this.x_component;
    }

    get y():number {
        return this.y_component;
    }

    get mag():number {
        return Math.sqrt((this.x_component ^ 2) + (this.y_component ^ 2));
    }

    get dir():number {
        return Math.atan(this.y_component / this.x_component);
    }

    // Modifiers
    update(new_x:number, new_y:number):void {
        this.x_component = new_x;
        this.y_component = new_y;
    }
}

/* This class will represent our base class for everything we draw on the screen */
class Sprite {
    // Instance properties
    position:Vector;
    prevPosition:Vector;
    velocity:Vector;
    size:Vector;
    color:string;
    movable:boolean;

    // Instantiation
    constructor(x:number, y:number, width:number, height:number, color:string, movable:boolean) {
        this.position = new Vector(x, y);
        this.velocity = new Vector(0, 0);
        this.size = new Vector(width, height);
        this.color = color;
        this.movable = movable;
    }

    // Accessors
    get x():number{
        return this.position.x;
    }

    get y():number {
        return this.position.y;
    }

    get width():number {
        return this.size.x;
    }

    get height():number {
        return this.size.y;
    }

    // Modifiers
    updatePosition(delta:Vector):Vector {
        if(this.movable) {
            const new_x = this.x + delta.x;
            const new_y = this.y + delta.y;
            this.prevPosition = new Vector(this.x, this.y);
            this.position.update(new_x, new_y);
            return this.position;
        }
    }

    revertPosition():Vector {
      if(this.movable) {
        this.position.update(this.prevPosition.x, this.prevPosition.y);
        return this.position;
      }
    }

    // Check for collisions
    checkCollision(target:Sprite):boolean {
        if (this.position.x + this.size.x > target.position.x && this.position.x < target.position.x + target.size.x) {
            if (this.position.y + this.size.y > target.position.y && this.position.y < target.position.y + target.size.y) {
                return true;
            }
        }
        return false;
    }

    // Render
    draw(ctx:CanvasRenderingContext2D):void {
        const canvasWidth = ctx.canvas.clientWidth;
        const canvasHeight = ctx.canvas.clientHeight;

        // Draw the object using our instance properties
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    // Updating position for sprite will utilize velocity
   move() {
       this.updatePosition(this.velocity);
   }
}

class MazeGame {
    // Instance properties
    canvas:HTMLCanvasElement;
    ctx:CanvasRenderingContext2D;
    canvasBounds:Array<Sprite>;
    maze:Array<Sprite>;
    player:Sprite;
    winArea:Sprite;

    constructor() {
        this.canvas = <HTMLCanvasElement> document.getElementById('maze-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvasBounds = [
            new Sprite(-100, -100, 100, this.canvas.height + 100,'none', false),
            new Sprite(-100, -100, this.canvas.width + 100, 100,'none',false),
            new Sprite(this.canvas.width, -100, 100, this.canvas.height + 100,'none',false),
            new Sprite(-100, this.canvas.height, this.canvas.width + 100, 100, 'none',false)
        ];
        const mazeData:Array<string> = document.querySelector('#maze-data').innerHTML.split('');
        const bricks:Array<Sprite> = [];
        const numCols:number = Math.sqrt(mazeData.length);
        const brickSize:number = this.canvas.width / numCols;
        this.winArea = new Sprite(this.canvas.width - brickSize, this.canvas.height - brickSize, brickSize, brickSize, '#00FF00', false);
        this.player = new Sprite(5,5, brickSize-5, brickSize-5, '#FFFF00', true);
        let col:number = 0;
        let row:number = 0;
        mazeData.forEach((bit) => {
          if(bit === '1') {
            const x:number = col * brickSize;
            const y:number = row * brickSize;
            bricks.push(new Sprite(x, y, brickSize, brickSize, '#2121DE',false));
          }
          col++
          if(col >= numCols) {
            col = 0
            row++
          }
        });

        this.maze = [new Sprite(50,50,brickSize,brickSize, '#00405f', false)];
    }

    start = ():void => {
      this.maze.forEach((brick) => {
        brick.draw(this.ctx);
      });

      this.winArea.draw(this.ctx);

      this.animationLoop();
    }

    // Note: lamba syntax is required here to make sure the 'this' context persists through animation frames
    animationLoop = ():void => {
      const { ctx, maze, player, animationLoop, canvasBounds, winArea } = this;
      // Clear canvas for redrawing
      ctx.clearRect(player.x, player.y, player.size.x, player.size.y);

      // Move player, then check/handle collisions, then draw player
      player.move();

      canvasBounds.forEach((wall) => {
        if (player.checkCollision(wall)) {
          player.revertPosition();
        }
      });

      // Draw wall bricks
      maze.forEach((brick) => {
        if (player.checkCollision(brick)) {
          player.revertPosition();
        }
      });
      player.draw(ctx);

      // Check win condition
      if (player.checkCollision(winArea)) {
        // Win
        window.alert("YOU WIN!");
      } else {
        // Not win
        // Loop on browser animation frame
        requestAnimationFrame(animationLoop);
      }
    }

    keyDownHandler = (e:KeyboardEvent):void => {
       if (e.key === 'Right' || e.key === 'ArrowRight') {
           this.player.velocity = new Vector(3, 0);
       } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
           this.player.velocity = new Vector(-3, 0);
       } else if (e.key === 'Up' || e.key === 'ArrowUp') {
           this.player.velocity = new Vector(0, -3);
       } else if (e.key === 'Down' || e.key === 'ArrowDown') {
           this.player.velocity = new Vector(0, 3);
       }
   }

   keyUpHandler = (e:KeyboardEvent):void => {
       if (e.key === 'Right' || e.key === 'ArrowRight') {
           if (this.player.velocity.x > 0) {
               this.player.velocity = new Vector(0, 0);
           }
       } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
           if (this.player.velocity.x < 0) {
               this.player.velocity = new Vector(0, 0);
           }
       } else if (e.key === 'Up' || e.key === 'ArrowUp') {
           if (this.player.velocity.y < 0) {
               this.player.velocity = new Vector(0, 0);
           }
       } else if (e.key === 'Down' || e.key === 'ArrowDown') {
           if (this.player.velocity.y > 0) {
               this.player.velocity = new Vector(0, 0);
           }
       }
   }
}


const game:MazeGame = new MazeGame();
document.addEventListener('keydown', game.keyDownHandler, false);
document.addEventListener('keyup', game.keyUpHandler, false);
game.start();
