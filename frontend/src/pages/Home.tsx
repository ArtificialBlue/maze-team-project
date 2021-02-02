import React from 'react'
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import './Home.css'

const Home: React.FC = () => {
  return (
    <IonPage className="ion-text-center">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Links will go here</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonTitle>
          <h1 className="ion-padding">MAZE GAME</h1>
        </IonTitle>
      </IonContent>
    </IonPage>
  )
}

export default Home
