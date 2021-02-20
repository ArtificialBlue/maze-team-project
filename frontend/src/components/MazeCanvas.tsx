import React, { useRef, useEffect, useState } from 'react'
import './MazeCanvas.css'
import {
  IonSelect,
  IonSelectOption,
  IonModal,
  IonButton,
  IonContent,
} from '@ionic/react'

import MazeGame from '../static/maze'

const MazeCanvas: React.FC = () => {
  const canvasRef = useRef(null)
  const [game, setGame] = useState<MazeGame | null>(null)
  const [bitstring, setBitstring] = useState<string>('')
  const [difficulty, setDifficulty] = useState<string>('easy')
  const [showModal, setShowModal] = useState(false)
  const prevDifficultyRef: any = useRef()
  const message =
    difficulty !== 'hard'
      ? 'Congratulations! You win! To try a harder difficulty, click the button below.'
      : 'Congratulations! You cleared the hardest difficulty! If you would like to start over, press the button below.'

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
        // Game has been won :)
        setShowModal(true)
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
        offset = 5
      } else if (difficulty === 'medium') {
        offset = 15
      } else if (difficulty === 'hard') {
        offset = 25
      }
      const size = Math.floor(Math.random() * range + offset)

      const res = await fetch(
        `https://wildebeest-maze.herokuapp.com/api/${size}`
      )
      const data = await res.json()
      setBitstring(data.bitstring)
    }

    loadBitstring()
  }, [difficulty])

  useEffect(() => {
    if (bitstring !== '') {
      setGame(new MazeGame(canvasRef.current!, bitstring.split('')))
    }
  }, [canvasRef, bitstring])

  useEffect(() => {
    if (game !== null) {
      game.setup()
      document.addEventListener('keyup', game.keyUpHandler, false)
      document.addEventListener('keydown', game.keyDownHandler, false)

      start()
    }
  }, [game])

  return (
    <IonContent>
      <div className="centered-container">
        <IonSelect
          value={difficulty}
          placeholder="Select a Difficulty"
          onIonChange={(e) => setDifficulty(e.detail.value)}
        >
          <IonSelectOption value="easy">Easy</IonSelectOption>
          <IonSelectOption value="medium">Medium</IonSelectOption>
          <IonSelectOption value="hard">Hard</IonSelectOption>
        </IonSelect>
      </div>
      <canvas ref={canvasRef} />
      <div className="centered-container">
        <div className="d-pad">
          <IonButton
            onMouseDown={() => {
              game?.buttonDownHandler('up')
            }}
            onMouseUp={() => {
              game?.buttonUpHandler('up')
            }}
          >
            Up
          </IonButton>
          <div className="horizontal-buttons">
            <IonButton
              onMouseDown={() => {
                game?.buttonDownHandler('left')
              }}
              onMouseUp={() => {
                game?.buttonUpHandler('left')
              }}
            >
              Left
            </IonButton>
            <IonButton
              onMouseDown={() => {
                game?.buttonDownHandler('right')
              }}
              onMouseUp={() => {
                game?.buttonUpHandler('right')
              }}
            >
              Right
            </IonButton>
          </div>
          <IonButton
            onMouseDown={() => {
              game?.buttonDownHandler('down')
            }}
            onMouseUp={() => {
              game?.buttonUpHandler('down')
            }}
          >
            Down
          </IonButton>
        </div>
      </div>

      <IonModal
        showBackdrop={false}
        isOpen={showModal}
        cssClass="win-modal"
        swipeToClose={true}
      >
        <p>{message}</p>
        <IonButton
          onClick={() => {
            setShowModal(false)
            if (difficulty === 'easy') setDifficulty('medium')
            if (difficulty === 'medium') setDifficulty('hard')
            if (difficulty === 'hard') setDifficulty('easy')
          }}
        >
          Next Maze!
        </IonButton>
      </IonModal>
    </IonContent>
  )
}

export default MazeCanvas
