import { NOTES } from './NotesList.js'

// Each src/notes/<slug>.md becomes /notes/<slug>. Files start with:
//   ---
//   title: null means "not yet"
//   date: 2026-09-20
//   ---
const files = import.meta.glob('../notes/*.md', { query: '?raw', import: 'default', eager: true })

function parse(path, raw) {
  const slug = path.split('/').pop().replace(/\.md$/, '')
  const [, head = '', body = raw] = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/) ?? []
  const meta = Object.fromEntries(
    head.split('\n')
      .map(line => line.match(/^(\w+):\s*(.*)$/))
      .filter(Boolean)
      .map(([, key, value]) => [key, value.trim()])
  )
  return { slug, title: meta.title ?? slug, date: meta.date ?? '', tag: 'note', body }
}

const LOCAL_NOTES = Object.entries(files).map(([path, raw]) => parse(path, raw))

// Newest first; entries without a real YYYY-MM-DD date (placeholders) go last.
const isDated = ({ date }) => /^\d{4}-\d{2}-\d{2}$/.test(date)

export const ALL_NOTES = [...LOCAL_NOTES, ...NOTES]
  .sort((a, b) => isDated(b) - isDated(a) || b.date.localeCompare(a.date))

export const getNote = slug => LOCAL_NOTES.find(n => n.slug === slug)
