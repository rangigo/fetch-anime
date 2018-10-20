import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://graphql.anilist.co/'
})

export default instance