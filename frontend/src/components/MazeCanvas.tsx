import React, { useRef, useEffect, useState } from 'react'
import './MazeCanvas.css'

import MazeGame from '../static/maze'

const MazeCanvas: React.FC = () => {
  const canvasRef = useRef(null)
  let game: MazeGame | null = null
  const [bitstring, setBitstring] = useState('')

  const start = () => {
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
  }

  useEffect(() => {
    const loadBitstring = async () => {
      const res = await fetch(`http://0.0.0.0:5000/api/`)
      const data = await res.json()
      setBitstring(data.bitstring)
    }

    loadBitstring()
  }, [])

  useEffect(() => {
    if (bitstring !== '') {
      game = new MazeGame(canvasRef.current!, bitstring.split(''))
      game.setup()
      document.addEventListener('keyup', game.keyUpHandler, false)
      document.addEventListener('keydown', game.keyDownHandler, false)
      start()
    }
  }, [canvasRef, bitstring])

  return <canvas ref={canvasRef} />
}

export default MazeCanvas
