import { useRef, useState } from 'react'
import { ActionPills } from './components/ActionPills'
import { Navbar } from './components/Navbar'
import { useTypewriter } from './hooks/useTypewriter'
import { useVideoScrub } from './hooks/useVideoScrub'

const VIDEO_URL = `${import.meta.env.BASE_URL}media/mainframe-character-turn.mp4`
const VIDEO_POSTER = `${import.meta.env.BASE_URL}media/mainframe-character-poster.jpg`
const GREETING = 'Glad you stopped in. Good taste tends to find us. Now, what are we building?'

export default function App() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoError, setVideoError] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { displayed, done } = useTypewriter(GREETING)
  useVideoScrub(videoRef)

  return (
    <>
      <video ref={videoRef} src={VIDEO_URL} poster={VIDEO_POSTER} muted playsInline preload="auto" aria-hidden="true" onError={() => setVideoError(true)} className="fixed inset-0 z-0 h-full w-full object-cover object-center md:object-[70%_center]" />
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main inert={menuOpen} className="hero relative z-1 flex h-screen flex-col justify-end overflow-hidden px-5 pb-12 sm:px-8 md:justify-center md:px-10 md:pb-0">
        <h1 className="sr-only">Mainframe — What are we building?</h1>
        <div className="relative z-10 max-w-xl">
          <p className="aria-copy pointer-events-none mb-5 select-none leading-[1.3] text-black blur-[4px] sm:mb-6">
            Hey there, meet A.R.I.A,<br />
            Mainframe&apos;s Adaptive Response Interface Agent
          </p>
          <p className="aria-copy mb-5 min-h-[54px] leading-[1.35] text-black sm:mb-6" aria-label={GREETING}>
            <span aria-hidden="true">{displayed}</span>
            {!done && <span aria-hidden="true" className="typing-cursor ml-[2px] inline-block h-[1.1em] w-[2px] animate-[blink_1s_step-end_infinite] bg-black align-middle" />}
          </p>
          <ActionPills />
        </div>
      </main>
      {videoError && <p role="status" className="fixed right-5 bottom-3 z-1 text-xs text-black/60">Background video unavailable.</p>}
    </>
  )
}
