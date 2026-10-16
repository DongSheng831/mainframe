import { useEffect } from 'react'
import type { RefObject } from 'react'
import { createVideoScrubber } from '../lib/videoScrubber'

export function useVideoScrub(videoRef: RefObject<HTMLVideoElement | null>) {
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const scrubber = createVideoScrubber(video)
    const onMouseMove = (event: MouseEvent) => scrubber.move(event.clientX, window.innerWidth)
    const onSeeked = () => scrubber.seeked()
    const onLeave = () => scrubber.resetPointer()

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('blur', onLeave)
    document.documentElement.addEventListener('mouseleave', onLeave)
    video.addEventListener('seeked', onSeeked)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('blur', onLeave)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      video.removeEventListener('seeked', onSeeked)
    }
  }, [videoRef])
}
