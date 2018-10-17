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
          <div className={styles.DropBtn}>
            Winter <i className="fas fa-caret-down" />
          </div>
          <div className={styles.DropdownContent}>
            <Link to="/list/2018/winter">Winter 2018-2019</Link>
            <Link to="/list/2017/winter">Winter 2017-2018</Link>
            <Link to="/list/2016/winter">Winter 2016-2017</Link>
            <Link to="/list/2015/winter">Winter 2015-2016</Link>
          </div>
        </li>
        <li className={styles.NavigationItem}>
          <div className={styles.DropBtn}>
            Spring <i className="fas fa-caret-down" />
          </div>
          <div className={styles.DropdownContent}>
            <Link to="/list/2018/spring">Spring 2018-2019</Link>
            <Link to="/list/2017/spring">Spring 2017-2018</Link>
            <Link to="/list/2016/spring">Spring 2016-2017</Link>
            <Link to="/list/2015/spring">Spring 2015-2016</Link>
          </div>
        </li>
        <li className={styles.NavigationItem}>
          <div className={styles.DropBtn}>
            Summer <i className="fas fa-caret-down" />
          </div>
          <div className={styles.DropdownContent}>
            <Link to="/list/2018/summer">Summer 2018-2019</Link>
            <Link to="/list/2017/summer">Summer 2017-2018</Link>
            <Link to="/list/2016/summer">Summer 2016-2017</Link>
            <Link to="/list/2015/summer">Summer 2015-2016</Link>
          </div>
        </li>
        <li className={styles.NavigationItem}>
          <div className={styles.DropBtn}>
            Fall <i className="fas fa-caret-down" />
          </div>
          <div className={styles.DropdownContent} style={{left: -59}}>
            <Link to="/list/2018/fall">Fall 2018-2019</Link>
            <Link to="/list/2017/fall">Fall 2017-2018</Link>
            <Link to="/list/2016/fall">Fall 2016-2017</Link>
            <Link to="/list/2015/fall">Fall 2015-2016</Link>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default Navigation
