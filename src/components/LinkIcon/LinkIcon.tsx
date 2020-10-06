import React from 'react'

import funimation from '../../assets/funimation.png'
import Animelab from '../../assets/Animelab.svg'
import Hidive from '../../assets/hidive.jpg'
import Youtube from '../../assets/Youtube.svg'
import Wakanim from '../../assets/wakanim.jpg'
import Dailymotion from '../../assets/dailymotion.svg'
import Netflix from '../../assets/netflix.svg'
import Hulu from '../../assets/hulu.png'
import Amazon from '../../assets/Amazon.svg'

import styles from './LinkIcon.module.scss'

import { ExternalLink } from '../Anime/types'

const LinkIcon: React.FC<ExternalLink> = ({ url, site }) => {
  let iconClassName: string[] | string = [styles.LinkIcon]
  let icon: JSX.Element | null = null

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
    case 'Amazon':
      iconClassName = iconClassName.concat(styles.NormalIcon).join(' ')
      icon = <img src={Amazon} height="18px" width="18px" alt="icon" />
      break
    case 'Animelab':
      iconClassName = iconClassName.concat(styles.NormalIcon).join(' ')
      icon = <img src={Animelab} height="18px" width="18px" alt="icon" />
      break
    case 'Funimation':
      iconClassName = iconClassName.concat(styles.NormalIcon).join(' ')
      icon = <img src={funimation} height="18px" width="18px" alt="icon" />
      break
    case 'Youtube':
      iconClassName = iconClassName.concat(styles.NormalIcon).join(' ')
      icon = <img src={Youtube} height="18px" width="18px" alt="icons" />
      break
    case 'Dailymotion':
      iconClassName = iconClassName.concat(styles.DailymotionIcon).join(' ')
      icon = <img src={Dailymotion} height="18px" width="18px" alt="icons" />
      break
    case 'Wakanim':
      iconClassName = iconClassName.concat(styles.NormalIcon).join(' ')
      icon = (
        <img
          src={Wakanim}
          height="18px"
          width="18px"
          alt="icons"
          style={{ borderRadius: '50%' }}
        />
      )
      break
    case 'Netflix':
      iconClassName = iconClassName.concat(styles.NormalIcon).join(' ')
      icon = (
        <img
          src={Netflix}
          height="18px"
          width="18px"
          alt="icons"
          style={{ borderRadius: '50%' }}
        />
      )
      break
    case 'Hulu':
      iconClassName = iconClassName.concat(styles.HuluIcon).join(' ')
      icon = (
        <img
          src={Hulu}
          height="18px"
          width="18px"
          alt="icons"
          style={{ borderRadius: '5px' }}
        />
      )
      break
    default:
      iconClassName = iconClassName.concat(styles.WebsiteIcon).join(' ')
      icon = null
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
