import React from 'react'
import moment from 'moment-timezone'

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
}) => {
  const titleFontSize =
    title.length > 45 ? '12px' : title.length > 37 ? '15px' : '18px'

  const renderTags =
    genres.length > 0
      ? genres.map((genre, i) => {
          if (i !== genres.length - 1)
            return (
              <li key={genre.mal_id} className={styles.PluralTags}>
                {genre.name}
              </li>
            )
          else return <li key={genre.mal_id}>{genre.name}</li>
        })
      : '?'

  const tagFontSize =
    genres.length >= 7 ? '10px' : genres.length >= 6 ? '10.8px' : '12.5px'
  const tagLineHeight = genres.length >= 6 ? '1.95' : '1.6'

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

  const studioFontSize = producers.length >= 3 ? '10.8px' : '14px'

  const splitSynopsis = synopsis.split(/(\(Source: .+\))|(\[Written by .+\])/g)

  return (
    <article className={styles.AnimeContainer}>
      <div className={styles.AnimeCard}>
        <h3 className={styles.MainTitle} style={{ fontSize: titleFontSize }}>
          {title}
        </h3>
        <ol
          className={styles.AnimeTags}
          style={{ fontSize: tagFontSize, lineHeight: tagLineHeight }}
        >
          {renderTags}
        </ol>
        <div className={styles.PosterContainer}>
          <div className={styles.Broadcast}>
            Broadcast: {moment(airing_start).format('dddd hh:mm A')}
          </div>
          <img src={image_url} alt={title} />
        </div>
        <div className={styles.AnimeInfo}>
          <ul
            className={styles.AnimeStudios}
            style={{ fontSize: studioFontSize }}
          >
            {renderStudios}
          </ul>
          <div className={styles.AnimeDate}>
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
            <p>{splitSynopsis[0]}</p>
            <p>{splitSynopsis[1] || splitSynopsis[2]}</p>
          </div>
        </div>
        <div className="RelateLinks" />
      </div>
    </article>
  )
}

export default Anime
