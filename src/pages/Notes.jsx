import { useRef } from 'react'
import Footer from '../components/Footer'
import { usePageAnimation } from '../hooks/usePageAnimation'

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

  usePageAnimation({
    h1Ref,
    h2Ref,
    h1Text: 'what am i thinking about?',
    h2Text: 'notes',
    ctaRef,
    footerRef,
    itemsRef: mainRef,
    onStagger: () => mainRef.current?.classList.add('revealed'),
  })

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
