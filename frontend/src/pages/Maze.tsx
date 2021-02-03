import React from 'react'
import { IonContent, IonPage, IonTitle } from '@ionic/react'
import NavBar from '../components/NavBar'
import MazeCanvas from '../components/MazeCanvas'

const Maze: React.FC = () => {
  return (
    <IonPage className="ion-text-center">
      <NavBar />
      <IonContent>
        <IonTitle>
          <h1 className="ion-padding">MAZE GAME</h1>
        </IonTitle>
        <MazeCanvas />
      </IonContent>
    </IonPage>
  )
}

export default Maze
