import Link from 'next/link'
import Image from 'next/image'
import Reveal from '@/components/Reveal'
import LiveBrowser from '@/components/LiveBrowser'
import HeroWire from '@/components/HeroWire'
import { profile, capabilities, skillGroups, stats, experience } from '@/lib/resume'

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

export default function Home() {
  const current = experience[0]

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="wrap">
          <div className="hero-grid">
            <div>
              <div className="hero-status enter-1">
                <span className="mono">Available for work — {profile.location}</span>
              </div>

              <h1 className="display hero-title enter-2">
                Operations,
                <br />
                administration,
                <br />
                <em>and the software</em>
                <br />
                <em>underneath.</em>
              </h1>

              <p className="lede hero-lede enter-3">{profile.summary}</p>

              <div className="hero-actions enter-3">
                <Link href="/work" className="btn btn-solid">
                  See live platforms <Arrow />
                </Link>
                <Link href="/resume" className="btn btn-outline">Read the résumé</Link>
              </div>

              <div className="hero-meta enter-4">
                <span className="mono">{current.role}</span>
                <span className="mono">{current.company}</span>
                <span className="mono">{current.period}</span>
              </div>
            </div>

            <div className="hero-visual enter-3">
              <HeroWire />
              <div className="portrait">
                <Image
                  src="/images/profile.jpg"
                  alt="Ricky Savanna"
                  width={420}
                  height={525}
                  priority
                  sizes="(max-width: 1000px) 70vw, 330px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FIGURES ===== */}
      <section style={{ padding: '0' }}>
        <div className="wrap">
          <div className="figures">
            {stats.map(s => (
              <div key={s.label} className="figure">
                <div className="figure-value">{s.value}</div>
                <div className="figure-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LIVE WORK ===== */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <div className="section-head">
              <span className="section-index">01 — Live work</span>
              <div>
                <h2 className="h2">Four platforms running in production.</h2>
                <p>
                  Not mockups or case studies. Pick a tab and the real site loads in the frame below —
                  click through it without leaving this page.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <LiveBrowser />
          </Reveal>
        </div>
      </section>

      {/* ===== CAPABILITIES ===== */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <div className="section-head">
              <span className="section-index">02 — Services</span>
              <div>
                <h2 className="h2">What I take on.</h2>
                <p>The engineering side and the business side, which in my experience are the same job.</p>
              </div>
            </div>
          </Reveal>

          <div className="cap-list">
            {capabilities.map((cap, i) => (
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

      {/* ===== SKILLS ===== */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <div className="section-head">
              <span className="section-index">03 — Toolkit</span>
              <div>
                <h2 className="h2">Tools and territory.</h2>
              </div>
            </div>
          </Reveal>

          <dl className="skill-list">
            {skillGroups.map((group, i) => (
              <Reveal key={group.category} delay={i * 35}>
                <div className="skill-row">
                  <dt>{group.category}</dt>
                  <dd>
                    {group.items.map(item => (
                      <span key={item}>{item}</span>
                    ))}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="cta">
        <div className="wrap">
          <Reveal>
            <h2 className="h1">Need someone who can run it and build it?</h2>
            <p>
              That&apos;s the job I already do every day — payouts and purchase orders in the morning,
              production deploys in the afternoon.
            </p>
            <div className="cta-actions">
              <a href={`mailto:${profile.email}`} className="btn btn-solid">
                {profile.email} <Arrow />
              </a>
              <Link href="/contact" className="btn btn-outline">All contact details</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
