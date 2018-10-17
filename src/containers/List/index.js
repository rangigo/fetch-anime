import React, { Component } from 'react'
import axios from '../../hoc/axios'

import Anime from '../../components/Anime'
import Loader from '../../components/Anime/Loader'
import styles from './List.module.scss'

export class List extends Component {
  state = {
    animes: [],
    size: 14,
    loading: false,
    activeType: 'TV',
  }

  componentDidMount() {
    this.loadAnimes()
    // axios.get('/anime/37349').then(res => console.log(res.data))
    axios.get('/anime/36999').then(res => console.log(res.data))
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

      this.setState({
        loading: false,
        animes: res.data.anime
          .filter(anime => anime.r18 === false)
          .sort(
            (a, b) =>
              a.members < b.members ? 1 : a.members > b.members ? -1 : 0,
          ),
      })
    } catch (err) {
      console.log(err)
    }
  }

  onClickType = e => {
    this.setState({ activeType: e.target.value })
  }

  render() {
    const { animes, size, loading, activeType } = this.state
    const {
      match: {
        params: { season, year },
      },
    } = this.props

    console.log(animes)

    const renderAnimes = loading ? (
      Array.from('dummyobj')
        .map((_, i) => <Loader key={i} /> )
    ) : (
      animes
        .filter(anime => {
          if (activeType !== 'All')
            return anime.type === activeType && anime.continuing === false
          else return anime.continuing === false
        })
        .slice(0, size)
        .map(anime => <Anime key={anime.mal_id} {...anime} />)
    )

    const activeTypeClassname = [styles.Type, styles.TypeActive].join(' ')

    return (
      <>
        <div className={styles.ListTitle}>
          <h1>
            {season} {year}-{+year + 1} Anime
          </h1>
          <nav>
            <button
              className={
                activeType === 'TV' ? activeTypeClassname : styles.Type
              }
              onClick={this.onClickType}
              value="TV"
            >
              Television
            </button>
            <button
              className={
                activeType === 'Movie' ? activeTypeClassname : styles.Type
              }
              onClick={this.onClickType}
              value="Movie"
            >
              Movies
            </button>
            <button
              className={
                activeType === 'OVA' ? activeTypeClassname : styles.Type
              }
              onClick={this.onClickType}
              value="OVA"
            >
              OVA
            </button>
            <button
              className={
                activeType === 'All' ? activeTypeClassname : styles.Type
              }
              onClick={this.onClickType}
              value="All"
            >
              All
            </button>
          </nav>
        </div>
        <div className={styles.Container}>
          {renderAnimes.length === 0 ? 'No animes found.' : renderAnimes}
        </div>
      </>
    )
  }
}

export default List
