import { Link, Navigate, useParams } from 'react-router-dom'
import { marked } from 'marked'
import Footer from '../components/Footer'
import { usePageAnimation } from '../hooks/usePageAnimation'
import { getNote } from '../data/notes.js'

export default function NotePage() {
  const note = getNote(useParams().slug)
  if (!note) return <Navigate to="/notes" replace />
  return <NoteBody key={note.slug} {...note} />
}

function NoteBody({ title, date, body }) {
  const scope = usePageAnimation({ h1Text: title, h2Text: date })

  return (
    <div ref={scope} className="page">
      <h1 aria-label={title}></h1>

      <section className="page-section">
        <h2 aria-label={date}></h2>
        {/* Markdown comes from files in this repo, so it's trusted. */}
        <article className="stagger-item note-body" dangerouslySetInnerHTML={{ __html: marked.parse(body) }} />
        <Link to="/notes" className="stagger-item note-back">← all notes</Link>
      </section>

      <div className="cta"></div>
      <Footer />
    </div>
  )
}
