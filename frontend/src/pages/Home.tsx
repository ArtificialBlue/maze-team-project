import React from 'react'
import { IonContent, IonPage, IonTitle } from '@ionic/react'
import NavBar from '../components/NavBar'

const Home: React.FC = () => {
  return (
    <IonPage className="ion-text-center">
      <NavBar />
      <IonContent>
        <IonTitle>
          <h1 className="ion-padding">Wildebeest Mazes</h1>
        </IonTitle>
        <img src="https://www.asiliaafrica.com/media/funpvmw1/herds.jpg" />
        <p className="home-content">
          This project was developed for SPD 1.3 by the
          <strong>WILDEBEEST COLLECTIVE</strong>. It utilizes Flask, React,
          TypeScript, and HTML Canvas to generate random solvable mazes and
          allow players to traverse them. Check out the project on
          <span>
            {' '}
            <a href="https://github.com/ArtificialBlue/maze-team-project">
              github
            </a>
          </span>
        </p>
      </IonContent>
    </IonPage>
  )
}

export default Home
