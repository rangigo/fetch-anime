import React from 'react'

import funimation from '../../assets/funimation.png'
import Animelab from '../../assets/Animelab.svg'
import Hidive from '../../assets/hidive.jpg'

import styles from './LinkIcon.module.scss'

const LinkIcon = ({ url, site }) => {
  let iconClassName = [styles.LinkIcon]
  let icon = ''

  switch (site) {
    case 'Crunchyroll':
      iconClassName = iconClassName.concat(styles.CrunchyrollIcon).join(' ')
      break
    case 'Twitter':
      iconClassName = iconClassName.concat(styles.TwitterIcon).join(' ')
      break
    case 'Hidive':
      iconClassName = iconClassName.concat(styles.HidiveIcon).join(' ')
      icon = (
        <img
          src={Hidive}
          height="18px"
          width="18px"
          alt="icon"
          style={{ borderRadius: '50%' }}
        />
      )
      break
    case 'Animelab':
      iconClassName = iconClassName.concat(styles.AnimelabIcon).join(' ')
      icon = <img src={Animelab} height="18px" width="18px" alt="icon" />
      break
    case 'Funimation':
      iconClassName = iconClassName.concat(styles.FunimationIcon).join(' ')
      icon = <img src={funimation} height="18px" width="18px" alt="icon" />
      break
    default:
      iconClassName = iconClassName.concat(styles.WebsiteIcon).join(' ')
      icon = ''
      break
  }

  return (
    <div className={iconClassName}>
      <a href={url} target="_blank" rel="noopener noreferrer">
        {icon}
      </a>
    </div>
  )
}

export default LinkIcon
