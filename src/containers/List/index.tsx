import React, { Component } from 'react'
import ReactPaginate from 'react-paginate'
import axios from '../../hoc/axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { query, listTypes } from '../../helpers/globalVars'

import Anime from '../../components/Anime'
import Loader from '../../components/Anime/Loader'
import styles from './List.module.scss'
import ListTitle from '../../components/ListTitle'
import ListType from '../../components/ListType'

export class List extends Component {
  state = {
    data: [],
    hasNextPage: true,
    fetchPage: 1,
    animes: [],
    loading: false,
    activeType: 'TV',
    pages: 0,
    currentPage: 0,
    animesPerPage: 24,
    viewWidth: window.innerWidth,
    err: null,
    currentGenre: '',
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateViewWidth)
    this.loadAnimes()
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.match.params.season !== prevProps.match.params.season ||
      this.props.match.params.year !== prevProps.match.params.year ||
      this.props.match.params.genre !== prevProps.match.params.genre ||
      this.props.match.params.type !== prevProps.match.params.type
    ) {
      // Clear the data if props changed
      this.setState({ data: [], animes: [] })
      // Load new data
      this.loadAnimes()
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateViewWidth)
  }

  updateViewWidth = () => this.setState({ viewWidth: window.innerWidth })

  loadAnimes = async () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })

    // Get parameters from route
    const {
      match: {
        params: { season, year, genre, page, type },
      },
    } = this.props

    try {
      this.setState({
        loading: true,
        currentPage: 1,
        pages: 0,
        activeType: 'TV',
        currentGenre: '',
      })

      // Make API calls base on parameters
      if (genre) {
        this.setState({
          currentGenre: genre,
          currentPage: +page,
          activeType: type,
        })
        this.loadAnimesByGenre()
      } else {
        const res = await axios.post('', {
          query,
          variables: {
            season: season.toUpperCase(),
            seasonYear: year,
            page: this.state.fetchPage,
          },
        })
        const { media, pageInfo } = res.data.data.Page

        // Set initial data
        this.setState(
          {
            data: this.state.data.concat(media),
            hasNextPage: pageInfo.hasNextPage,
            // For animes by genre we will fetch 48 animes per page
            // So we need to reset the animes per page to 24 if we fetch by season
            animesPerPage: 24,
          },
          () => {
            // If we have next page, recursion fetch
            if (this.state.hasNextPage) {
              this.setState({ fetchPage: this.state.fetchPage + 1 }, () =>
                this.loadAnimes()
              )
            } else {
              // Else we finished fetching, set all the data
              // Set animes by Type, default is TV
              const animes = this.state.data.filter(
                anime =>
                  this.state.activeType !== 'All'
                    ? anime.format === this.state.activeType
                    : true
              )
              this.setState({
                animes,
                loading: false,
                pages: Math.ceil(animes.length / this.state.animesPerPage),
                // Reset fetch page
                fetchPage: 1,
              })
            }
          }
        )
      }
    } catch (err) {
      this.setState({ err: err.res || err })
    }
  }

  loadAnimesByGenre = () => {
    // Set per page to 48 and reset data
    // Then start fetching
    this.setState({ animesPerPage: 48, loading: true }, async () => {
      try {
        const res = await axios.post('', {
          query,
          variables: {
            genre: this.state.currentGenre,
            page: this.state.currentPage,
            perPage: this.state.animesPerPage,
            ...(this.state.activeType !== 'All'
              ? { format: this.state.activeType }
              : {}),
          },
        })

        const { media, pageInfo } = res.data.data.Page
        console.log('active type: ', this.state.activeType, pageInfo, media)

        this.setState({
          pages: pageInfo.lastPage,
          animes: media,
          loading: false,
        })
      } catch (err) {
        this.setState({ err: err.res || err })
      }
    })
  }

  onClickType = e => {
    const { value } = e.target

    this.setState({
      activeType: value,
      currentPage: 1,
    })
    const { currentGenre } = this.state
    // Handle type click base on genre anime or season anime
    if (currentGenre) {
      // We will fetch if user want to get genre anime
      // else if it's season anime we can just filter from the data,
      this.props.history.push(`/list/genres/${currentGenre}/${value}/1`)
    } else {
      const animesByType = this.state.data.filter(
        anime => (value !== 'All' ? anime.format === value : true)
      )
      this.setState({
        animes: animesByType,
        pages: Math.ceil(animesByType.length / this.state.animesPerPage),
      })
    }
  }

  handlePageClick = data => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    const { currentGenre, activeType } = this.state
    this.setState({ currentPage: data.selected + 1 })
    if (this.state.currentGenre) {
      // We will fetch if user want to get genre anime
      this.props.history.push(
        `/list/genres/${currentGenre}/${activeType}/${data.selected + 1}`
      )
      this.loadAnimesByGenre()
    }
  }

  render() {
    const {
      animes,
      loading,
      activeType,
      pages,
      animesPerPage,
      currentPage,
      viewWidth,
      err,
      currentGenre,
    } = this.state

    const {
      match: {
        params: { season, year },
      },
    } = this.props

    const renderAnimes = err
      ? 'Something is wrong please reload the page!'
      : loading
        ? Array.from('dummyobjects').map((_, i) => (
            <Loader key={i} viewWidth={viewWidth} />
          ))
        : this.state.currentGenre
          ? animes.map(anime => (
              <Anime key={anime.id} {...anime} viewWidth={viewWidth} />
            ))
          : animes
              .slice(
                (currentPage - 1) * animesPerPage,
                currentPage * animesPerPage
              )
              .map(anime => (
                <Anime key={anime.id} {...anime} viewWidth={viewWidth} />
              ))
    return (
      <>
        <div className={styles.ListHeader}>
          <ListTitle season={season} year={year} genre={currentGenre} />
          <nav>
            {listTypes.map(type => (
              <ListType
                activeType={activeType}
                onClickType={this.onClickType}
                value={type.value}
                label={type.label}
                key={type.value}
              />
            ))}
          </nav>
        </div>

        <div className={styles.ListContainer}>
          {renderAnimes.length === 0 ? 'No animes found.' : renderAnimes}
        </div>

        <div className={styles.ListFooter}>
          <ReactPaginate
            previousLabel={<FontAwesomeIcon icon="arrow-left" />}
            nextLabel={<FontAwesomeIcon icon="arrow-right" />}
            breakClassName={styles.BreakLabel}
            pageCount={pages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            forcePage={currentPage - 1}
            onPageChange={this.handlePageClick}
            containerClassName={styles.Pagination}
            activeClassName={styles.PageActive}
            disabledClassName={styles.PageDisabled}
          />
        </div>
      </>
    )
  }
}

export default List
