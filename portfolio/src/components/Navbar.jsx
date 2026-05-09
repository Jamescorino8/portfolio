import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import avatar from '../assets/avatar.svg'

export default function Navbar() {
  const { isLight, toggle } = useTheme()

  return (
    <nav className="flex items-center justify-between mb-12">
      <Link to="/">
        <img src={avatar} alt="avatar" className="avatar w-[90px] h-[90px] object-cover" />
      </Link>
      <ul className="flex items-center gap-8 list-none">
        <li>
          <Link to="/" style={{ color: 'var(--text-color)', textDecoration: 'none', fontSize: '0.95rem', letterSpacing: '0.05em' }}
            onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
            onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}>
            about
          </Link>
        </li>
        <li>
          <Link to="/builds" style={{ color: 'var(--text-color)', textDecoration: 'none', fontSize: '0.95rem', letterSpacing: '0.05em' }}
            onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
            onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}>
            builds
          </Link>
        </li>
        <li>
          <Link to="/blogs" style={{ color: 'var(--text-color)', textDecoration: 'none', fontSize: '0.95rem', letterSpacing: '0.05em' }}
            onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
            onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}>
            blogs
          </Link>
        </li>
        <li>
          <button onClick={toggle} style={{
            background: 'none', border: 'none',
            color: 'var(--theme-toggle-color)',
            fontSize: isLight ? '1.6rem' : '1.8rem',
            lineHeight: 1, padding: 0,
            width: 32, height: 32,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            transition: 'color 0.3s ease, font-size 0.3s ease'
          }}>
            {isLight ? '☼' : '⏾'}
          </button>
        </li>
      </ul>
    </nav>
  )
}
