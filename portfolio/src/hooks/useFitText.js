import { useEffect, useRef } from 'react'

// Temporarily injects full text, shrinks by 1px at a time until it fits on one line, then clears it for the typewriter.
export function useFitText(ref, text, minFontSize = 10) {
  const hasRun = useRef(false)
  useEffect(() => {
    if (hasRun.current) return
    hasRun.current = true
    const el = ref.current
    if (!el || !text) return

    el.textContent = text

    let fontSize = parseFloat(window.getComputedStyle(el).fontSize)

    while (fontSize > minFontSize) {
      el.textContent = 'A'
      const singleLineHeight = el.offsetHeight
      el.textContent = text

      if (el.offsetHeight < singleLineHeight * 1.5) break

      fontSize -= 1
      el.style.fontSize = `${fontSize}px`
    }

    el.textContent = ''
  }, [])
}
