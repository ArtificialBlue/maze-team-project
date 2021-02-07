import Home from './pages/Home'
import Maze from './pages/Maze'
import About from './pages/About'
import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import { IonApp } from '@ionic/react'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

/* Theme variables */
import './theme/variables.css'
import './App.css'

const App: React.FC = () => (
  <IonApp>
    <Router>
      <Route exact path="/" component={Home} />
      <Route path="/maze" component={Maze} />
      <Route path="/about" component={About} />
    </Router>
  </IonApp>
)

export default App
