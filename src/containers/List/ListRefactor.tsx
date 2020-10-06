import React, { useState, useMemo, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import produce from 'immer'
// import ReactPaginate from 'react-paginate'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from './List.module.scss'

import Anime from '../../components/Anime/Anime'
import Loader from '../../components/Anime/Loader'
import ListTitle from '../../components/ListTitle/ListTitle'
import ListType from '../../components/ListType/ListType'
import useViewWidth from '../../hooks/useViewWidth'

import { listTypes } from './listTypes'
import { GET_ANIMES } from './query'
import { AnimeData } from './types'
import { AnimeFormat } from '../../components/Anime/types'

function List() {
  const [activeType, setActiveType] = useState(AnimeFormat.TV)
  const { season, year, genre } = useParams()
  const viewWidth = useViewWidth()
  const { loading, error, data, fetchMore } = useQuery<AnimeData>(GET_ANIMES, {
    variables: {
      season: season?.toUpperCase(),
      seasonYear: year,
      ...(genre && { genre }),
    },
    notifyOnNetworkStatusChange: true,
  })

  const filteredAnimes = useMemo(() => {
    return data?.Page.media.filter(media =>
      activeType !== AnimeFormat.ALL ? media.format === activeType : true,
    )
  }, [data, activeType])

  let renderAnimes
  if (loading) {
    renderAnimes = Array(10)
      .fill(0)
      .map((_, i) => <Loader key={i} viewWidth={viewWidth} />)
  } else if (error) {
    renderAnimes = `Error ${error.name}: ${error.message}`
  } else if (filteredAnimes?.length === 0) {
    renderAnimes = `No animes found.`
  } else {
    renderAnimes = filteredAnimes?.map(media => (
      <Anime key={media.id} {...media} viewWidth={viewWidth} />
    ))
  }

  return (
    <>
      <div className={styles.ListHeader}>
        <ListTitle season={season} year={year} genre={genre} />
        <nav>
          {!loading &&
            listTypes.map(listType => (
              <ListType
                activeType={activeType}
                onClickType={() => setActiveType(listType.value)}
                value={listType.value}
                label={listType.label}
                key={listType.value}
              />
            ))}
        </nav>
      </div>

      <div className={styles.ListContainer}>{renderAnimes}</div>

      {/*
      <div className={styles.ListFooter}>
        <ReactPaginate
          previousLabel={<FontAwesomeIcon icon="arrow-left" />}
          nextLabel={<FontAwesomeIcon icon="arrow-right" />}
          breakClassName={styles.BreakLabel}
          pageCount={pages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          forcePage={currentPage - 1}
          onPageChange={handlePageClick}
          containerClassName={styles.Pagination}
          activeClassName={styles.PageActive}
          disabledClassName={styles.PageDisabled}
        />
      </div> */}
    </>
  )
}

export default List
