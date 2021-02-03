import React from 'react'

const MazeCanvas: React.FC = () => {
  return (
    <div>
      <canvas id="maze-canvas"></canvas>

      <script src="/static/maze.js"></script>
    </div>
  )
}

export default MazeCanvas
