import Footer from '../components/Footer'
import { usePageAnimation } from '../hooks/usePageAnimation'
import { NOTES } from '../data/NotesList.js'

export default function Notes() {
  const scope = usePageAnimation({
    h1Text: 'what am i thinking about?',
    h2Text: 'notes',
  })

  return (
    <div ref={scope} className="page">
      <h1 aria-label="what am i thinking about?"></h1>

      <section className="page-section">
        <h2 aria-label="notes"></h2>
        <div className="notes-list">
          {NOTES.length === 0 ? (
            <p className="stagger-item">nothing yet — check back soon.</p>
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

      <div className="cta"></div>
      <Footer />
    </div>
  )
}
