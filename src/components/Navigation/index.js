import React from 'react'
import { Link } from 'react-router-dom'

import logo from '../../assets/logo.png'
import styles from './Navigation.module.scss'

const Navigation = () => {
  return (
    <div className={styles.Navigation}>
      <div className={styles.Logo}>
        <Link to="/">
          <img src={logo} alt="logo" className={styles.LogoImg} />
        </Link>
      </div>
      <ul className={styles.NavigationItems}>
        <li className={styles.NavigationItem}>
          <Link to="/list/2018/winter">Winter</Link>
        </li>
        <li className={styles.NavigationItem}>
          <Link to="/list/2018/summer">Summer</Link>
        </li>
        <li className={styles.NavigationItem}>
          <Link to="/list/2018/spring">Spring</Link>
        </li>
        <li className={styles.NavigationItem}>
          <Link to="/list/2018/fall">Fall</Link>
        </li>
      </ul>
    </div>
  )
}

export default Navigation
