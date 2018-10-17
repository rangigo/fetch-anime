import React from 'react';
import Skeleton from 'react-skeleton-loader';

import styles from '../Anime.module.scss';

const CustomSkeleton = props => (
  <Skeleton {...props} widthRandomness="0" color="#7c7c85" />
);

const Loader = () => {
  return (
    <article className={styles.AnimeContainer}>
      <div className={styles.AnimeCard}>
        <h3 className={styles.MainTitle}>
          <CustomSkeleton width="300px" color="#7c7c85" />
        </h3>
        <ol className={styles.AnimeTags} style={{ border: 'none' }}>
          <CustomSkeleton width="200px" height="65%" />
        </ol>
        <div
          className={styles.PosterContainer}
          style={{ padding: '5px', border: 'none' }}
        >
          <CustomSkeleton />
        </div>
        <div className={styles.AnimeInfo}>
          <ul className={styles.AnimeStudios} style={{ border: 'none' }}>
            <CustomSkeleton />
          </ul>
          <div className={styles.AnimeDate} style={{ border: 'none' }}>
            <CustomSkeleton />
          </div>
          <div className={styles.AnimeMetaData} style={{ border: 'none' }}>
            <CustomSkeleton />
          </div>
          <div
            className={styles.AnimeSynopsis}
            style={{ overflow: 'hidden', textAlign: 'center' }}
          >
            <CustomSkeleton />
          </div>
        </div>
        <div className="RelateLinks" />
      </div>
    </article>
  );
};

export default Loader;
