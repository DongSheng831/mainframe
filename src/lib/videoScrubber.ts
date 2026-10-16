const SEEK_EPSILON = 0.01
// This clip faces forward at about 40% of its timeline.
const FRONT_FACING_PROGRESS = 0.4

type ScrubbableVideo = Pick<HTMLVideoElement, 'duration' | 'currentTime' | 'seeking'>

/** Keeps one seek in flight; subsequent movement updates only the latest target. */
export function createVideoScrubber(video: ScrubbableVideo) {
  let pointerProgress = 0.5
  let targetTime = video.currentTime || 0
  let seekInFlight = false

  function flush() {
    if (seekInFlight || video.seeking) return
    if (Math.abs(video.currentTime - targetTime) <= SEEK_EPSILON) return
    seekInFlight = true
    video.currentTime = targetTime
  }

  function updateTarget() {
    if (!Number.isFinite(video.duration) || video.duration <= 0) return
    const clipProgress = pointerProgress <= 0.5
      ? pointerProgress * 2 * FRONT_FACING_PROGRESS
      : FRONT_FACING_PROGRESS + (pointerProgress - 0.5) * 2 * (1 - FRONT_FACING_PROGRESS)
    targetTime = clipProgress * video.duration
    flush()
  }

  return {
    move(currentX: number, viewportWidth: number) {
      if (!Number.isFinite(currentX) || !Number.isFinite(viewportWidth) || viewportWidth <= 0) return
      pointerProgress = Math.max(0, Math.min(1, currentX / viewportWidth))
      updateTarget()
    },
    seeked() {
      seekInFlight = false
      flush()
    },
    ready() {
      updateTarget()
    },
  }
}
