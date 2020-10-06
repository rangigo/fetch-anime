import React, { useState, useEffect } from 'react'
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

function List() {
  const [activeType, setActiveType] = useState('')
  const { season, year, genre, type } = useParams()
  const viewWidth = useViewWidth()
  const { loading, error, data } = useQuery<AnimeData>(GET_ANIMES, {
    variables: {
      season: season?.toUpperCase(),
      seasonYear: year,
    },
  })

  const renderAnimes = error
    ? 'Something is wrong please reload the page!'
    : loading
    ? Array(10)
        .fill(0)
        .map((_, i) => <Loader key={i} viewWidth={viewWidth} />)
    : data?.Page.media.map(media => (
        <Anime key={media.id} {...media} viewWidth={viewWidth} />
      ))

  return (
    <>
      <div className={styles.ListHeader}>
        <ListTitle season={season} year={year} genre={genre} />
        <nav>
          {listTypes.map(type => (
            <ListType
              activeType={activeType}
              onClickType={() => setActiveType(type.value)}
              value={type.value}
              label={type.label}
              key={type.value}
            />
          ))}
        </nav>
      </div>

      <div className={styles.ListContainer}>
        {renderAnimes?.length === 0 ? 'No animes found.' : renderAnimes}
      </div>

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
