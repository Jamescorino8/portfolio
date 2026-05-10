import { useEffect, useRef } from 'react'

// Shrinks el font size by 1px at a time until scrollWidth fits within the
// parent container minus reserve px, then clears text for the typewriter.
// Returns a ref holding the scale ratio applied.
export function useFitText(ref, text, { minFontSize = 10, reserve = 0 } = {}) {
  const hasRun = useRef(false)
  const ratio = useRef(1)

  useEffect(() => {
    if (hasRun.current) return
    hasRun.current = true
    const el = ref.current
    if (!el || !text) return

    const available = el.parentElement.clientWidth - reserve
    let fontSize = parseFloat(window.getComputedStyle(el).fontSize)
    const originalFontSize = fontSize

    while (fontSize > minFontSize) {
      el.style.fontSize = `${fontSize}px`
      el.textContent = text
      if (el.scrollWidth <= available) break
      fontSize -= 1
    }

    ratio.current = fontSize / originalFontSize
    el.textContent = ''
  }, [])

  return ratio
}
