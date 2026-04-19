import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import styles from './Header.module.css'

export default function Header({ onContactOpen }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { to: '/',         label: 'Home'          },
    { to: '/services', label: 'Services'       },
    { to: '/book',     label: 'Book Now'       },
    { to: '/portfolio',label: 'Portfolio'      },
    { to: '/review',   label: 'Leave a Review' },
  ]

  return (
    <header className={styles.header}>
      <img src="/images/logosvg.svg" alt="Saintly Beauty logo" className={styles.logo} />

      {/* Hamburger for mobile */}
      <button
        className={styles.hamburger}
        onClick={() => setMenuOpen(o => !o)}
        aria-label="Toggle menu"
      >
        <span className={menuOpen ? styles.barOpen : styles.bar} />
        <span className={menuOpen ? styles.barOpen : styles.bar} />
        <span className={menuOpen ? styles.barOpen : styles.bar} />
      </button>

      <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
        {links.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/'}
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </NavLink>
        ))}
        <button className={styles.contactBtn} onClick={() => { onContactOpen(); setMenuOpen(false) }}>
          Contact Us
        </button>
      </nav>
    </header>
  )
}
