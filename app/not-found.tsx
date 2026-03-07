import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{
      minHeight: 'calc(100vh - 200px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '40px 24px',
    }}>
      <div>
        <div className="stat-number" style={{ fontSize: '80px', marginBottom: '16px' }}>404</div>
        <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '12px' }}>
          Page not found
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', maxWidth: '400px' }}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/" className="btn-primary">
          Back to Home
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
