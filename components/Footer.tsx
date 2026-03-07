import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      marginTop: '80px',
    }}>
      <div className="max-w-content mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <span className="gradient-text" style={{ fontSize: '20px', fontWeight: 800 }}>
              Ricky Savanna
            </span>
            <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '14px', lineHeight: '1.6' }}>
              Full-stack developer & AI engineer building intelligent software that scales.
            </p>
          </div>

          <div>
            <h4 style={{ color: 'var(--text-primary)', fontWeight: 600, marginBottom: '16px', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Navigation
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link href="/" className="nav-link">Home</Link>
              <Link href="/about" className="nav-link">About</Link>
              <Link href="/work" className="nav-link">Work</Link>
              <Link href="/contact" className="nav-link">Contact</Link>
            </div>
          </div>

          <div>
            <h4 style={{ color: 'var(--text-primary)', fontWeight: 600, marginBottom: '16px', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Connect
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a href="https://github.com/genesisx-1" target="_blank" rel="noopener noreferrer" className="nav-link">GitHub</a>
              <a href="https://www.linkedin.com/in/rsavanna/" target="_blank" rel="noopener noreferrer" className="nav-link">LinkedIn</a>
              <a href="https://x.com/rickysvna" target="_blank" rel="noopener noreferrer" className="nav-link">Twitter / X</a>
            </div>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid var(--border)',
          marginTop: '40px',
          paddingTop: '24px',
          textAlign: 'center',
          color: 'var(--text-muted)',
          fontSize: '13px',
        }}>
          &copy; {new Date().getFullYear()} Ricky Savanna. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
