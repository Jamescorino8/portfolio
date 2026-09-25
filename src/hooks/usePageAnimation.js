import { useRef } from 'react'
import gsap from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP, TextPlugin)

const SECONDS_PER_CHAR = 0.05
const CTA_TEXT = 'wanna keep in touch?'

/** Types `text` into `el`, showing the .typing cursor from `pause` until done. */
function type(el, text, pause = 0) {
  return gsap.timeline()
    .call(() => el.classList.add('typing'))
    .to(el, { text, duration: text.length * SECONDS_PER_CHAR, ease: 'none' }, pause)
    .call(() => el.classList.remove('typing'))
}

/**
 * Runs the page-entry sequence inside the returned scope ref:
 *   type h1 → fade in h2 → type h2 → highlight → underline
 *   → stagger .stagger-item → type .cta → reveal footer
 *
 * The scope element gets `--fit-chars` (drives the h1/h2 CSS font size) and
 * the `revealed` class once the items start coming in. Under
 * prefers-reduced-motion the sequence jumps straight to its end state.
 */
export function usePageAnimation({ h1Text, h2Text }) {
  const scope = useRef(null)

  useGSAP(() => {
    const page = scope.current
    const h1 = page.querySelector('h1')
    const h2 = page.querySelector('h2')
    const cta = page.querySelector('.cta')

    gsap.set(page, { '--fit-chars': h1Text.length + 1 }) // +1 leaves room for the cursor

    const tl = gsap.timeline()
      .add(type(h1, h1Text, 0.3))
      .to(h2, { opacity: 1, duration: 0.35 })
      .add(type(h2, h2Text))
      .call(() => h2.classList.add('highlighted'), null, '+=0.4')
      .call(() => h2.classList.replace('highlighted', 'underlined'), null, '+=0.35')
      .call(() => page.classList.add('revealed'), null, '+=0.2')
      .to('.stagger-item', { opacity: 1, y: 0, pointerEvents: 'auto', duration: 0.35, stagger: 0.1 })
      .add(type(cta, CTA_TEXT), '+=0.1')
      .to('footer', { opacity: 1, pointerEvents: 'auto', duration: 0.5 })

    // Reduced motion: skip straight to the end state (callbacks still fire).
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) tl.progress(1)
  }, { scope })

  return scope
}
