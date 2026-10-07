import type { Metadata } from 'next'
import Link from 'next/link'
import ScrollAnimator from '@/components/ScrollAnimator'
import LiveBrowser from '@/components/LiveBrowser'
import Icon from '@/components/Icon'
import { platforms, profile, capabilities } from '@/lib/resume'

export const metadata: Metadata = {
  title: 'Work | Ricky Savanna',
  description:
    'Live production platforms built by Ricky Savanna — NTX Limo, LXM Auto, NTX Fleet, and MindMine. Try each one inside the page.',
}

export default function WorkPage() {
  return (
    <div>
      <section className="page-hero">
        <div className="max-w-content mx-auto px-6">
          <div className="hero-animate-1">
            <span className="section-label">Work</span>
          </div>
          <h1 className="hero-animate-2 page-title">
            Software people <span className="gradient-text">actually use</span>
          </h1>
          <p className="hero-animate-3 page-lede">
            Four platforms in production, running a 130+ vehicle transportation business, a dealership,
            an investor portal, and an AI product. Load any of them below and use it right here.
          </p>
        </div>
      </section>

      {/* Interactive browser */}
      <section className="section" style={{ paddingTop: '20px' }}>
        <div className="max-w-content mx-auto px-6">
          <ScrollAnimator>
            <LiveBrowser />
          </ScrollAnimator>
        </div>
      </section>

      {/* Detail cards */}
      <section className="section">
        <div className="max-w-content mx-auto px-6">
          <ScrollAnimator>
            <span className="section-label">The Breakdown</span>
            <h2 className="section-title">What each one does</h2>
          </ScrollAnimator>

          <div className="platform-grid">
            {platforms.map(p => (
              <ScrollAnimator key={p.domain}>
                <article className="platform-card">
                  <span className="platform-accent" style={{ background: p.accent }} />
                  <div className="platform-head">
                    <h3>{p.name}</h3>
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className="platform-link">
                      {p.domain}
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                        <path d="M15 3h6v6M10 14 21 3M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
                      </svg>
                    </a>
                  </div>
                  <p className="platform-tagline">{p.tagline}</p>
                  <p className="platform-desc">{p.description}</p>
                  <div className="platform-stack">
                    {p.stack.map(s => (
                      <span key={s} className="tech-badge">{s}</span>
                    ))}
                  </div>
                </article>
              </ScrollAnimator>
            ))}
          </div>
        </div>
      </section>

      {/* How I build */}
      <section className="section">
        <div className="max-w-content mx-auto px-6">
          <ScrollAnimator>
            <span className="section-label">How I Build</span>
            <h2 className="section-title">Agentic coding, start to finish</h2>
            <p className="section-sub">
              I scope the product, drive AI coding tools through the implementation, review everything that
              comes back, and ship it. Same loop whether it&apos;s a booking platform or an internal dashboard.
            </p>
          </ScrollAnimator>

          <div className="capability-grid">
            {capabilities.slice(0, 4).map(cap => (
              <ScrollAnimator key={cap.title}>
                <div className="capability-card">
                  <div className="capability-icon"><Icon name={cap.icon} size={22} /></div>
                  <h3>{cap.title}</h3>
                  <p>{cap.body}</p>
                </div>
              </ScrollAnimator>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="max-w-content mx-auto px-6">
          <ScrollAnimator>
            <div className="cta-card">
              <h2>Want one of these for your business?</h2>
              <p>Tell me the problem and I&apos;ll tell you what it takes to build it.</p>
              <div className="cta-actions">
                <a href={`mailto:${profile.email}`} className="btn-primary">Email me</a>
                <Link href="/resume" className="btn-secondary">View résumé</Link>
              </div>
            </div>
          </ScrollAnimator>
        </div>
      </section>
    </div>
  )
}
