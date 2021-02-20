import React from 'react'
import { IonHeader, IonToolbar, IonTitle } from '@ionic/react'
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
          </div>
        </IonTitle>
      </IonToolbar>
    </IonHeader>
  )
}

export default NavBar
