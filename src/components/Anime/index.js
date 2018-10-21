import React from 'react'
import { Link } from 'react-router-dom'
import { formatToTimeZone } from 'date-fns-timezone'
import SimpleBar from 'simplebar-react'

import 'simplebar/dist/simplebar.min.css'
import styles from './Anime.module.scss'
import CountdownTime from '../../containers/CountdownTime'

const Anime = ({
  title: { english, romaji, native },
  genres,
  coverImage,
  studios: { nodes: studios },
  source,
  episodes,
  duration,
  description,
  idMal,
  viewWidth,
  nextAiringEpisode,
  airingSchedule: { nodes },
  format: type,
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

  const splitDescription = description
    ? description.split(/(\(Source: .+\))|(\[Written by .+\])/g)
    : ''

  const renderGenres =
    genres.length > 0
      ? genres.map((genre, i) => {
          if (i !== genres.length - 1)
            return (
              <li key={genre} className={styles.PluralGenres}>
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
          className={styles.AnimeGenres}
          style={{ fontSize: tagFontSize, lineHeight: tagLineHeight }}
        >
          {renderGenres}
        </ol>
        <div className={styles.PosterContainer}>
          <CountdownTime
            time={nextAiringEpisode ? nextAiringEpisode.timeUntilAiring : null}
            ep={nextAiringEpisode ? nextAiringEpisode.episode : null}
            type={type}
          />

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
            {nodes.length > 0
              ? formatToTimeZone(
                  nodes[0].airingAt * 1000,
                  'D MMM, YYYY [at] HH:mm A z',
                  {
                    timeZone: 'Europe/Helsinki',
                  }
                )
              : '?'}
          </div>
          <div className={styles.AnimeMetaData}>
            <div className={styles.AnimeSource}>
              {source
                ? source
                    .toLowerCase()
                    .split('_')
                    .join(' ')
                : '?'}
            </div>
            <div className={styles.AnimeEpisodes}>
              {episodes ? episodes : '?'} eps
              {' × '}
              {duration ? duration : '?'} min
            </div>
          </div>
          <div className={styles.AnimeDescription}>
            <SimpleBar style={{ height: '100%', border: 'none' }}>
              <p
                dangerouslySetInnerHTML={{
                  __html: splitDescription[0] || 'No description found.',
                }}
              />
              <p>{splitDescription[1] || splitDescription[2] || ''}</p>
            </SimpleBar>
          </div>
        </div>
      </div>
    </article>
  )
}

export default Anime
