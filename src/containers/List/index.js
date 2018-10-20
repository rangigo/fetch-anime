import React, { Component } from 'react'
import ReactPaginate from 'react-paginate'
import axios from '../../hoc/axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Anime from '../../components/Anime'
import Loader from '../../components/Anime/Loader'
import styles from './List.module.scss'
import ListTitle from '../../components/ListTitle'
import ListType from '../../components/ListType'

const ListTypes = [
  {
    value: 'TV',
    label: 'Television',
  },
  {
    value: 'Movie',
    label: 'Movies',
  },
  {
    value: 'OVA',
    label: 'OVA',
  },
  {
    value: 'All',
    label: 'All',
  },
]

export class List extends Component {
  state = {
    data: [],
    animes: [],
    loading: false,
    activeType: 'TV',
    pages: 0,
    currentPage: 0,
    animesPerPage: 12,
    viewWidth: window.innerWidth,
    err: null,
    currentGenre: '',
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateViewWidth)
    this.loadAnimes()
    // axios.get('/anime/37349').then(res => console.log(res.data))
    // axios.get('/anime/36999').then(res => console.log(res.data))
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.match.params.season !== prevProps.match.params.season ||
      this.props.match.params.year !== prevProps.match.params.year ||
      this.props.match.params.tag !== prevProps.match.params.tag
    ) {
      this.loadAnimes()
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateViewWidth)
  }

  updateViewWidth = () => this.setState({ viewWidth: window.innerWidth })

  loadAnimes = async () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })

    const {
      match: {
        params: { season, year, tag },
      },
    } = this.props

    try {
      this.setState({
        loading: true,
        // Genre route links have nested state to inform name of the genre
        currentGenre: this.props.location.state
          ? this.props.location.state.name
          : '',
        currentPage: 0,
        pages: 0,
      })

      // Make API calls base on parameters
      const res = tag
        ? await axios.get(`/genre/anime/${tag}`)
        : await axios.get(`/season/${year}/${season}`)

      // Set initial data
      this.setState({
        data: res.data.anime
          .filter(anime => anime.r18 === false)
          .sort(
            (a, b) =>
              a.members < b.members ? 1 : a.members > b.members ? -1 : 0
          ),
        // This handles displaying ListTitle if the user want to navigate genres
        // not through anime tags
        // but rather through pasting the link ex: /list/tags/7
        currentGenre: this.state.currentGenre
          ? this.state.currentGenre
          : res.data.mal_url
            ? res.data.mal_url.name.split('Anime')[0]
            : '',
      })

      // Set animes by Type, default is TV
      this.setState({
        animes: this.state.data.filter(
          anime =>
            this.state.activeType !== 'All'
              ? anime.type === this.state.activeType
              : true
        ),
      })

      // Set Pages value for pagination and Loading to false
      this.setState({
        loading: false,
        pages: this.state.animes.length / this.state.animesPerPage,
      })
    } catch (err) {
      this.setState({ err: err.res.data || err })
    }
  }

  onClickType = e => {
    const { value } = e.target
    const animesByType = this.state.data.filter(
      anime => (value !== 'All' ? anime.type === value : true)
    )
    this.setState({
      activeType: value,
      animes: animesByType,
      pages: animesByType.length / this.state.animesPerPage,
      currentPage: 0,
    })
  }

  handlePageClick = data => {
    this.setState({ currentPage: data.selected })
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
        : animes
            .slice(
              currentPage * animesPerPage,
              (currentPage + 1) * animesPerPage
            )
            .map(anime => (
              <Anime key={anime.mal_id} {...anime} viewWidth={viewWidth} />
            ))

    return (
      <>
        <div className={styles.ListHeader}>
          <ListTitle season={season} year={year} genre={currentGenre} />
          <nav>
            {ListTypes.map(type => (
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
            forcePage={currentPage}
            onPageChange={this.handlePageClick}
            containerClassName={styles.Pagination}
            activeClassName={styles.PageActive}
          />
        </div>
      </>
    )
  }
}

export default List
