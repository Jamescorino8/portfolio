import Footer from '../components/Footer'
import { usePageAnimation } from '../hooks/usePageAnimation'

export default function Index() {
  const scope = usePageAnimation({
    h1Text: 'who am i?',
    h2Text: 'about me',
  })

  return (
    <div ref={scope} className="page">
      <h1 aria-label="who am i?"></h1>

      <section className="page-section">
        <h2 aria-label="about me"></h2>
        <div className="about-items">
          <p className="stagger-item about-item">hi, im james.</p>
          <p className="stagger-item about-item">21 yo.</p>
          <p className="stagger-item about-item">bs/ms cs @ ualbany.</p>
          <p className="stagger-item about-item">spent summer '26 at skku in korea.</p>
          <p className="stagger-item about-item">did research on deepfake detection @ skku infolab.</p>
          <p className="stagger-item about-item">looking for summer '27 internships.</p>
        </div>
      </section>

      <div className="cta"></div>

      <Footer />
    </div>
  )
}