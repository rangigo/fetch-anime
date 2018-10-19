import React from 'react'

const ListTitle = ({ season, year, genre, loading }) => {
  const title = loading
    ? ''
    : genre
      ? genre
      : `${season} ${year}-${+year + 1} Anime`
  return <h1>{title}</h1>
}

export default ListTitle
