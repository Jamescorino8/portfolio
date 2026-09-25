import ProjectCard from '../components/ProjectCard'
import Footer from '../components/Footer'
import { usePageAnimation } from '../hooks/usePageAnimation'
import { PROJECTS } from '../data/ProjectsList.js'

export default function Builds() {
  const scope = usePageAnimation({
    h1Text: 'what am i working on?',
    h2Text: 'builds',
  })

  return (
    <div ref={scope} className="page">
      <h1 aria-label="what am i working on?"></h1>

      <section className="page-section">
        <h2 aria-label="builds"></h2>
        {PROJECTS.map(p => (
          <div key={p.name} className="stagger-item">
            <ProjectCard {...p} />
          </div>
        ))}
      </section>

      <div className="cta"></div>

      <Footer />
    </div>
  )
}
