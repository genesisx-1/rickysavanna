'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import ThemeToggle from './ThemeToggle'

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/work', label: 'Work' },
  { href: '/contact', label: 'Contact' },
]

export default function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        background: 'var(--bg-primary)',
        borderBottom: '1px solid var(--border)',
        transition: 'background 0.5s ease, border-color 0.5s ease',
      }}>
        <div className="max-w-content mx-auto px-6" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '65px',
        }}>
          {/* Logo */}
          <Link href="/" style={{
            fontSize: '20px',
            fontWeight: 800,
            letterSpacing: '-0.5px',
            textDecoration: 'none',
            color: 'var(--text-primary)',
          }}>
            RS<span style={{ color: 'var(--accent)' }}>.</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex" style={{ alignItems: 'center', gap: '32px' }}>
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${pathname === link.href ? 'active' : ''}`}
                style={pathname === link.href ? { color: 'var(--accent-light)' } : undefined}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://calendly.com/rsvna"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ padding: '8px 20px', fontSize: '13px' }}
            >
              Book a Call
            </a>
            <ThemeToggle />
          </nav>

          {/* Mobile */}
          <div className="flex md:hidden" style={{ alignItems: 'center', gap: '16px' }}>
            <ThemeToggle />
            <button
              className={`hamburger ${menuOpen ? 'open' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {links.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className="nav-link"
            style={{ fontSize: '24px' }}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <a
          href="https://calendly.com/rsvna"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
          style={{ marginTop: '16px' }}
          onClick={() => setMenuOpen(false)}
        >
          Book a Call
        </a>
      </div>
    </>
  )
}
