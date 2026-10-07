'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import ThemeToggle from './ThemeToggle'
import { profile } from '@/lib/resume'

const links = [
  { href: '/', label: 'Index' },
  { href: '/work', label: 'Work' },
  { href: '/resume', label: 'Résumé' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => { setOpen(false) }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <header className="site-header">
        <div className="wrap site-header-inner">
          <Link href="/" className="wordmark">
            Ricky Savanna
          </Link>

          <nav className="nav">
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${pathname === link.href ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="header-right">
            <a href={`mailto:${profile.email}`} className="btn btn-solid btn-sm header-cta">
              Get in touch
            </a>
            <ThemeToggle />
            <button
              className={`menu-btn ${open ? 'open' : ''}`}
              onClick={() => setOpen(v => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-menu ${open ? 'open' : ''}`}>
        {links.map(link => (
          <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </Link>
        ))}
        <a href={`mailto:${profile.email}`} className="btn btn-solid" onClick={() => setOpen(false)}>
          Get in touch
        </a>
      </div>
    </>
  )
}
