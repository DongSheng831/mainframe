import assert from 'node:assert/strict'
import test from 'node:test'
import { createVideoScrubber } from '../src/lib/videoScrubber.ts'

function media(duration = 10) {
  let time = 0
  const seeks = []
  return {
    duration,
    seeking: false,
    get currentTime() { return time },
    set currentTime(value) { time = value; seeks.push(value) },
    seeks,
  }
}

test('absolute pointer position maps left, center and right to matching head poses', () => {
  const video = media()
  const scrubber = createVideoScrubber(video)
  scrubber.move(0, 1000)
  assert.deepEqual(video.seeks, [])
  scrubber.move(500, 1000)
  assert.equal(video.currentTime, 4)
  scrubber.seeked()
  scrubber.move(1000, 1000)
  assert.equal(video.currentTime, 10)
  scrubber.seeked()
  scrubber.move(250, 1000)
  assert.equal(video.currentTime, 2)
})

test('the first movement responds immediately and does not depend on movement history', () => {
  const video = media()
  const scrubber = createVideoScrubber(video)
  scrubber.move(750, 1000)
  assert.equal(video.currentTime, 7)
  scrubber.seeked()
  scrubber.move(250, 1000)
  assert.equal(video.currentTime, 2)
  scrubber.seeked()
  scrubber.move(750, 1000)
  assert.equal(video.currentTime, 7)
})

test('metadata readiness centers the head, or applies the latest pointer from loading', () => {
  const video = media(Number.NaN)
  const scrubber = createVideoScrubber(video)
  scrubber.ready()
  assert.deepEqual(video.seeks, [])
  video.duration = 10
  scrubber.ready()
  assert.equal(video.currentTime, 4)

  const loadingVideo = media(Number.NaN)
  const loadingScrubber = createVideoScrubber(loadingVideo)
  loadingScrubber.move(750, 1000)
  assert.deepEqual(loadingVideo.seeks, [])
  loadingVideo.duration = 10
  loadingScrubber.ready()
  assert.equal(loadingVideo.currentTime, 7)
})

test('rapid movements coalesce into one latest seek after seeked', () => {
  const video = media()
  const scrubber = createVideoScrubber(video)
  scrubber.move(0, 1000)
  scrubber.move(100, 1000)
  scrubber.move(200, 1000)
  scrubber.move(300, 1000)
  assert.equal(video.seeks.length, 1)
  scrubber.seeked()
  assert.equal(video.seeks.length, 2)
  assert.ok(Math.abs(video.currentTime - 2.4) < 0.00001)
  scrubber.seeked()
  assert.equal(video.seeks.length, 2)
})

test('seeks clamp at both ends of the video', () => {
  const video = media()
  const scrubber = createVideoScrubber(video)
  scrubber.move(-5000, 1000)
  assert.equal(video.currentTime, 0)
  scrubber.move(5000, 1000)
  assert.equal(video.currentTime, 10)
  scrubber.seeked()
  scrubber.move(-5000, 1000)
  assert.equal(video.currentTime, 0)
})

test('missing metadata and zero viewport width cannot produce invalid seeks', () => {
  const video = media(Number.NaN)
  const scrubber = createVideoScrubber(video)
  scrubber.move(0, 1000)
  scrubber.move(500, 1000)
  assert.deepEqual(video.seeks, [])
  video.duration = 10
  scrubber.move(600, 0)
  assert.deepEqual(video.seeks, [])
  scrubber.move(700, 1000)
  assert.ok(Math.abs(video.currentTime - 6.4) < 0.00001)
})
