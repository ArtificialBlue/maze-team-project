import React, { useRef, useEffect, useState } from 'react'
import './MazeCanvas.css'
import { IonSelect, IonSelectOption } from '@ionic/react'

import MazeGame from '../static/maze'

const MazeCanvas: React.FC = () => {
  const canvasRef = useRef(null)
  const [game, setGame] = useState<MazeGame | null>(null)
  const [bitstring, setBitstring] = useState<string>('')
  const [difficulty, setDifficulty] = useState<string>('easy')
  const prevDifficultyRef: any = useRef()

  useEffect(() => {
    prevDifficultyRef.current = difficulty
  })

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
      const prevDifficulty = prevDifficultyRef.current
      if (!gameOver && prevDifficulty === difficulty) {
        animationFrameId = window.requestAnimationFrame(render)
      } else if (!gameOver && prevDifficulty !== difficulty) {
        prevDifficultyRef.current = difficulty
      } else {
        window.alert('You win')
      }
    }
    render()

    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }

  useEffect(() => {
    const loadBitstring = async () => {
      let offset: number = 0
      const range: number = 5
      if (difficulty === 'easy') {
        offset = 7.5
      } else if (difficulty === 'medium') {
        offset = 12.5
      } else if (difficulty === 'hard') {
        offset = 17.5
      }
      const size = Math.floor(Math.random() * range + offset)

      const res = await fetch(`http://localhost:5000/api/${size}`)
      const data = await res.json()
      setBitstring(data.bitstring)
    }

    loadBitstring()
  }, [difficulty])

  useEffect(() => {
    if (bitstring !== '') {
      console.log('Creating game...')
      setGame(new MazeGame(canvasRef.current!, bitstring.split('')))
    }
  }, [canvasRef, bitstring])

  useEffect(() => {
    console.log('Game has changed...')
    if (game !== null) {
      game.setup()
      document.addEventListener('keyup', game.keyUpHandler, false)
      document.addEventListener('keydown', game.keyDownHandler, false)

      start()
    }
  }, [game])

  return (
    <div>
      <IonSelect
        value={difficulty}
        placeholder="Select a Difficulty"
        onIonChange={(e) => setDifficulty(e.detail.value)}
      >
        <IonSelectOption value="easy">Easy</IonSelectOption>
        <IonSelectOption value="medium">Medium</IonSelectOption>
        <IonSelectOption value="hard">Hard</IonSelectOption>
      </IonSelect>
      <canvas ref={canvasRef} />
    </div>
  )
}

export default MazeCanvas
