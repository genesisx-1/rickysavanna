import type { Metadata } from 'next'
import Link from 'next/link'
import Reveal from '@/components/Reveal'
import LiveBrowser from '@/components/LiveBrowser'
import { platforms, profile, capabilities } from '@/lib/resume'

export const metadata: Metadata = {
  title: 'Work — Ricky Savanna',
  description:
    'Live production platforms built by Ricky Savanna — NTX Limo, LXM Auto, NTX Fleet, and MindMine. Use each one inside the page.',
}

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

export default function WorkPage() {
  return (
    <>
      <section className="hero" style={{ paddingBottom: '64px' }}>
        <div className="wrap">
          <div className="hero-status enter-1">
            <span className="mono">Work</span>
          </div>
          <h1 className="h1 enter-2" style={{ marginBottom: '28px', maxWidth: '16ch' }}>
            Software people actually use.
          </h1>
          <p className="lede enter-3">
            Four platforms in production — running a 130+ vehicle transportation business, a dealership,
            an investor portal, and an AI product. Load any of them below.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '64px' }}>
        <div className="wrap">
          <Reveal>
            <LiveBrowser />
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal>
            <div className="section-head">
              <span className="section-index">01 — Breakdown</span>
              <div><h2 className="h2">What each one does.</h2></div>
            </div>
          </Reveal>

          <div className="proj-list">
            {platforms.map(p => (
              <Reveal key={p.domain}>
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="proj-row">
                  <div>
                    <h3 className="proj-name">{p.name}</h3>
                    <span className="proj-domain">{p.domain}</span>
                  </div>
                  <div>
                    <p className="proj-desc">{p.description}</p>
                    <div className="proj-stack">
                      {p.stack.map(s => <span key={s} className="tag">{s}</span>)}
                    </div>
                  </div>
                  <span className="proj-go">Visit site <Arrow /></span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal>
            <div className="section-head">
              <span className="section-index">02 — Method</span>
              <div>
                <h2 className="h2">Agentic coding, start to finish.</h2>
                <p>
                  I scope the product, drive AI coding tools through the implementation, review everything
                  that comes back, and ship it. Same loop whether it&apos;s a booking platform or an
                  internal dashboard.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="cap-list">
            {capabilities.slice(0, 4).map((cap, i) => (
              <Reveal key={cap.title} delay={i * 35}>
                <div className="cap-row">
                  <span className="cap-num">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="h3">{cap.title}</h3>
                  <p>{cap.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="wrap">
          <Reveal>
            <h2 className="h1">Want one of these for your business?</h2>
            <p>Tell me the problem and I&apos;ll tell you what it takes to build it.</p>
            <div className="cta-actions">
              <a href={`mailto:${profile.email}`} className="btn btn-solid">Email me <Arrow /></a>
              <Link href="/resume" className="btn btn-outline">Read the résumé</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
