import { useEffect, useRef } from 'react'

// Shrinks el font size by 1px at a time until scrollWidth fits within the
// parent container minus reserve px, then clears text for the typewriter.
// If storageKey is given, the computed size is cached in localStorage so
// subsequent pages reuse it (whichever page loads first wins).
// Returns a ref holding the scale ratio applied (useful for scaling siblings).
export function useFitText(ref, text, { minFontSize = 10, reserve = 0, storageKey = null } = {}) {
  const hasRun = useRef(false)
  const ratio = useRef(1)

  useEffect(() => {
    if (hasRun.current) return
    hasRun.current = true
    const el = ref.current
    if (!el || !text) return

    const originalFontSize = parseFloat(window.getComputedStyle(el).fontSize)
    let fontSize

    const cached = storageKey && localStorage.getItem(storageKey)
    if (cached) {
      fontSize = parseFloat(cached)
      el.style.fontSize = `${fontSize}px`
    } else {
      const available = el.parentElement.clientWidth - reserve
      fontSize = originalFontSize

      while (fontSize > minFontSize) {
        el.style.fontSize = `${fontSize}px`
        el.textContent = text
        if (el.scrollWidth <= available) break
        fontSize -= 1
      }

      if (storageKey) localStorage.setItem(storageKey, fontSize)
    }

    ratio.current = fontSize / originalFontSize
    el.textContent = ''
  }, [])

  return ratio
}
