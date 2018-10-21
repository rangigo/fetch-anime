import React, { Component } from 'react'

import { formatToTimeZone } from 'date-fns-timezone'

import styles from './CountdownTime.module.scss'

export class CountdownTime extends Component {
  state = {
    countdownTime: this.props.time ? this.props.time * 1000 : null,
  }

  componentDidMount() {
    if (this.state.countdownTime >= 0 && this.state.countdownTime !== null) {
      this.interval = setInterval(() => {
        this.setState({
          countdownTime: this.state.countdownTime - 1000,
        })
      }, 1000)
    } else {
      clearInterval(this.interval)
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    const { countdownTime } = this.state
    const { ep,type } = this.props

    return (
      <>
        {countdownTime ? (
          <div className={styles.EpCountdown}>
            {type === 'TV' ? `EP ${ep}: ` : `Release: `}
            {formatToTimeZone(countdownTime, 'D[d] HH[h] mm[m] ss[s]', {
              timeZone: 'Europe/Helsinki',
            })}
          </div>
        ) : null}
      </>
    )
  }
}

export default CountdownTime
