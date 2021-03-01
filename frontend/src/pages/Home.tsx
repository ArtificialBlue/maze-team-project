import React from 'react'
import { IonContent, IonPage, IonTitle } from '@ionic/react'
import NavBar from '../components/NavBar'
import beast from './images/Wildebeest.png'

const Home: React.FC = () => {
  return (
    <IonPage className="ion-text-center">
      <NavBar />
      <IonContent>
        <h1 id="title" className="ion-padding">
          Wildebeest Mazes
        </h1>
        <img className="home-content" src={beast} />
        <p className="home-content">
          This project was developed for SPD 1.3 by the
          <strong> WILDEBEEST COLLECTIVE</strong>. It utilizes Flask, React,
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
