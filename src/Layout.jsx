import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'

export default function Layout() {
  return (
    <div className="page-wrapper">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
