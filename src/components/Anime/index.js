import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment-timezone'
import PerfectScrollbar from 'react-perfect-scrollbar'

import 'react-perfect-scrollbar/dist/css/styles.css'
import styles from './Anime.module.scss'

const Anime = ({
  title,
  genres,
  image_url,
  producers,
  airing_start,
  source,
  episodes,
  synopsis,
  type,
  url,
  viewWidth,
}) => {
  let titleFontSize, studioFontSize, tagFontSize, tagLineHeight, dateFontSize

  const renderStudios =
    producers.length > 0
      ? producers.map((producer, i) => {
          if (i !== producers.length - 1) {
            return (
              <li key={producer.mal_id} className={styles.PluralStudios}>
                {producer.name}
              </li>
            )
          } else return <li key={producer.mal_id}>{producer.name}</li>
        })
      : '?'

  const splitSynopsis = synopsis.split(/(\(Source: .+\))|(\[Written by .+\])/g)

  const renderTags =
    genres.length > 0
      ? genres.map((genre, i) => {
          if (i !== genres.length - 1)
            return (
              <li key={genre.mal_id} className={styles.PluralTags}>
                <Link to={`/list/tags/${genre.mal_id}`}>{genre.name}</Link>
              </li>
            )
          else
            return (
              <li key={genre.mal_id}>
                <Link to={`/list/tags/${genre.mal_id}`}>{genre.name}</Link>
              </li>
            )
        })
      : '?'

  // Handle responsive font-size based on viewwidth

  titleFontSize =
    title.length > 50 ? '.74vw' : title.length > 40 ? '.9vw' : '18px'

  tagFontSize =
    genres.length >= 7
      ? '.565vw'
      : genres.length >= 6
        ? '.64vw'
        : genres.length >= 5
          ? '.75vw'
          : '12.5px'

  tagLineHeight = genres.length >= 6 ? '1.95' : '1.6'

  studioFontSize = producers.length >= 3 ? '.6vw' : '.88vw'

  dateFontSize = '.82vw'

  if (viewWidth < 1600) {
    titleFontSize =
      title.length > 50 ? '.98vw' : title.length > 40 ? '1.3vw' : '1.37vw'

    tagFontSize =
      genres.length >= 8
        ? '.7vw'
        : genres.length >= 7
          ? '.8vw'
          : genres.length >= 6
            ? '.9vw'
            : '1vw'

    studioFontSize = producers.length >= 3 ? '.93vw' : '1.18vw'
    dateFontSize = '1.18vw'
  }

  if (viewWidth < 1200) {
    titleFontSize = title.length > 50 ? '1.45vw' : '1.8vw'
    tagFontSize =
      genres.length >= 8
        ? '1.05vw'
        : genres.length >= 7
          ? '1.12vw'
          : genres.length >= 6
            ? '1.12vw'
            : '1.38vw'
    studioFontSize = '1.38vw'
    dateFontSize = '1.38vw'
  }

  if (viewWidth < 930) {
    tagFontSize = genres.length >= 6 ? '1.1vw' : '1.4vw'
    if (producers.length >= 3) studioFontSize = '1.2vw'
  }

  return (
    <article className={styles.AnimeContainer}>
      <div className={styles.AnimeCard}>
        <a
          className={styles.MainTitle}
          style={{ fontSize: titleFontSize }}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {title}
        </a>
        <ol
          className={styles.AnimeTags}
          style={{ fontSize: tagFontSize, lineHeight: tagLineHeight }}
        >
          {renderTags}
        </ol>
        <div className={styles.PosterContainer}>
          {type === 'TV' ? (
            <div className={styles.Broadcast}>
              Broadcast: {moment(airing_start).format('dddd hh:mm A')}
            </div>
          ) : null}
          <img src={image_url} alt={title} />
        </div>
        <div className={styles.AnimeInfo}>
          <ul
            className={styles.AnimeStudios}
            style={{ fontSize: studioFontSize }}
          >
            {renderStudios}
          </ul>
          <div className={styles.AnimeDate} style={{ fontSize: dateFontSize }}>
            {moment(airing_start)
              .tz('Europe/Helsinki')
              .format('MMM Do YYYY, h:mm A z')}
          </div>
          <div className={styles.AnimeMetaData}>
            <div className={styles.AnimeSource}>{source}</div>
            <div className={styles.AnimeEpisodes}>
              {episodes ? episodes : '?'} eps
            </div>
          </div>
          <div className={styles.AnimeSynopsis}>
            <PerfectScrollbar>
              <p>{splitSynopsis[0]}</p>
              <p>{splitSynopsis[1] || splitSynopsis[2]}</p>
            </PerfectScrollbar>
          </div>
        </div>
      </div>
    </article>
  )
}

export default Anime
