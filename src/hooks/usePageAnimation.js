import { useEffect, useRef } from 'react'
import TypeIt from 'typeit'
import { useFitText } from './useFitText'

const TYPESPEED = 50
const CTA_TEXT = 'wanna keep in touch?'

/** Resolves after `ms` milliseconds. */
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Wraps a TypeIt animation in a Promise that resolves when typing completes.
 * @param {Element} el    - DOM element to type into
 * @param {string}  text  - text to type
 * @param {object}  opts  - TypeIt options (merged with defaults)
 * @param {number}  [opts.pause=0] - ms to pause before typing begins
 */
function typeAsync(el, text, { pause = 0, ...opts } = {}) {
  return new Promise((resolve) => {
    let ti = new TypeIt(el, {
      speed: TYPESPEED,
      ...opts,
      afterComplete: (instance) => {
        instance.destroy()
        resolve()
      },
    })
    if (pause) ti = ti.pause(pause)
    ti.type(text).go()
  })
}

/**
 * Runs the full page-entry animation sequence:
 *   type h1 → expand h2 → type h2 → highlight → underline
 *   → stagger items → type CTA → reveal footer
 *
 * @param {object} opts
 * @param {React.RefObject} opts.h1Ref        - ref for the h1 TypeIt target
 * @param {React.RefObject} opts.h2Ref        - ref for the h2 TypeIt target
 * @param {string}          opts.h1Text       - text to type into h1 (also drives useFitText)
 * @param {string}          opts.h2Text       - text to type into h2
 * @param {React.RefObject} opts.ctaRef       - ref for the CTA paragraph TypeIt target
 * @param {React.RefObject} opts.footerRef    - ref for the footer element
 * @param {React.RefObject} opts.itemsRef     - ref to the container of .stagger-item children
 * @param {function}        [opts.onStagger]  - optional callback fired before the stagger begins
 * @param {number}          [opts.staggerDelay=100] - ms between each stagger-item reveal
 */
export function usePageAnimation({
  h1Ref,
  h2Ref,
  h1Text,
  h2Text,
  ctaRef,
  footerRef,
  itemsRef,
  onStagger,
  staggerDelay = 100,
}) {
  const hasRun = useRef(false)
  const h1Ratio = useFitText(h1Ref, h1Text, { reserve: 32 })

  useEffect(() => {
    if (hasRun.current) return
    hasRun.current = true

    async function run() {
      const h2 = h2Ref.current
      const footer = footerRef.current
      const items = itemsRef.current?.querySelectorAll('.stagger-item') ?? []

      // Scale h2 to match the ratio applied to h1 by useFitText
      const originalH2Size = parseFloat(window.getComputedStyle(h2).fontSize)
      h2.style.fontSize = `${originalH2Size * h1Ratio.current}px`

      // Step 1: type h1 (with a short leading pause)
      await typeAsync(h1Ref.current, h1Text, { pause: 300 })

      // Step 2a: slide h2 into view
      h2.classList.add('expanded')
      await delay(350)

      // Step 2b: type h2
      await typeAsync(h2, h2Text)

      // Step 2c: flash highlight, then settle to underline
      await delay(400)
      h2.classList.add('highlighted')
      await delay(350)
      h2.classList.remove('highlighted')
      h2.classList.add('underlined')
      await delay(200)

      // Step 3: stagger items in
      onStagger?.()
      items.forEach((item, i) => {
        setTimeout(() => item.classList.add('printed'), i * staggerDelay)
      })
      await delay(items.length * staggerDelay + 300)

      // Step 4: type CTA
      await typeAsync(ctaRef.current, CTA_TEXT)

      // Step 5: reveal footer
      footer?.classList.add('revealed')
    }

    run()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
}
