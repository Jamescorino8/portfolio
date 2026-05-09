import Footer from '../components/Footer'

export default function Index() {
  return (
    <div>
      <h1 className="text-5xl font-bold mb-8">you have found me!</h1>

      <section className="mb-8">
        <h2 className="text-5xl font-bold mb-4">about me</h2>
        <p className="mb-1">hi, im james.</p>
        <p className="mb-1">20 yo.</p>
        <p className="mb-1">i study computer science.</p>
        <p className="mb-1">im most interested in software development.</p>
        <p className="mb-1">currently studying for midterms :(</p>
      </section>

      <p className="cta">wanna keep in touch?</p>
      <Footer />
    </div>
  )
}
