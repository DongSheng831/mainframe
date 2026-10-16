import { useEffect, useState } from 'react'

export function useTypewriter(text: string, speed = 38, startDelay = 600) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    setDisplayed('')
    let interval: ReturnType<typeof setInterval> | undefined
    const delay = setTimeout(() => {
      let index = 0
      interval = setInterval(() => {
        index += 1
        setDisplayed(text.slice(0, index))
        if (index >= text.length) clearInterval(interval)
      }, speed)
    }, startDelay)

    return () => {
      clearTimeout(delay)
      clearInterval(interval)
    }
  }, [text, speed, startDelay])

  return { displayed, done: displayed === text }
}
