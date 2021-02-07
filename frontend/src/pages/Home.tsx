import React from 'react'
import { IonContent, IonPage, IonTitle } from '@ionic/react'
import NavBar from '../components/NavBar'

const Home: React.FC = () => {
  return (
    <IonPage className="ion-text-center">
      <NavBar />
      <IonContent>
        <IonTitle>
          <h1 className="ion-padding">HOME PAGE</h1>
        </IonTitle>
      </IonContent>
    </IonPage>
  )
}

export default Home
