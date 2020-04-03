import React from 'react'
import { Link } from 'react-router-dom'

import logo from '../../assets/logo.png'
import styles from './Navigation.module.scss'
import NavigationItem from './NavigationItem/NavigationItem'

const Navigation = () => {
  return (
    <div className={styles.Navigation}>
      <div className={styles.Logo}>
        <Link to="/">
          <img src={logo} alt="logo" className={styles.LogoImg} />
        </Link>
      </div>
      <ul className={styles.NavigationItems}>
        {['winter', 'spring', 'summer', 'fall'].map(season => (
          <NavigationItem season={season} key={season} />
        ))}
      </ul>
    </div>
  )
}

export default Navigation
