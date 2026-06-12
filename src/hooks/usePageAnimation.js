import { useEffect, useRef } from 'react'
import TypeIt from 'typeit'
import { useFitText } from './useFitText'

const TYPESPEED = 50
const CTA_TEXT = 'wanna keep in touch?'

/**
 * Runs the full page-entry animation sequence:
 *   type h1 → expand h2 → type h2 → highlight → underline
 *   → stagger items → type CTA → reveal footer
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

    const h2 = h2Ref.current
    const footer = footerRef.current
    const items = itemsRef.current?.querySelectorAll('.stagger-item') ?? []

    // Scale h2 to match the ratio applied to h1 by useFitText
    const originalH2Size = parseFloat(window.getComputedStyle(h2).fontSize)
    h2.style.fontSize = `${originalH2Size * h1Ratio.current}px`

    // Step 3: stagger items in, then type CTA, then reveal footer
    function staggerAndReveal() {
      onStagger?.()
      items.forEach((item, i) => {
        setTimeout(() => item.classList.add('printed'), i * staggerDelay)
      })
      setTimeout(() => {
        new TypeIt(ctaRef.current, {
          speed: TYPESPEED,
          afterComplete: (instance) => {
            instance.destroy()
            footer?.classList.add('revealed')
          },
        })
          .type(CTA_TEXT)
          .go()
      }, items.length * staggerDelay + 300)
    }

    // Step 1: type h1
    new TypeIt(h1Ref.current, {
      speed: TYPESPEED,
      afterComplete: (instance) => {
        instance.destroy()

        // Step 2a: slide h2 into view
        h2.classList.add('expanded')
        setTimeout(() => {
          // Step 2b: type h2
          new TypeIt(h2, {
            speed: TYPESPEED,
            afterComplete: (instance) => {
              instance.destroy()

              // Step 2c: flash highlight, then underline
              setTimeout(() => {
                h2.classList.add('highlighted')
                setTimeout(() => {
                  h2.classList.remove('highlighted')
                  h2.classList.add('underlined')
                  setTimeout(staggerAndReveal, 200)
                }, 350)
              }, 400)
            },
          })
            .type(h2Text)
            .go()
        }, 350)
      },
    })
      .pause(300)
      .type(h1Text)
      .go()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
}
