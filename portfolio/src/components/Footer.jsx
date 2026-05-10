import { forwardRef, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import resumePdf from '../assets/Resume4.pdf'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString()

function ResumeModal({ onClose }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.75)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'var(--bg-color, #fff)',
          borderRadius: '8px',
          padding: '1rem',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        }}
      >
        {/* toolbar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <a
              href={resumePdf}
              download="James_Corino_Resume.pdf"
              aria-label="Download resume"
              style={{
                color: 'var(--text-color)', opacity: 0.75, textDecoration: 'none',
                fontSize: '0.8rem', padding: '0.25rem 0.6rem',
                border: '1px solid var(--border-color, #ccc)', borderRadius: '4px',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = 1}
              onMouseLeave={e => e.currentTarget.style.opacity = 0.75}
            >
              Download
            </a>
            <button
              onClick={onClose}
              aria-label="Close"
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'var(--text-color)', opacity: 0.75, fontSize: '1.25rem', lineHeight: 1, padding: '0 0.25rem',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = 1}
              onMouseLeave={e => e.currentTarget.style.opacity = 0.75}
            >✕</button>
          </div>
        </div>

        {/* pdf */}
        <div style={{ overflowY: 'auto' }}>
          <Document file={resumePdf}>
            <Page
              pageNumber={1}
              renderTextLayer={true}
              renderAnnotationLayer={true}
              width={Math.min(700, window.innerWidth - 64)}
            />
          </Document>
        </div>
      </div>
    </div>
  )
}

const Footer = forwardRef(function Footer(props, ref) {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <footer ref={ref} className="mt-8 pt-6 flex gap-6" style={{ borderTop: '1px solid var(--border-color)' }}>
        <a href="https://github.com/jamescorino8" target="_blank" rel="noopener noreferrer" aria-label="GitHub"
          style={{ color: 'var(--text-color)', opacity: 0.75 }}
          onMouseEnter={e => e.currentTarget.style.opacity = 1}
          onMouseLeave={e => e.currentTarget.style.opacity = 0.75}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
            <path d="M9 18c-4.51 2-5-2-7-2"/>
          </svg>
        </a>
        <a href="https://www.linkedin.com/in/james-corino/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
          style={{ color: 'var(--text-color)', opacity: 0.75 }}
          onMouseEnter={e => e.currentTarget.style.opacity = 1}
          onMouseLeave={e => e.currentTarget.style.opacity = 0.75}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
            <rect width="4" height="12" x="2" y="9"/>
            <circle cx="4" cy="4" r="2"/>
          </svg>
        </a>
        <a href="mailto:jcorino@albany.edu" aria-label="Email"
          style={{ color: 'var(--text-color)', opacity: 0.75 }}
          onMouseEnter={e => e.currentTarget.style.opacity = 1}
          onMouseLeave={e => e.currentTarget.style.opacity = 0.75}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/>
            <rect x="2" y="4" width="20" height="16" rx="2"/>
          </svg>
        </a>
        <button
          onClick={() => setModalOpen(true)}
          aria-label="Resume"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'var(--text-color)', opacity: 0.75 }}
          onMouseEnter={e => e.currentTarget.style.opacity = 1}
          onMouseLeave={e => e.currentTarget.style.opacity = 0.75}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 22h5a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v3.3"/>
            <path d="M14 2v5a1 1 0 0 0 1 1h5"/>
            <path d="m7.69 16.479 1.29 4.88a.5.5 0 0 1-.698.591l-1.843-.849a1 1 0 0 0-.879.001l-1.846.85a.5.5 0 0 1-.692-.593l1.29-4.88"/>
            <circle cx="6" cy="14" r="3"/>
          </svg>
        </button>
      </footer>
      {modalOpen && <ResumeModal onClose={() => setModalOpen(false)} />}
    </>
  )
})

export default Footer
