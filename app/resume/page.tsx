import type { Metadata } from 'next'
import Link from 'next/link'
import Reveal from '@/components/Reveal'
import { profile, experience, education, skillGroups, platforms } from '@/lib/resume'

export const metadata: Metadata = {
  title: 'Résumé — Ricky Savanna',
  description:
    'Operations, administrative, and IT support professional with 5 years of experience, building production platforms with agentic coding.',
}

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

export default function ResumePage() {
  return (
    <>
      <section className="hero" style={{ paddingBottom: '72px' }}>
        <div className="wrap">
          <div className="hero-status enter-1">
            <span className="mono">Résumé</span>
          </div>
          <h1 className="h1 enter-2" style={{ marginBottom: '28px', maxWidth: '16ch' }}>
            Ricky Savanna
          </h1>
          <p className="lede enter-3" style={{ marginBottom: '36px' }}>{profile.summary}</p>
          <div className="hero-meta enter-4" style={{ paddingTop: '28px' }}>
            <a className="mono" href={`tel:${profile.phone.replace(/-/g, '')}`}>{profile.phone}</a>
            <a className="mono" href={`mailto:${profile.email}`}>{profile.email}</a>
            <span className="mono">{profile.site}</span>
            <span className="mono">{profile.location}</span>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <div className="section-head">
              <span className="section-index">01 — Experience</span>
              <div><h2 className="h2">Where I&apos;ve worked.</h2></div>
            </div>
          </Reveal>

          <div className="exp-list">
            {experience.map(job => (
              <Reveal key={`${job.company}-${job.period}`}>
                <article className="exp-item">
                  <div className="exp-aside">
                    <span className="exp-period">{job.period}</span>
                    {job.current && <span className="exp-current">Current</span>}
                  </div>
                  <div>
                    <h3 className="exp-role">{job.role}</h3>
                    <p className="exp-company">
                      {job.company} <span>— {job.location}</span>
                    </p>
                    <p className="exp-summary">{job.summary}</p>
                    <ul className="exp-points">
                      {job.highlights.map(h => <li key={h}>{h}</li>)}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <div className="section-head">
              <span className="section-index">02 — Projects</span>
              <div><h2 className="h2">Platforms I built.</h2></div>
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

      {/* Skills */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <div className="section-head">
              <span className="section-index">03 — Skills</span>
              <div><h2 className="h2">What I bring.</h2></div>
            </div>
          </Reveal>

          <dl className="skill-list">
            {skillGroups.map(group => (
              <Reveal key={group.category}>
                <div className="skill-row">
                  <dt>{group.category}</dt>
                  <dd>{group.items.map(i => <span key={i}>{i}</span>)}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* Education */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <div className="section-head">
              <span className="section-index">04 — Education</span>
              <div><h2 className="h2">Study.</h2></div>
            </div>
          </Reveal>

          <div className="panel-grid">
            <Reveal>
              <div className="panel">
                <span className="mono">{education.period}</span>
                <h3 className="h3">{education.school}</h3>
                <p>{education.degree} — {education.location}</p>
              </div>
            </Reveal>
            <Reveal>
              <div className="panel">
                <span className="mono">Next step</span>
                <h3 className="h3">Want the full picture?</h3>
                <p style={{ marginBottom: '24px' }}>
                  Happy to walk through any of it — the operations side or the engineering side.
                </p>
                <div className="cta-actions">
                  <a href={`mailto:${profile.email}`} className="btn btn-solid">Email me <Arrow /></a>
                  <Link href="/work" className="btn btn-outline">See it live</Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
