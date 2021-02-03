import React from 'react'
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
} from '@ionic/react'
import { NavLink } from 'react-router-dom'
import './NavBar.css'

const NavBar: React.FC = () => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonTitle>
          <div className="nav-container">
            <NavLink
              className="nav-link"
              activeClassName="active-link"
              exact
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              className="nav-link"
              activeClassName="active-link"
              to="/maze"
            >
              Maze
            </NavLink>
            <NavLink
              className="nav-link"
              activeClassName="active-link"
              to="/about"
            >
              About
            </NavLink>
          </div>
        </IonTitle>
      </IonToolbar>
    </IonHeader>
  )
}

export default NavBar
