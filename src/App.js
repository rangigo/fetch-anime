import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import Navigation from './components/Navigation'
import styles from './App.module.scss'

class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <Navigation />
        <Switch>
          <Route />
        </Switch>
      </div>
    )
  }
}

export default App
