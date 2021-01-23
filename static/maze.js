const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const maze = document.querySelector('#maze-data').innerHTML.split('')
const numCols = Math.sqrt(maze.length)
const brickSize = canvas.width / numCols
const bricks = []
let col = 0
let row = 0
maze.forEach((bit) => {
  if(bit === '1') {
    const x = col * brickSize
    const y = row * brickSize
    bricks.push({x:x, x:y})
  }
  col++
  if(col >= numCols) {
    col = 0
    row++
  }
})
bricks.forEach((brick) => {
  ctx.beginPath()
  ctx.rect(brick.x, brick.y, brickSize, brickSize)
  ctx.fillStyle = '#0040F5'
  ctx.fill()
})
