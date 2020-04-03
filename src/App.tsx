import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Navigation from './components/Navigation/Navigation'
import List from './containers/List/List'
import styles from './App.module.scss'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faCaretDown,
  faArrowLeft,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons'

library.add(faCaretDown, faArrowLeft, faArrowRight)

class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <Navigation />
        <div className={styles.Content}>
          <Switch>
            <Route exact path="/">
              <Redirect to="/list/2020/fall" />
            </Route>
            <Route path="/list/genres/:genre/:type/:page" component={List} />
            <Route path="/list/:year/:season" component={List} />
            <Route path="*">
              <Redirect to="/list/2020/fall" />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  )
}

export default App
