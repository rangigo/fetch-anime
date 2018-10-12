import React from 'react'
import { Link } from 'react-router-dom'

import logo from '../../assets/logo.png'
import styles from './Navigation.module.scss'

const Navigation = () => {
  return (
    <div className={styles.Navigation}>
      <div className={styles.Logo}>
        <img src={logo} alt="logo" className={styles.LogoImg} />
      </div>
      <ul className={styles.NavigationItems}>
        <li className={styles.NavigationItem}>
          <Link to="/list/winter">Winter</Link>
        </li>
        <li className={styles.NavigationItem}>
          <Link to="/list/winter">Summer</Link>
        </li>
        <li className={styles.NavigationItem}>
          <Link to="/list/winter">Spring</Link>
        </li>
      </ul>
    </div>
  )
}

export default Navigation
