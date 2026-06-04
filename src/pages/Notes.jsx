import { useEffect, useRef } from 'react'
import TypeIt from 'typeit'
import Footer from '../components/Footer'
import { useFitText } from '../hooks/useFitText'

const TYPESPEED = 50

const NOTES = [
  { date: '202X-XX-XX', title: 'coming soon :P', tag: 'tag', link: '#' },
]

export default function Notes() {
  const h1Ref = useRef(null)
  const h2Ref = useRef(null)
  const listRef = useRef(null)
  const ctaRef = useRef(null)
  const footerRef = useRef(null)
  const hasRun = useRef(false)

  const h1Ratio = useFitText(h1Ref, 'what am i thinking about?', { reserve: 32 })

  useEffect(() => {
    if (hasRun.current) return
    hasRun.current = true

    const h2 = h2Ref.current
    const originalH2Size = parseFloat(window.getComputedStyle(h2).fontSize)
    h2.style.fontSize = `${originalH2Size * h1Ratio.current}px`
    const footer = footerRef.current
    const items = listRef.current?.querySelectorAll('.stagger-item') ?? []

    function staggerAndReveal() {
      items.forEach((item, i) => {
        setTimeout(() => item.classList.add('printed'), i * 80)
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
      }, items.length * 80 + 300)
    }

    new TypeIt(h1Ref.current, {
      speed: TYPESPEED,
      afterComplete: (instance) => {
        instance.destroy()
        h2.classList.add('expanded')
        setTimeout(() => {
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
            .type('notes')
            .go()
        }, 350)
      }
    })
      .pause(300)
      .type('what am i thinking about?')
      .go()
  }, [])

  return (
    <div>
      <h1 ref={h1Ref}></h1>

      <section className="mb-8">
        <h2 ref={h2Ref}></h2>
        <div ref={listRef} className="notes-list">
          {NOTES.length === 0 ? (
            <p className="stagger-item" style={{ opacity: 0 }}>nothing yet — check back soon.</p>
          ) : (
            NOTES.map(({ date, title, tag, link }) => (
              <a
                key={title}
                href={link}
                className="stagger-item note-row"
              >
                <span className="note-date">{date}</span>
                <span className="note-title">{title}</span>
                <span className="note-tag">{tag}</span>
              </a>
            ))
          )}
        </div>
      </section>

      <p ref={ctaRef} className="cta"></p>
      <Footer ref={footerRef} />
    </div>
  )
}
