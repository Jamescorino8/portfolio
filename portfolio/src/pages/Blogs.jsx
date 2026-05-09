import { useRef, useEffect } from 'react'
import Footer from '../components/Footer'

export default function Blogs() {
  const footerRef = useRef(null)

  useEffect(() => {
    footerRef.current?.classList.add('revealed')
  }, [])

  return (
    <div>
      <h1 className="text-5xl font-bold mb-8">????</h1>

      <section className="mb-8">
        <h2 className="text-5xl font-bold mb-4">blogs</h2>
      </section>

      <section className="text-center mt-8">
        <p className="my-4" style={{ opacity: 0.7 }}>coming soon :P</p>
      </section>

      <p className="cta">wanna keep in touch?</p>
      <Footer ref={footerRef} />
    </div>
  )
}
