import { useEffect, useRef } from 'react'
import TypeIt from 'typeit'
import ProjectCard from '../components/ProjectCard'
import Footer from '../components/Footer'

const TYPESPEED = 75

const PROJECTS = [
  {
    name: 'portfolio',
    year: '2026',
    desc: "personal site. you're looking at it.",
    tags: ['react', 'tailwind', 'typeit', 'vite'],
    link: 'https://github.com/Jamescorino8/portfolio',
  },
]

export default function Builds() {
  const h1Ref = useRef(null)
  const h2Ref = useRef(null)
  const mainRef = useRef(null)
  const ctaRef = useRef(null)
  const footerRef = useRef(null)
  const hasRun = useRef(false)

  useEffect(() => {
    if (hasRun.current) return
    hasRun.current = true
    const h2 = h2Ref.current
    const footer = footerRef.current
    const aboutItems = mainRef.current?.querySelectorAll('.stagger-item') ?? []

    // 3 fade in each about line, then type the CTA, then reveal footer
    function staggerAndReveal() {
      aboutItems.forEach((item, i) => {
        setTimeout(() => item.classList.add('printed'), i * 100)
      })
      setTimeout(() => {
        new TypeIt(ctaRef.current, {
          speed: TYPESPEED,
          afterComplete: (instance) => {
            instance.destroy()
            footer?.classList.add('revealed')
          }
        })
          .type('wanna keep in touch?')
          .go()
      }, aboutItems.length * 100 + 300)
    }

    // 1. type h1, then expand + type h2
    new TypeIt(h1Ref.current, {
      speed: TYPESPEED,
      afterComplete: (instance) => {
        instance.destroy()
        h2.classList.add('expanded') // slide h2 into view
        setTimeout(() => {
          // 2. type h2, then simulate a text selection → underline
          new TypeIt(h2, {
            speed: TYPESPEED,
            afterComplete: (instance) => {
              instance.destroy()
              setTimeout(() => {
                h2.classList.add('highlighted')
                setTimeout(() => {
                  h2.classList.remove('highlighted')
                  h2.classList.add('underlined')
                  setTimeout(staggerAndReveal, 200)
                }, 350)
              }, 400)
            }
          })
            .type('builds')
            .go()
        }, 350)
      }
    })
      .pause(300)
      .type('what am i working on?')
      .go()
  }, [])

  return (
    <div>
      <h1 ref={h1Ref} className="text-5xl font-bold mb-8"></h1>

      <section ref={mainRef} className="mb-8">
        <h2 ref={h2Ref} className="text-5xl font-bold mb-4"></h2>
        {PROJECTS.map(p => (
          <div key={p.name} className="stagger-item">
            <ProjectCard {...p} />
          </div>
        ))}
      </section>

      <section className="text-center">
        <p className="my-4" style={{ opacity: 0.7 }}>wip :P</p>
      </section>

      <p ref={ctaRef} className="cta"></p>

      <Footer ref={footerRef} />
    </div>
  )
}
