import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Reveal from '@/components/Reveal'
import { profile, experience, education, capabilities, stats } from '@/lib/resume'

export const metadata: Metadata = {
  title: 'About — Ricky Savanna',
  description:
    'Ricky Savanna — operations, administrative, and IT support professional in Arlington, TX, building production software with agentic coding.',
}

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

export default function AboutPage() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <div className="hero-grid">
            <div>
              <div className="hero-status enter-1">
                <span className="mono">About</span>
              </div>
              <h1 className="h1 enter-2" style={{ marginBottom: '32px', maxWidth: '14ch' }}>
                I sit where operations meets engineering.
              </h1>
              <div className="body-text enter-3" style={{ maxWidth: '58ch' }}>
                <p style={{ marginTop: 0 }}>{profile.longSummary}</p>
                <p>
                  I&apos;m the person staff at every level come to when something breaks — and I&apos;m
                  good at explaining technical problems to people who don&apos;t work in tech. That mix is
                  why the software I build actually gets used instead of ignored.
                </p>
              </div>
              <div className="hero-actions enter-4" style={{ marginTop: '36px', marginBottom: 0 }}>
                <Link href="/resume" className="btn btn-solid">Full résumé <Arrow /></Link>
                <Link href="/contact" className="btn btn-outline">Get in touch</Link>
              </div>
            </div>

            <div className="hero-visual enter-3" style={{ minHeight: 'auto' }}>
              <div className="portrait" style={{ width: 'min(380px, 80vw)' }}>
                <Image
                  src="/images/profile.jpg"
                  alt="Ricky Savanna"
                  width={480}
                  height={600}
                  sizes="(max-width: 1000px) 80vw, 380px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: 0 }}>
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

      <section className="section">
        <div className="wrap">
          <Reveal>
            <div className="section-head">
              <span className="section-index">01 — Services</span>
              <div><h2 className="h2">Two sides of the same job.</h2></div>
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

      <section className="section">
        <div className="wrap">
          <Reveal>
            <div className="section-head">
              <span className="section-index">02 — Career</span>
              <div><h2 className="h2">So far.</h2></div>
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
                    <p className="exp-company">{job.company} <span>— {job.location}</span></p>
                    <p className="exp-summary">{job.summary}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="panel" style={{ marginTop: '48px', maxWidth: '520px' }}>
              <span className="mono">{education.period}</span>
              <h3 className="h3">{education.school}</h3>
              <p>{education.degree} — {education.location}</p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
