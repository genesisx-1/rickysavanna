import Link from 'next/link'
import { profile } from '@/lib/resume'

const nav = [
  { href: '/', label: 'Index' },
  { href: '/work', label: 'Work' },
  { href: '/resume', label: 'Résumé' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

const elsewhere = [
  { href: 'https://github.com/genesisx-1', label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/rsavanna/', label: 'LinkedIn' },
  { href: 'https://x.com/rickysvna', label: 'X' },
]

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <div className="wordmark">Ricky Savanna</div>
            <p className="footer-blurb">
              Operations, administration, and IT support — and the software that holds it together.
              Arlington, Texas.
            </p>
          </div>

          <div className="footer-col">
            <h4>Pages</h4>
            <div className="footer-links">
              {nav.map(l => (
                <Link key={l.href} href={l.href}>{l.label}</Link>
              ))}
            </div>
          </div>

          <div className="footer-col">
            <h4>Elsewhere</h4>
            <div className="footer-links">
              {elsewhere.map(l => (
                <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>
              ))}
              <a href={`mailto:${profile.email}`}>Email</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="mono">&copy; {new Date().getFullYear()} Ricky Savanna</span>
          <span className="mono">{profile.location}</span>
        </div>
      </div>
    </footer>
  )
}
