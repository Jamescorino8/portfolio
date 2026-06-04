import { useState, useEffect } from 'react'

export function useTheme() {
  const getInitialTheme = () => {
    const stored = localStorage.getItem('theme')
    if (stored) return stored === 'light'
    return window.matchMedia('(prefers-color-scheme: light)').matches
  }

  const [isLight, setIsLight] = useState(getInitialTheme)

  useEffect(() => {
    document.body.classList.toggle('light-mode', isLight)
    localStorage.setItem('theme', isLight ? 'light' : 'dark')
  }, [isLight])

  // Also listen for OS-level changes when no preference saved
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: light)')
    const handler = (e) => {
      if (!localStorage.getItem('theme')) setIsLight(e.matches)
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return { isLight, toggle: () => setIsLight(v => !v) }
}
