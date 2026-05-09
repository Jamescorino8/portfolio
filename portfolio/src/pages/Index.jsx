import { useEffect, useRef } from 'react'
import TypeIt from 'typeit'
import Footer from '../components/Footer'

const SPEED = 75

export default function Index() {
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

    function staggerAndReveal() {
      aboutItems.forEach((item, i) => {
        setTimeout(() => item.classList.add('printed'), i * 100)
      })
      setTimeout(() => {
        new TypeIt(ctaRef.current, {
          speed: SPEED,
          afterComplete: (instance) => {
            instance.destroy()
            footer?.classList.add('revealed')
          }
        })
          .type('wanna keep in touch?')
          .go()
      }, aboutItems.length * 100 + 300)
    }

    new TypeIt(h1Ref.current, {
      speed: SPEED,
      afterComplete: (instance) => {
        instance.destroy()
        h2.classList.add('expanded')
        setTimeout(() => {
          new TypeIt(h2, {
            speed: SPEED,
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
            .type('about me')
            .go()
        }, 350)
      }
    })
      .pause(300)
      .type('you have found me!')
      .go()
  }, [])

  return (
    <div>
      <h1 ref={h1Ref}></h1>

      <section className="mb-8">
        <h2 ref={h2Ref}></h2>
        <div ref={mainRef}>
          <p className="stagger-item mb-1">hi, im james.</p>
          <p className="stagger-item mb-1">20 yo.</p>
          <p className="stagger-item mb-1">i study computer science.</p>
          <p className="stagger-item mb-1">im most interested in software development.</p>
          <p className="stagger-item mb-1">currently studying for midterms :(</p>
        </div>
      </section>

      <p ref={ctaRef} className="cta"></p>

      <Footer ref={footerRef} />
    </div>
  )
}
