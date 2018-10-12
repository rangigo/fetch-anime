import React, { Component } from 'react'
import axios from '../../hoc/axios'

import Anime from '../../components/Anime'
import styles from './List.module.scss'

export class List extends Component {
  state = {
    animes: [],
    size: 10,
    loading: false,
    season: null,
    year: null,
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   const {
  //     match: {
  //       params: { season, year },
  //     },
  //   } = nextProps

  //   if (season !== prevState.season) {
  //     return {
  //       season,
  //     }
  //   } else if (year !== prevState.year) {
  //     return {
  //       year,
  //     }
  //   }

  //   return null
  // }

  componentDidMount() {
    this.loadAnimes()
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.match.params.season !== prevProps.match.params.season ||
      this.props.match.params.year !== prevProps.match.params.year
    ) {
      this.loadAnimes()
    }
  }

  loadAnimes = async () => {
    const {
      match: {
        params: { season, year },
      },
    } = this.props

    try {
      this.setState({ loading: true })
      const res = await axios.get(`/season/${year}/${season}`)
      console.log(res.data)
      this.setState({ loading: false, animes: res.data.anime })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const { animes, size, loading } = this.state

    console.log(animes[0])

    const renderAnimes = loading ? (
      <p>Loading...</p>
    ) : (
      animes
        .slice(0, size)
        .map(anime => <Anime key={anime.mal_id} {...anime} />)
    )

    return <div className={styles.Container}>{renderAnimes}</div>
  }
}

export default List
