import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="hero" style={{ borderBottom: 0 }}>
      <div className="wrap">
        <span className="mono">Error 404</span>
        <h1 className="h1" style={{ margin: '24px 0 20px', maxWidth: '14ch' }}>
          This page doesn&apos;t exist.
        </h1>
        <p className="lede" style={{ marginBottom: '36px' }}>
          It may have moved, or the link was wrong.
        </p>
        <Link href="/" className="btn btn-solid">
          Back to the index
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  )
}
