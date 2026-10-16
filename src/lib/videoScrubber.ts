const SENSITIVITY = 0.8
const SEEK_EPSILON = 0.01

type ScrubbableVideo = Pick<HTMLVideoElement, 'duration' | 'currentTime' | 'seeking'>

/** Keeps one seek in flight; subsequent movement updates only the latest target. */
export function createVideoScrubber(video: ScrubbableVideo) {
  let prevX: number | null = null
  let targetTime = video.currentTime || 0
  let seekInFlight = false

  function flush() {
    if (seekInFlight || video.seeking) return
    if (Math.abs(video.currentTime - targetTime) <= SEEK_EPSILON) return
    seekInFlight = true
    video.currentTime = targetTime
  }

  return {
    move(currentX: number, viewportWidth: number) {
      const previous = prevX
      prevX = currentX
      if (previous === null || viewportWidth <= 0) return
      if (!Number.isFinite(video.duration) || video.duration <= 0) return

      const delta = currentX - previous
      targetTime = Math.max(0, Math.min(
        video.duration,
        targetTime + (delta / viewportWidth) * SENSITIVITY * video.duration,
      ))
      flush()
    },
    seeked() {
      seekInFlight = false
      flush()
    },
    resetPointer() {
      prevX = null
    },
  }
}
