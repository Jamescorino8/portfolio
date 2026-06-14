import { useRef } from 'react'
import ProjectCard from '../components/ProjectCard'
import Footer from '../components/Footer'
import { usePageAnimation } from '../hooks/usePageAnimation'
import { PROJECTS } from '../data/ProjectsList.js'

export default function Builds() {
  const h1Ref = useRef(null)
  const h2Ref = useRef(null)
  const mainRef = useRef(null)
  const ctaRef = useRef(null)
  const footerRef = useRef(null)

  usePageAnimation({
    h1Ref,
    h2Ref,
    h1Text: 'what am i working on?',
    h2Text: 'builds',
    ctaRef,
    footerRef,
    itemsRef: mainRef,
  })

  return (
    <div>
      <h1 ref={h1Ref}></h1>

      <section ref={mainRef} className="page-section">
        <h2 ref={h2Ref}></h2>
        {PROJECTS.map(p => (
          <div key={p.name} className="stagger-item">
            <ProjectCard {...p} />
          </div>
        ))}
      </section>

      <div ref={ctaRef} className="cta"></div>

      <Footer ref={footerRef} />
    </div>
  )
}