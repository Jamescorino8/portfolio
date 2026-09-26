import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { usePageAnimation } from '../hooks/usePageAnimation'
import { ALL_NOTES } from '../data/notes.js'

function NoteRow({ date, title, tag, desc, slug, link }) {
  const content = (
    <>
      <span className="note-date">{date}</span>
      <span className="note-title">
        {title}{!slug && <span className="note-external" aria-hidden="true"> ↗</span>}
        {desc && <span className="note-desc">{desc}</span>}
      </span>
      <span className="note-tag">{tag}</span>
    </>
  )

  return slug ? (
    <Link to={`/notes/${slug}`} className="stagger-item note-row">{content}</Link>
  ) : (
    <a href={link} target="_blank" rel="noopener noreferrer" className="stagger-item note-row">{content}</a>
  )
}

export default function Notes() {
  const scope = usePageAnimation({
    h1Text: 'what am i up to?',
    h2Text: 'notes',
  })

  return (
    <div ref={scope} className="page">
      <h1 aria-label="what am i up to?"></h1>

      <section className="page-section">
        <h2 aria-label="notes"></h2>
        <div className="notes-list">
          {ALL_NOTES.length === 0 ? (
            <p className="stagger-item">nothing yet — check back soon.</p>
          ) : (
            ALL_NOTES.map(note => <NoteRow key={note.slug ?? note.link} {...note} />)
          )}
        </div>
      </section>

      <div className="cta"></div>
      <Footer />
    </div>
  )
}
