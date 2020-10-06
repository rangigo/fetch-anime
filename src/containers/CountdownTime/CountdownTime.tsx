import React, { useState, useEffect } from 'react'

import { formatToTimeZone } from 'date-fns-timezone'

import styles from './CountdownTime.module.scss'

export interface CountdownTimeProps {
  ep: number | null
  type: string
  time: number | null | undefined
}

function CountdownTime({ ep, type, time }: CountdownTimeProps) {
  const [countdownTime, setCountdownTime] = useState(time ? time * 1000 : null)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (countdownTime !== null && countdownTime >= 0) {
      interval = setInterval(() => {
        setCountdownTime(countdownTime - 1000)
      }, 1000)
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
