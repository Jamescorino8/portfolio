import { useRef } from 'react'
import ProjectCard from '../components/ProjectCard'
import Footer from '../components/Footer'
import { usePageAnimation } from '../hooks/usePageAnimation'

const PROJECTS = [
  {
    name: 'travel planner (wip)',
    year: '2026',
    desc: 'collaborative travel planner with map, calendar, and shared shortlist.',
    tags: ['react', 'vite', 'leaflet', 'fullcalendar', 'supabase'],
    link: 'https://github.com/Jamescorino8/travel-planner',
  },
  {
    name: 'portfolio',
    year: '2026',
    desc: "personal site. you're looking at it.",
    tags: ['react', 'css', 'typeit', 'vite'],
    link: 'https://github.com/Jamescorino8/portfolio/tree/main/portfolio',
  },
  {
    name: 'cpu simulator',
    year: '2026',
    desc: 'A from-scratch CPU simulator implementing a custom 16-bit ISA, fetch-decode-execute pipeline, assembler, and two-level cache hierarchy.',
    tags: ['java', 'maven', 'junit'],
    link: 'https://github.com/Jamescorino8/ICSI404',
  },
  {
    name: 'benchmark analysis',
    year: '2026',
    desc: 'A toolkit for analyzing and visualizing benchmark results. Provides utilities for parsing, aggregating, and presenting performance data to facilitate data-driven insights into software and system performance.',
    tags: ['python', 'matplotlib'],
    link: 'https://github.com/Jamescorino8/benchmark-analysis',
  },
  {
    name: 'battleship',
    year: '2025',
    desc: 'A command-line battleship game supporting both single-player (vs. CPU) and two-player (networked) modes.',
    tags: ['c', 'valgrind', 'docker', 'tcp'],
    link: 'https://github.com/Jamescorino8/ICSI333/tree/main/battleship',
  },
  {
    name: 'nusha compiler',
    year: '2025',
    desc: 'A compiler and constraint-satisfaction solver for a small declarative language that lets users define typed variables and logical rules, then automatically finds a valid assignment — useful for solving logic puzzles.',
    tags: ['java', 'maven', 'junit'],
    link: 'https://github.com/Jamescorino8/ICSI311/tree/main/Nusha',
  },
  {
    name: 'business site',
    year: '2025',
    desc: 'A multi-page interactive website project developed to showcase skills in web design and development, focusing on koi pond construction and koi sales.',
    tags: ['html', 'css', 'javascript'],
    link: 'https://github.com/Jamescorino8/CINF201/tree/main/finalproject',
  },
  {
    name: 'tic-tac-toe',
    year: '2025',
    desc: 'A web-based Tic-Tac-Toe game developed with JavaScript, CSS, and HTML, featuring a simple and interactive UI.',
    tags: ['javascript', 'express.js', 'socket.io', 'html', 'css'],
    link: 'https://github.com/Jamescorino8/tic-tac-toe',
  },
  {
    name: 'team draft',
    year: '2024',
    desc: 'An application that simulates a draft system. The project demonstrates object-oriented design with modular classes for heroes, teams, and the draft logic.',
    tags: ['java'],
    link: 'https://github.com/Jamescorino8/ICSI201/tree/main/P3',
  },
  {
    name: 'flask site',
    year: '2024',
    desc: 'A simple web application displaying the current time in various timezones.',
    tags: ['python', 'flask', 'htmx'],
    link: 'https://github.com/Jamescorino8/flask-site',
  },
]

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

      <p ref={ctaRef} className="cta"></p>

      <Footer ref={footerRef} />
    </div>
  )
}
