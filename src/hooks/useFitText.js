import { useLayoutEffect, useRef } from 'react'

// Shrinks el's font size until its scrollWidth fits within the parent
// container width minus `reserve` px, then clears the text so the
// typewriter can fill it in. Returns a ref holding the scale ratio applied.
//
// Uses useLayoutEffect (not useEffect) so the ratio is committed to the ref
// before any useEffect in the same render cycle reads it — preventing a race
// with usePageAnimation which needs h1Ratio.current to be settled.
export function useFitText(ref, text, { minFontSize = 10, reserve = 0 } = {}) {
  const hasRun = useRef(false)
  const ratio = useRef(1)

  useLayoutEffect(() => {
    if (hasRun.current) return
    hasRun.current = true
    const el = ref.current
    if (!el || !text) return

    const available = el.parentElement.clientWidth - reserve
    const originalFontSize = parseFloat(window.getComputedStyle(el).fontSize)
    let low = minFontSize
    let high = originalFontSize

    // Binary search for the largest font size that fits within `available`.
    // O(log n) forced-reflow iterations vs the previous O(n) decrement loop
    // (e.g. 6 iterations instead of 50 for a 48px → 10px range).
    while (low < high) {
      const mid = Math.ceil((low + high) / 2)
      el.style.fontSize = `${mid}px`
      el.textContent = text
      if (el.scrollWidth <= available) {
        low = mid
      } else {
        high = mid - 1
      }
    }

    // Apply the settled size. The loop may have terminated on a mid that was
    // too large (high = mid - 1 branch), so we always write `low` explicitly.
    el.style.fontSize = `${low}px`
    el.textContent = ''
    ratio.current = low / originalFontSize
  }, [])

  return ratio
}
