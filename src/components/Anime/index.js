import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment-timezone'
import PerfectScrollbar from 'react-perfect-scrollbar'

import 'react-perfect-scrollbar/dist/css/styles.css'
import styles from './Anime.module.scss'

const Anime = ({
  title: { english, romaji, native },
  genres,
  coverImage,
  studios: { nodes: studios },
  startDate,
  source,
  episodes,
  description,
  format,
  idMal,
  viewWidth,
}) => {
  let titleFontSize, studioFontSize, tagFontSize, tagLineHeight, dateFontSize

  const title = english ? english : romaji

  const renderStudios =
    studios.length > 0
      ? studios.map((studio, i) => {
          if (i !== studios.length - 1) {
            return (
              <li key={studio.name} className={styles.PluralStudios}>
                {studio.name}
              </li>
            )
          } else return <li key={studio.name}>{studio.name}</li>
        })
      : '?'

  const splitDescription = description.split(
    /(\(Source: .+\))|(\[Written by .+\])/g
  )

  const renderTags =
    genres.length > 0
      ? genres.map((genre, i) => {
          if (i !== genres.length - 1)
            return (
              <li key={genre} className={styles.PluralTags}>
                <Link
                  to={{
                    pathname: `/list/genres/${genre}`,
                    state: { name: genre },
                  }}
                >
                  {genre}
                </Link>
              </li>
            )
          else
            return (
              <li key={genre}>
                <Link
                  to={{
                    pathname: `/list/genres/${genre.mal_id}`,
                    state: { name: genre },
                  }}
                >
                  {genre}
                </Link>
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

  studioFontSize = studios.length >= 3 ? '.6vw' : '.88vw'

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

    studioFontSize = studios.length >= 3 ? '.93vw' : '1.18vw'
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
    if (studios.length >= 3) studioFontSize = '1.2vw'
  }

  return (
    <article className={styles.AnimeContainer}>
      <div className={styles.AnimeCard}>
        <a
          className={styles.MainTitle}
          style={{ fontSize: titleFontSize }}
          href={`https://myanimelist.net/anime/${idMal}`}
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
          <div className={styles.Broadcast}>
            {/* Broadcast: {moment(airing_start).format('dddd hh:mm A')} */}
          </div>
          <img src={coverImage.large} alt={title} />
        </div>
        <div className={styles.AnimeInfo}>
          <ul
            className={styles.AnimeStudios}
            style={{ fontSize: studioFontSize }}
          >
            {renderStudios}
          </ul>
          <div className={styles.AnimeDate} style={{ fontSize: dateFontSize }}>
            {moment(`${startDate.day}-${startDate.month}-${startDate.year}`)
              .tz('Europe/Helsinki')
              .format('MMM Do YYYY, h:mm A z')}
          </div>
          <div className={styles.AnimeMetaData}>
            <div className={styles.AnimeSource}>{source}</div>
            <div className={styles.AnimeEpisodes}>
              {episodes ? episodes : '?'} eps
            </div>
          </div>
          <div className={styles.AnimeDescription}>
            <PerfectScrollbar>
              <p>{splitDescription[0]}</p>
              <p>{splitDescription[1] || splitDescription[2]}</p>
            </PerfectScrollbar>
          </div>
        </div>
      </div>
    </article>
  )
}

export default Anime
