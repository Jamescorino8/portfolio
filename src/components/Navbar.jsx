import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import avatar from '../assets/avatar.svg'

export default function Navbar() {
  const { isLight, toggle } = useTheme()

  return (
    <nav>
      <Link to="/">
        <img src={avatar} alt="avatar" className="avatar" />
      </Link>
      <ul className="nav-links">
        <li><Link to="/" className="nav-link">about</Link></li>
        <li><Link to="/builds" className="nav-link">builds</Link></li>
        <li><Link to="/notes" className="nav-link">notes</Link></li>
        <li>
          <button
            onClick={toggle}
            className="theme-toggle"
            style={{ fontSize: isLight ? '1.6rem' : '1.8rem' }}
            aria-label="Toggle theme"
          >
            {isLight ? '☼' : '⏾'}
          </button>
        </li>
      </ul>
    </nav>
  )
}
