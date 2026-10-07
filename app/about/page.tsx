import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import ScrollAnimator from '@/components/ScrollAnimator'
import Icon from '@/components/Icon'
import { profile, experience, education, capabilities, stats } from '@/lib/resume'

export const metadata: Metadata = {
  title: 'About | Ricky Savanna',
  description:
    'Ricky Savanna — operations, administrative, and IT support professional in Arlington, TX, building production software with agentic coding.',
}

export default function AboutPage() {
  return (
    <div>
      <section className="page-hero">
        <div className="max-w-content mx-auto px-6">
          <div className="about-grid">
            <div>
              <div className="hero-animate-1">
                <span className="section-label">About</span>
              </div>
              <h1 className="hero-animate-2 page-title">
                Ricky <span className="gradient-text">Savanna</span>
              </h1>
              <div className="hero-animate-3 about-copy">
                <p>{profile.summary}</p>
                <p>{profile.longSummary}</p>
                <p>
                  I&apos;m the person staff at every level come to when something breaks — and I&apos;m
                  good at explaining technical problems to people who don&apos;t work in tech. That mix is
                  what makes the software I build actually get used.
                </p>
              </div>

              <div className="hero-animate-5 hero-actions">
                <Link href="/resume" className="btn-primary">
                  Full résumé
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link href="/contact" className="btn-secondary">Get in touch</Link>
              </div>
            </div>

            <div className="hero-animate-4 about-portrait">
              <div className="gradient-border about-portrait-frame">
                <Image
                  src="/images/profile.jpg"
                  alt="Ricky Savanna"
                  width={480}
                  height={480}
                  sizes="(max-width: 1024px) 70vw, 440px"
                />
              </div>
            </div>
          </div>

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

      <section className="section">
        <div className="max-w-content mx-auto px-6">
          <ScrollAnimator>
            <span className="section-label">What I Do</span>
            <h2 className="section-title">Two sides of the same job</h2>
          </ScrollAnimator>

          <div className="capability-grid">
            {capabilities.map(cap => (
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
            <span className="section-label">Experience</span>
            <h2 className="section-title">Career so far</h2>
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
                  </div>
                </article>
              </ScrollAnimator>
            ))}
          </div>

          <ScrollAnimator>
            <div className="glass-card education-card" style={{ marginTop: '40px', maxWidth: '520px' }}>
              <span className="section-label">Education</span>
              <h3>{education.school}</h3>
              <p>{education.degree}</p>
              <p className="timeline-period">{education.period} · {education.location}</p>
            </div>
          </ScrollAnimator>
        </div>
      </section>
    </div>
  )
}
