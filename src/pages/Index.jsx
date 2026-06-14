import { useRef } from 'react'
import Footer from '../components/Footer'
import { usePageAnimation } from '../hooks/usePageAnimation'

export default function Index() {
  const h1Ref = useRef(null)
  const h2Ref = useRef(null)
  const mainRef = useRef(null)
  const ctaRef = useRef(null)
  const footerRef = useRef(null)

  usePageAnimation({
    h1Ref,
    h2Ref,
    h1Text: 'you have found me!',
    h2Text: 'about me',
    ctaRef,
    footerRef,
    itemsRef: mainRef,
    onStagger: () => mainRef.current?.classList.add('revealed'),
  })

  return (
    <div>
      <h1 ref={h1Ref}></h1>

      <section className="page-section">
        <h2 ref={h2Ref}></h2>
        <div ref={mainRef} className="about-items">
          <p className="stagger-item about-item">hi, im james.</p>
          <p className="stagger-item about-item">20 yo.</p>
          <p className="stagger-item about-item">studies cs @ ualbany.</p>
          <p className="stagger-item about-item">incoming research intern @ skku.</p>
        </div>
      </section>

      <div ref={ctaRef} className="cta"></div>

      <Footer ref={footerRef} />
    </div>
  )
}