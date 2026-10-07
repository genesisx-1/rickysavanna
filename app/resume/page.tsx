import type { Metadata } from 'next'
import Link from 'next/link'
import ScrollAnimator from '@/components/ScrollAnimator'
import Icon from '@/components/Icon'
import { profile, experience, education, skillGroups, platforms } from '@/lib/resume'

export const metadata: Metadata = {
  title: 'Résumé | Ricky Savanna',
  description:
    'Operations, administrative, and IT support professional with 5 years of experience — and a full-stack builder shipping production platforms with agentic coding.',
}

export default function ResumePage() {
  return (
    <div>
      <section className="page-hero">
        <div className="max-w-content mx-auto px-6">
          <div className="hero-animate-1">
            <span className="section-label">Résumé</span>
          </div>
          <h1 className="hero-animate-2 page-title">
            {profile.name.split(' ')[0]} <span className="gradient-text">{profile.name.split(' ')[1]}</span>
          </h1>
          <p className="hero-animate-3 resume-contact">
            <a href={`tel:${profile.phone.replace(/-/g, '')}`}>{profile.phone}</a>
            <span>·</span>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <span>·</span>
            <a href="https://rickysavanna.me" target="_blank" rel="noopener noreferrer">{profile.site}</a>
            <span>·</span>
            <span>{profile.location}</span>
          </p>
          <p className="hero-animate-3 page-lede">{profile.summary}</p>
        </div>
      </section>

      {/* Experience */}
      <section className="section">
        <div className="max-w-content mx-auto px-6">
          <ScrollAnimator>
            <span className="section-label">Experience</span>
            <h2 className="section-title">Where I&apos;ve worked</h2>
          </ScrollAnimator>

          <div className="timeline">
            {experience.map(job => (
              <ScrollAnimator key={`${job.company}-${job.period}`}>
                <article className="timeline-entry">
                  <div className="timeline-marker">
                    <span className={job.current ? 'timeline-dot current' : 'timeline-dot'} />
                  </div>
                  <div className="timeline-body">
                    <div className="timeline-head">
                      <h3>{job.role}</h3>
                      {job.current && <span className="featured-badge">Current</span>}
                    </div>
                    <p className="timeline-company">
                      {job.company} <span>· {job.location}</span>
                    </p>
                    <p className="timeline-period">{job.period}</p>
                    <p className="timeline-summary">{job.summary}</p>
                    <ul className="timeline-list">
                      {job.highlights.map(h => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              </ScrollAnimator>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="section">
        <div className="max-w-content mx-auto px-6">
          <ScrollAnimator>
            <span className="section-label">Projects</span>
            <h2 className="section-title">Platforms I built</h2>
          </ScrollAnimator>

          <div className="resume-project-grid">
            {platforms.map(p => (
              <ScrollAnimator key={p.domain}>
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="resume-project">
                  <span className="resume-project-bar" style={{ background: p.accent }} />
                  <h3>{p.name}</h3>
                  <span className="resume-project-domain">{p.domain}</span>
                  <p>{p.description}</p>
                </a>
              </ScrollAnimator>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="section">
        <div className="max-w-content mx-auto px-6">
          <ScrollAnimator>
            <span className="section-label">Skills</span>
            <h2 className="section-title">What I bring</h2>
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

      {/* Education + CTA */}
      <section className="section">
        <div className="max-w-content mx-auto px-6">
          <div className="education-row">
            <ScrollAnimator>
              <div className="glass-card education-card">
                <span className="section-label">Education</span>
                <h3>{education.school}</h3>
                <p>{education.degree}</p>
                <p className="timeline-period">{education.period} · {education.location}</p>
              </div>
            </ScrollAnimator>

            <ScrollAnimator>
              <div className="glass-card education-card">
                <span className="section-label">Next Step</span>
                <h3>Want the full picture?</h3>
                <p>Happy to walk through any of it — the operations side or the engineering side.</p>
                <div className="cta-actions" style={{ justifyContent: 'flex-start', marginTop: '20px' }}>
                  <a href={`mailto:${profile.email}`} className="btn-primary">Email me</a>
                  <Link href="/work" className="btn-secondary">See it live</Link>
                </div>
              </div>
            </ScrollAnimator>
          </div>
        </div>
      </section>
    </div>
  )
}
