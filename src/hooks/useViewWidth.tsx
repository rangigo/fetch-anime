import { useState, useEffect } from 'react'

export default function useViewWidth() {
  const [viewWidth, setViewWidth] = useState(window.innerWidth)

  useEffect(() => {
    const updateViewWidth = () => {
      setViewWidth(window.innerWidth)
    }
    window.addEventListener('resize', updateViewWidth)

    return () => window.removeEventListener('resize', updateViewWidth)
  }, [])

  return viewWidth
}
