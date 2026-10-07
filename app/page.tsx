import Link from 'next/link'
import Image from 'next/image'
import ScrollAnimator from '@/components/ScrollAnimator'
import LiveBrowser from '@/components/LiveBrowser'
import HeroOrb from '@/components/HeroOrb'
import Icon from '@/components/Icon'
import { profile, capabilities, skillGroups, stats, experience } from '@/lib/resume'

export default function Home() {
  const current = experience[0]

  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="hero-section">
        <div className="max-w-content mx-auto px-6 w-full">
          <div className="hero-grid">
            <div>
              <div className="hero-animate-1">
                <span className="availability-pill">
                  <span className="pulse-dot" />
                  Open to new opportunities
                </span>
              </div>

              <h1 className="hero-animate-2 hero-title">
                I run operations
                <br />
                <span className="gradient-text">and build the software</span>
                <br />
                they run on.
              </h1>

              <p className="hero-animate-3 hero-lede">{profile.summary}</p>

              <div className="hero-animate-5 hero-actions">
                <Link href="/work" className="btn-primary">
                  See live platforms
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link href="/resume" className="btn-secondary">
                  View résumé
                </Link>
              </div>

              <div className="hero-animate-5 hero-meta">
                <span><Icon name="ops" size={15} /> {profile.location}</span>
                <span><Icon name="admin" size={15} /> {current.role} @ {current.company}</span>
              </div>
            </div>

            <div className="hero-animate-4 hero-portrait-wrap">
              <HeroOrb />
              <div className="hero-portrait">
                <Image
                  src="/images/profile.jpg"
                  alt="Ricky Savanna"
                  width={420}
                  height={420}
                  priority
                  sizes="(max-width: 1024px) 60vw, 420px"
                />
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="hero-animate-5 stat-row">
            {stats.map(s => (
              <div key={s.label} className="stat-card">
                <div className="stat-number">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LIVE PLATFORMS ===== */}
      <section className="section">
        <div className="max-w-content mx-auto px-6">
          <ScrollAnimator>
            <span className="section-label">Live Work</span>
            <h2 className="section-title">Platforms running in production</h2>
            <p className="section-sub">
              These aren&apos;t mockups. Pick a tab and the real site loads right here — click through it
              without leaving the page.
            </p>
          </ScrollAnimator>

          <ScrollAnimator>
            <LiveBrowser />
          </ScrollAnimator>
        </div>
      </section>

      {/* ===== CAPABILITIES ===== */}
      <section className="section">
        <div className="max-w-content mx-auto px-6">
          <ScrollAnimator>
            <span className="section-label">What I Do</span>
            <h2 className="section-title">Operations, engineering, and the glue between them</h2>
            <p className="section-sub">
              A short list of the work I take on — the technical side and the business side.
            </p>
          </ScrollAnimator>

          <div className="capability-grid">
            {capabilities.map(cap => (
              <ScrollAnimator key={cap.title}>
                <div className="capability-card">
                  <div className="capability-icon">
                    <Icon name={cap.icon} size={22} />
                  </div>
                  <h3>{cap.title}</h3>
                  <p>{cap.body}</p>
                </div>
              </ScrollAnimator>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SKILLS ===== */}
      <section className="section">
        <div className="max-w-content mx-auto px-6">
          <ScrollAnimator>
            <span className="section-label">Skills</span>
            <h2 className="section-title">The toolkit</h2>
          </ScrollAnimator>

          <div className="skill-grid">
            {skillGroups.map(group => (
              <ScrollAnimator key={group.category}>
                <div className="skill-card">
                  <div className="skill-card-head">
                    <span className="skill-card-icon"><Icon name={group.icon} size={18} /></span>
                    <h3>{group.category}</h3>
                  </div>
                  <div className="skill-card-tags">
                    {group.items.map(item => (
                      <span key={item} className="skill-tag">{item}</span>
                    ))}
                  </div>
                </div>
              </ScrollAnimator>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="section">
        <div className="max-w-content mx-auto px-6">
          <ScrollAnimator>
            <div className="cta-card">
              <h2>
                Let&apos;s build something <span className="gradient-text">together</span>
              </h2>
              <p>
                Need someone who can run the operation and ship the software behind it? That&apos;s the job
                I already do every day.
              </p>
              <div className="cta-actions">
                <a href={`mailto:${profile.email}`} className="btn-primary">
                  Email me
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                </a>
                <Link href="/contact" className="btn-secondary">Contact details</Link>
              </div>
            </div>
          </ScrollAnimator>
        </div>
      </section>
    </div>
  )
}
