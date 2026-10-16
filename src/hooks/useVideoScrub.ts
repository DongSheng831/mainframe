import { useEffect } from 'react'
import type { RefObject } from 'react'
import { createVideoScrubber } from '../lib/videoScrubber'

export function useVideoScrub(videoRef: RefObject<HTMLVideoElement | null>) {
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const scrubber = createVideoScrubber(video)
    let pointerX: number | null = null
    const onMouseMove = (event: MouseEvent) => {
      pointerX = event.clientX
      scrubber.move(pointerX, window.innerWidth)
    }
    const onSeeked = () => scrubber.seeked()
    const onReady = () => scrubber.ready()
    const onResize = () => scrubber.move(pointerX ?? window.innerWidth / 2, window.innerWidth)

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('resize', onResize)
    video.addEventListener('loadedmetadata', onReady)
    video.addEventListener('seeked', onSeeked)
    onReady()
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      video.removeEventListener('loadedmetadata', onReady)
      video.removeEventListener('seeked', onSeeked)
    }
  }, [videoRef])
}
