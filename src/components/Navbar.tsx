import { Fragment, useEffect, useRef } from 'react'
import { mailto, navigation } from '../content'

type Props = { menuOpen: boolean; setMenuOpen: (open: boolean) => void }

export function Navbar({ menuOpen, setMenuOpen }: Props) {
  const toggleRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!menuOpen) return
    const frame = requestAnimationFrame(() => menuRef.current?.querySelector('a')?.focus())
    const close = () => {
      setMenuOpen(false)
      toggleRef.current?.focus()
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
      if (event.key !== 'Tab') return
      const links = [...(menuRef.current?.querySelectorAll('a') ?? []), toggleRef.current]
        .filter((element): element is HTMLAnchorElement | HTMLButtonElement => Boolean(element))
      const current = links.indexOf(document.activeElement as HTMLAnchorElement)
      event.preventDefault()
      links[(current + (event.shiftKey ? -1 : 1) + links.length) % links.length]?.focus()
    }
    const breakpoint = window.matchMedia('(min-width: 768px)')
    const onBreakpoint = () => { if (breakpoint.matches) setMenuOpen(false) }
    window.addEventListener('keydown', onKeyDown)
    breakpoint.addEventListener('change', onBreakpoint)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('keydown', onKeyDown)
      breakpoint.removeEventListener('change', onBreakpoint)
    }
  }, [menuOpen, setMenuOpen])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-10 flex items-center justify-between px-5 py-4 text-black sm:px-8 sm:py-5">
        <a href={import.meta.env.BASE_URL} aria-label="Mainframe home" className="flex items-center gap-3">
          <span className="text-[21px] tracking-tight sm:text-[26px]" style={{ fontFamily: 'var(--font-heading)' }}>Mainframe®</span>
          <span aria-hidden="true" className="select-none text-[25px] leading-none tracking-[-0.02em] sm:text-[30px]">✳︎</span>
        </a>

        <nav aria-label="Main navigation" className="hidden text-[23px] md:flex">
          {navigation.map(({ label, href }, index) => (
            <Fragment key={label}>
              {index > 0 && <span className="whitespace-pre">, </span>}
              <a href={href} className="transition-opacity hover:opacity-60">{label}</a>
            </Fragment>
          ))}
        </nav>

        <a href={mailto('Let’s build something')} className="hidden text-[23px] underline underline-offset-2 transition-opacity hover:opacity-60 md:block">Get in touch</a>

        <button ref={toggleRef} type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="mobile-menu" className="flex flex-col gap-[5px] py-2 md:hidden">
          <span className={`h-[2px] w-6 bg-black transition-all duration-300 ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
          <span className={`h-[2px] w-6 bg-black transition-opacity duration-300 ${menuOpen ? 'opacity-0' : 'opacity-100'}`} />
          <span className={`h-[2px] w-6 bg-black transition-all duration-300 ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
        </button>
      </header>

      <nav ref={menuRef} id="mobile-menu" aria-label="Mobile navigation" aria-hidden={!menuOpen} inert={!menuOpen} className={`fixed inset-0 z-9 flex flex-col items-start justify-center gap-8 bg-white/95 px-8 text-[32px] font-medium backdrop-blur-sm transition-opacity duration-300 md:hidden ${menuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}>
        {navigation.map(({ label, href }) => (
          <a key={label} href={href} onClick={() => { setMenuOpen(false); toggleRef.current?.focus() }} className="transition-opacity hover:opacity-60">{label}</a>
        ))}
        <a href={mailto('Let’s build something')} onClick={() => { setMenuOpen(false); toggleRef.current?.focus() }} className="underline underline-offset-4 transition-opacity hover:opacity-60">Get in touch</a>
      </nav>
    </>
  )
}
