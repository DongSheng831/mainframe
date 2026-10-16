import { useEffect, useRef, useState } from 'react'
import { actions, EMAIL, mailto } from '../content'

const pill = 'mx-[0.2em] mb-[0.4em] inline-flex items-center justify-center rounded-full border px-4 py-[0.3em] text-[13px] whitespace-nowrap transition-colors duration-200 sm:px-5 sm:text-[15px]'

export function ActionPills() {
  const [visible, setVisible] = useState(false)
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle')
  const resetRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 400)
    return () => { clearTimeout(timeout); clearTimeout(resetRef.current) }
  }, [])

  async function copyEmail() {
    clearTimeout(resetRef.current)
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopyStatus('copied')
    } catch {
      setCopyStatus('error')
    }
    resetRef.current = setTimeout(() => setCopyStatus('idle'), 3500)
  }

  return (
    <div className="relative">
      <div className={`flex flex-wrap gap-y-1 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`} inert={!visible} style={{ transition: 'opacity 0.4s ease, transform 0.4s ease' }}>
        {actions.map(({ label, href }) => (
          <a key={label} href={href} className={`${pill} border-black/10 bg-white text-black hover:bg-black hover:text-white`}>{label}</a>
        ))}
        <button type="button" onClick={copyEmail} aria-label="Copy email address hello@mainframe.co" className={`${pill} gap-2 border-white bg-transparent text-white hover:bg-white hover:text-black sm:gap-3`}>
          <span>Reach us: <span className="underline underline-offset-1">{EMAIL}</span></span>
          <svg aria-hidden="true" width="12" height="12" viewBox="0 0 16 16" fill="none" className="shrink-0">
            <rect x="5.5" y="5.5" width="8" height="8" rx="1" stroke="currentColor" />
            <path d="M10.5 5.5V2.5h-8v8h3" stroke="currentColor" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <div role="status" aria-live="polite" className="absolute top-full left-1 text-[13px]">
        {copyStatus === 'copied' && <span className="inline-block rounded-full bg-white px-3 py-1 text-black">Email copied.</span>}
        {copyStatus === 'error' && <span className="inline-block rounded-full bg-white px-3 py-1 text-black">Copy unavailable. <a href={mailto('Hello Mainframe')} className="underline">Email us instead.</a></span>}
      </div>
    </div>
  )
}
