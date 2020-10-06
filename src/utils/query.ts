import gql from 'graphql-tag'

export const GET_ANIMES = gql`
  {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      media(
        season: $season
        seasonYear: $seasonYear
        type: ANIME
        sort: POPULARITY_DESC
        isAdult: false
        genre: $genre
        format: $format
      ) {
        startDate {
          year
          month
          day
        }
        id
        idMal
        trailer {
          id
          site
        }
        genres
        episodes
        duration
        source
        studios(isMain: true) {
          nodes {
            name
          }
        }
        externalLinks {
          url
          site
        }
        title {
          english
          romaji
          native
        }
        nextAiringEpisode {
          timeUntilAiring
          episode
        }
        description
        coverImage {
          extraLarge
          large
        }
        format
        airingSchedule(perPage: 1, page: 1) {
          nodes {
            airingAt
            episode
          }
        }
      }
    }
  }
`
