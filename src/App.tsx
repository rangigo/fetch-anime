import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Navigation from './components/Navigation/Navigation'
// import List from './containers/List/List'
import List from './containers/List/ListRefactor'
import styles from './App.module.scss'

function App() {
  return (
    <div className={styles.App}>
      <Navigation />
      <div className={styles.Content}>
        <Switch>
          <Route exact path="/">
            <Redirect to="/list/2020/spring" />
          </Route>
          <Route exact path="/list/genres/:genre/:type/:page" component={List} />
          <Route exact path="/list/:year/:season" component={List} />
          <Route path="*">
            <Redirect to="/list/2020/spring" />
          </Route>
        </Switch>
      </div>
    </div>
  )
}

export default App
