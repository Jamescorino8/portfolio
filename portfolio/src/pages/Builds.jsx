import ProjectCard from '../components/ProjectCard'
import Footer from '../components/Footer'

const PROJECTS = [
  {
    name: 'portfolio',
    year: '2026',
    desc: "personal site. you're looking at it.",
    tags: ['html', 'css', 'js'],
    link: 'https://github.com/Jamescorino8/portfolio',
  },
]

export default function Builds() {
  return (
    <div>
      <h1 className="text-5xl font-bold mb-8">what am i working on?</h1>

      <section className="mb-8">
        <h2 className="text-5xl font-bold mb-4">builds</h2>
        {PROJECTS.map(p => (
          <ProjectCard key={p.name} {...p} />
        ))}
      </section>

      <section className="text-center mt-8">
        <p className="my-4" style={{ opacity: 0.7 }}>wip :P</p>
      </section>

      <p className="cta">wanna keep in touch?</p>
      <Footer />
    </div>
  )
}
