import React, { Component } from 'react'
import ReactPaginate from 'react-paginate'
import axios from '../../hoc/axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Anime from '../../components/Anime'
import Loader from '../../components/Anime/Loader'
import styles from './List.module.scss'
import ListTitle from '../../components/ListTitle'
import ListType from '../../components/ListType'

export class List extends Component {
  state = {
    data: [],
    animes: [],
    loading: false,
    activeType: 'TV',
    pages: 1,
    currentPage: 0,
    animesPerPage: 12,
    viewWidth: window.innerWidth,
    err: null,
    currentGenre: '',
  }

  static ListTypes = [
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

  componentDidMount() {
    window.addEventListener('resize', this.updateViewWidth)
    this.loadAnimes()
    //Resize window => number of coins display shorten
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
      this.setState({ loading: true })

      // Make API calls base on parameters
      const res = tag
        ? await axios.get(`/genre/anime/${tag}`)
        : await axios.get(`/season/${year}/${season}`)

      // Set initial data
      await this.setState({
        data: res.data.anime
          .filter(anime => anime.r18 === false)
          .sort(
            (a, b) =>
              a.members < b.members ? 1 : a.members > b.members ? -1 : 0
          ),
        currentGenre: res.data.mal_url ? res.data.mal_url.name : '',
      })

      // Set animes by Type, default is TV
      await this.setState({
        animes: this.state.data.filter(
          anime =>
            this.state.activeType !== 'All'
              ? anime.type === this.state.activeType
              : true
        ),
      })

      // Set Pages value for pagination and Loading to false
      await this.setState({
        loading: false,
        pages: this.state.animes.length / this.state.animesPerPage,
      })
    } catch (err) {
      this.setState({ err: err.res.data })
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

    // console.log(animes)
    console.log(err)

    const renderAnimes = err
      ? 'Something is wrong please reload the page!'
      : loading
        ? Array.from('dummyobjects').map((_, i) => <Loader key={i} />)
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
          <ListTitle
            season={season}
            year={year}
            genre={currentGenre}
            loading={loading}
          />
          <nav>
            {List.ListTypes.map(type => (
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
