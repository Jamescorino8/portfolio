import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'

export default function Layout() {
  return (
    <div className="max-w-[860px] mx-auto px-8 py-8">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
