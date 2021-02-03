import React from 'react'
import { IonContent, IonPage, IonTitle } from '@ionic/react'
import NavBar from '../components/NavBar'

const About: React.FC = () => {
  return (
    <IonPage className="ion-text-center">
      <NavBar />
      <IonContent>
        <IonTitle>
          <h1 className="ion-padding">ABOUT</h1>
        </IonTitle>
      </IonContent>
    </IonPage>
  )
}

export default About
