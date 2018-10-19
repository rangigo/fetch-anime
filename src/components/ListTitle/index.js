import React from 'react'

const ListTitle = ({ season, year }) => {
  return (
    <h1>
      {season} {year}-{+year + 1} Anime
    </h1>
  )
}

export default ListTitle
