import { useLayoutEffect, useRef } from 'react'
import Footer from '../components/Footer'
import { usePageAnimation } from '../hooks/usePageAnimation'
import photo from '../assets/me.jpg'

export default function Index() {
  const scope = usePageAnimation({
    h1Text: 'who am i?',
    h2Text: 'about me',
  })
  const listRef = useRef(null)

  // The photo matches the list's height at its natural aspect ratio. CSS can't
  // size the grid column from a height, so measure the list and pass it in.
  useLayoutEffect(() => {
    const list = listRef.current
    const observer = new ResizeObserver(([entry]) => {
      list.parentElement.style.setProperty('--list-height', `${entry.borderBoxSize[0].blockSize}px`)
    })
    observer.observe(list)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={scope} className="page">
      <h1 aria-label="who am i?"></h1>

      <section className="page-section about">
        <h2 aria-label="about me"></h2>
        <div ref={listRef} className="about-items">
          <p className="stagger-item about-item">hi, im james.</p>
          <p className="stagger-item about-item">21 yo.</p>
          <p className="stagger-item about-item">bs/ms cs @ ualbany.</p>
          <p className="stagger-item about-item">spent summer '26 at skku in korea.</p>
          <p className="stagger-item about-item">did research @ skku infolab.</p>
          <p className="stagger-item about-item">looking for summer '27 internships.</p>
        </div>
        <img src={photo} alt="photo of james" className="stagger-item about-photo" />
      </section>

      <div className="cta"></div>

      <Footer />
    </div>
  )
}