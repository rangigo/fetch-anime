import React, { Component } from 'react'

import { formatToTimeZone } from 'date-fns-timezone'

export class CountdownTime extends Component {
  state = {
    countdownTime: this.props.time * 1000,
  }

  componentDidMount() {
    this.setCountdownTime()
  }

  setCountdownTime = () => {
    if (this.state.countdownTime >= 0) {
      setInterval(() => {
        this.setState({
          countdownTime: this.state.countdownTime - 1000,
        })
      }, 1000)
    } else {
      clearInterval()
    }
  }

  render() {
    const { countdownTime } = this.state
    const { ep } = this.props
    
    return (
      <div>
        EP {ep}:{' '}
        {formatToTimeZone(countdownTime, 'D[d] HH[h] mm[m] ss[s]', {
          timeZone: 'Europe/Helsinki',
        })}
      </div>
    )
  }
}

export default CountdownTime
