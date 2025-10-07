import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from './NavigationItem.module.scss'

const NavigationItem = ({ season }) => {
  return (
    <li className={styles.NavigationItem}>
      <div className={styles.DropBtn}>
        {season} <FontAwesomeIcon icon="caret-down" />
      </div>
      <div
        className={styles.DropdownContent}
        style={season === 'fall' ? { left: -59 } : {}}
      >
        <Link to={`/list/2025/${season}`}>{season} 2025-2026</Link>
        <Link to={`/list/2024/${season}`}>{season} 2024-2025</Link>
        <Link to={`/list/2023/${season}`}>{season} 2023-2024</Link>
        <Link to={`/list/2022/${season}`}>{season} 2022-2023</Link>
        <Link to={`/list/2021/${season}`}>{season} 2021-2022</Link>
        <Link to={`/list/2020/${season}`}>{season} 2020-2021</Link>
        <Link to={`/list/2019/${season}`}>{season} 2019-2020</Link>
        <Link to={`/list/2018/${season}`}>{season} 2018-2019</Link>
        <Link to={`/list/2017/${season}`}>{season} 2017-2018</Link>
        <Link to={`/list/2016/${season}`}>{season} 2016-2017</Link>
        <Link to={`/list/2015/${season}`}>{season} 2015-2016</Link>
        <Link to={`/list/2014/${season}`}>{season} 2014-2015</Link>
      </div>
    </li>
  )
}

export default NavigationItem
