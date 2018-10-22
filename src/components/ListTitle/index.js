import React from 'react'
import Skeleton from 'react-skeleton-loader'

const ListTitle = ({ season, year, genre }) => {
  const title = genre ? (
    <span>
      <span style={{ color: '#46b5e9' }}>{genre} </span> Anime
    </span>
  ) : season ? (
    `${season} ${year}-${+year + 1} Anime`
  ) : (
    <Skeleton width="200px" height="65%" widthRandomness={0} color="#70818f" />
  )
  return <h1>{title}</h1>
}

export default ListTitle
