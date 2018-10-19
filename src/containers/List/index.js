import React, { Component } from 'react'
import ReactPaginate from 'react-paginate'
import axios from '../../hoc/axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Anime from '../../components/Anime'
import Loader from '../../components/Anime/Loader'
import styles from './List.module.scss'

export class List extends Component {
  state = {
    data: [],
    animes: [],
    loading: false,
    activeType: 'TV',
    pages: 1,
    currentPage: 0,
    animesPerPage: 16,
  }

  componentDidMount() {
    this.loadAnimes()
    // axios.get('/anime/37349').then(res => console.log(res.data))
    // axios.get('/anime/36999').then(res => console.log(res.data))
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

      // Set initial data
      await this.setState({
        data: res.data.anime
          .filter(anime => anime.r18 === false)
          .sort(
            (a, b) =>
              a.members < b.members ? 1 : a.members > b.members ? -1 : 0
          ),
      })

      //Set animes by Type
      await this.setState({
        animes: this.state.data.filter(
          anime => anime.type === this.state.activeType
        ),
      })

      //Set Pages value and Loading to false
      await this.setState({
        loading: false,
        pages: this.state.animes.length / this.state.animesPerPage,
      })
    } catch (err) {
      console.log(err)
    }
  }

  onClickType = e => {
    const { value } = e.target
    const animesByType = this.state.data.filter(anime => {
      if (value !== 'All') return anime.type === value
      else return true
    })
    this.setState({
      activeType: value,
      animes: animesByType,
      pages: animesByType.length / this.state.animesPerPage,
      currentPage: 0,
    })
  }

  handlePageClick = data => {
    this.setState({ currentPage: data.selected })
    console.log(data.selected)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  render() {
    const {
      animes,
      loading,
      activeType,
      pages,
      animesPerPage,
      currentPage,
    } = this.state

    const {
      match: {
        params: { season, year },
      },
    } = this.props

    console.log(animes)

    const renderAnimes = loading
      ? Array.from('dummyobjects').map((_, i) => <Loader key={i} />)
      : animes
          .slice(currentPage * animesPerPage, (currentPage + 1) * animesPerPage)
          .map(anime => <Anime key={anime.mal_id} {...anime} />)

    const activeTypeClassname = [styles.Type, styles.TypeActive].join(' ')

    return (
      <>
        <div className={styles.ListHeader}>
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

        <div className={styles.ListContainer}>
          {renderAnimes.length === 0 ? 'No animes found.' : renderAnimes}
        </div>

        {loading ? null : (
          <div className={styles.ListFooter}>
            <ReactPaginate
              previousLabel={<FontAwesomeIcon icon="arrow-left" />}
              nextLabel={<FontAwesomeIcon icon="arrow-right" />}
              breakClassName={styles.BreakLabel}
              pageCount={pages}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              forcePage={currentPage}
              onPageChange={this.handlePageClick}
              containerClassName={styles.Pagination}
              activeClassName={styles.PageActive}
            />
          </div>
        )}
      </>
    )
  }
}

export default List
