import React, { useState, useEffect } from 'react'

import { formatToTimeZone } from 'date-fns-timezone'

import styles from './CountdownTime.module.scss'

function CountdownTime({ ep, type, time }) {
  const [countdownTime, setCountdownTime] = useState(time ? time * 1000 : null)

  let interval

  useEffect(() => {
    if (countdownTime >= 0 && countdownTime !== null) {
      interval = setInterval(() => {
        setCountdownTime(countdownTime - 1000)
      }, 1000)
    } else {
      clearInterval(interval)
    }

    return () => {
      clearInterval(interval)
    }
  }, [countdownTime])

  return (
    <>
      {countdownTime ? (
        <div className={styles.EpCountdown}>
          {type === 'TV' || type === 'TV_SHORT' || type === 'ONA'
            ? `EP ${ep}: `
            : `Release: `}
          {formatToTimeZone(countdownTime, 'D[d] HH[h] mm[m] ss[s]', {
            timeZone: 'Europe/Helsinki',
          })}
        </div>
      ) : null}
    </>
  )
}

export default CountdownTime
