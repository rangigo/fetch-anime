import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Navigation from './components/Navigation'
import List from './containers/List'
import styles from './App.module.scss'

class App extends Component {

  render() {
    return (
      <div className={styles.App}>
        <Navigation />
        <div className={styles.Content}>
          <Switch>
            <Route path="/list/:year/:season" component={List} />
            <Redirect to="/list/2018/fall" />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App
