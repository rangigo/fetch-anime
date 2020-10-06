import React from 'react'
import Skeleton from 'react-skeleton-loader'

interface ListTitleProps {
  season: string | undefined
  year: string | undefined
  genre: string | undefined
}

const ListTitle = ({ season, year, genre }: ListTitleProps) => {
  const title = genre ? (
    <span>
      <span style={{ color: '#46b5e9' }}>{genre} </span> Anime
    </span>
  ) : season && year ? (
    `${season} ${year}-${+year + 1} Anime`
  ) : (
    <Skeleton width="200px" height="65%" widthRandomness={0} color="#70818f" />
  )
  return <h1>{title}</h1>
}

export default ListTitle
