import 'stop-runaway-react-effects/hijack'

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import './index.scss'
import App from './App'
import * as serviceWorker from './serviceWorker'

import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faCaretDown,
  faArrowLeft,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons'

library.add(faCaretDown, faArrowLeft, faArrowRight)

const httpLink = createHttpLink({
  uri: 'https://graphql.anilist.co',
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})

const app = (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>
)

ReactDOM.render(app, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
