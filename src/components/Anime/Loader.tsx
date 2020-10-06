import React from 'react'
import Skeleton from 'react-skeleton-loader'

import styles from './Anime.module.scss'

const CustomSkeleton = (props: any) => (
  <Skeleton widthRandomness="0" color="#70818f" {...props} />
)

const Loader = ({ viewWidth }: { viewWidth: number }) => {
  const width =
    viewWidth < 930
      ? '16vw'
      : viewWidth < 1200
      ? '17vw'
      : viewWidth <= 1550
      ? '9vw'
      : viewWidth < 1600
      ? '11vw'
      : '10vw'

  return (
    <article className={styles.AnimeContainer}>
      <div className={styles.AnimeCard}>
        <h3 className={styles.MainTitle}>
          <CustomSkeleton width="300px" />
        </h3>
        <ol style={{ border: 'none' }}>
          <CustomSkeleton width="200px" height="65%" />
        </ol>
        <div
          className={styles.PosterContainer}
          style={{ padding: '5px', border: 'none' }}
        >
          <CustomSkeleton width={width} />
        </div>
        <div className={styles.AnimeInfo} style={{ border: 'none' }}>
          <ul className={styles.AnimeStudios} style={{ border: 'none' }}>
            <CustomSkeleton width={width} />
          </ul>
          <div className={styles.AnimeDate} style={{ border: 'none' }}>
            <CustomSkeleton width={width} />
          </div>
          <div className={styles.AnimeMetaData} style={{ border: 'none' }}>
            <CustomSkeleton width={width} />
          </div>
          <div
            className={styles.AnimeDescription}
            style={{ overflow: 'hidden', textAlign: 'center' }}
          >
            <CustomSkeleton width={width} />
          </div>
        </div>
        <div
          className={styles.ExternalLinks}
          style={{ height: '30px', width: '100%' }}
        >
          <CustomSkeleton width={width} />
        </div>
      </div>
    </article>
  )
}

export default Loader
