import React, { useRef, useEffect } from 'react'
import './MazeCanvas.css'

import MazeGame from '../static/maze'

const MazeCanvas: React.FC = () => {
  const canvasRef = useRef(null)
  let game: MazeGame | null = null

  useEffect(() => {
    const bitstring =
      '0000010100000001010000000101000000010100000001010000000101000000010100000001010000000101000000000000'
    game = new MazeGame(canvasRef.current!, bitstring.split(''))
    document.addEventListener('keyup', game.keyUpHandler, false)
    document.addEventListener('keydown', game.keyDownHandler, false)
  }, [canvasRef])

  useEffect(() => {
    if (game !== null) game.start()
  }, [])

  useEffect(() => {
    let animationFrameId = 0

    //Our draw came here
    const render = () => {
      let gameOver = false
      if (game !== null) {
        game.animationLoop()
        if (game.isWon) {
          gameOver = true
        }
      }
      // Request browser frame and re-render
      if (!gameOver) animationFrameId = window.requestAnimationFrame(render)
      else window.alert('You win')
    }
    render()

    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [game])
  return <canvas ref={canvasRef} />
}

export default MazeCanvas
