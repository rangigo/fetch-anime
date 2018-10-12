import React from 'react'
import styles from './Anime.module.scss'

const Anime = ({ title, type, genres, image_url, producers }) => {
  const renderTags = genres.map((genre, i) => {
    if (i !== genres.length - 1)
      return (
        <li key={genre.mal_id} className={styles.PluralTags}>
          {genre.name}
        </li>
      )
    else return <li key={genre.mal_id}>{genre.name}</li>
  })

  const tagSize = genres.length >= 6 ? '10.8px' : '13px'
  const tagLineHeight = genres.length >= 6 ? '1.95' : '1.6'

  const renderStudios = producers.map((producer, i) => {
    if (i !== producers.length - 1) {
      return (
        <li key={producer.mal_id} className={styles.PluralStudios}>
          {producer.name}
        </li>
      )
    } else return <li key={producer.mal_id}>{producer.name}</li>
  })

  const studioSize = producers.length >= 3 ? '10.8px' : '14px'

  return (
    <article className={styles.AnimeContainer}>
      <div className={styles.AnimeCard}>
        <h3 className={styles.MainTitle}>{title}</h3>
        <h4 className={styles.JpTitle}>{type}</h4>
        <ol
          className={styles.AnimeTags}
          style={{ fontSize: tagSize, lineHeight: tagLineHeight }}
        >
          {renderTags}
        </ol>
        <div className={styles.PosterContainer}>
          <img src={image_url} alt={title} />
        </div>
        <div className={styles.AnimeInfo}>
          <ul className={styles.AnimeStudios} style={{ fontSize: studioSize }}>
            {renderStudios}
          </ul>
        </div>
        <div className="RelateLinks" />
      </div>
    </article>
  )
}

export default Anime
