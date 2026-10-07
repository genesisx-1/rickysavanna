import type { Metadata } from 'next'
import Reveal from '@/components/Reveal'
import { profile } from '@/lib/resume'

export const metadata: Metadata = {
  title: 'Contact — Ricky Savanna',
  description: 'Get in touch with Ricky Savanna — operations, IT support, and software development.',
}

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

const channels = [
  {
    label: 'Email',
    value: profile.email,
    href: `mailto:${profile.email}`,
    note: 'Best way to reach me. I reply the same day.',
  },
  {
    label: 'Phone',
    value: profile.phone,
    href: `tel:${profile.phone.replace(/-/g, '')}`,
    note: 'Call or text during business hours, Central time.',
  },
  {
    label: 'Scheduling',
    value: 'calendly.com/rsvna',
    href: 'https://calendly.com/rsvna',
    note: 'Book a slot that works for you.',
  },
  {
    label: 'Location',
    value: profile.location,
    note: 'Open to hybrid and remote roles.',
  },
]

const elsewhere = [
  { label: 'GitHub', value: 'github.com/genesisx-1', href: 'https://github.com/genesisx-1' },
  { label: 'LinkedIn', value: 'linkedin.com/in/rsavanna', href: 'https://www.linkedin.com/in/rsavanna/' },
  { label: 'X', value: '@rickysvna', href: 'https://x.com/rickysvna' },
]

export default function ContactPage() {
  return (
    <>
      <section className="hero" style={{ paddingBottom: '64px' }}>
        <div className="wrap">
          <div className="hero-status enter-1">
            <span className="mono">Contact</span>
          </div>
          <h1 className="h1 enter-2" style={{ marginBottom: '28px', maxWidth: '14ch' }}>
            Let&apos;s talk.
          </h1>
          <p className="lede enter-3">
            Hiring, contracting, or working through a build — I&apos;m easy to reach.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '64px' }}>
        <div className="wrap">
          <Reveal>
            <div className="section-head">
              <span className="section-index">01 — Direct</span>
              <div><h2 className="h2">Reach me here.</h2></div>
            </div>
          </Reveal>

          <div className="contact-list">
            {channels.map((c, i) => {
              const body = (
                <>
                  <span className="mono">{c.label}</span>
                  <span className="contact-value">{c.value}</span>
                  <span className="contact-note">{c.note}</span>
                </>
              )
              return (
                <Reveal key={c.label} delay={i * 35}>
                  {c.href ? (
                    <a
                      href={c.href}
                      target={c.href.startsWith('http') ? '_blank' : undefined}
                      rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="contact-row"
                    >
                      {body}
                    </a>
                  ) : (
                    <div className="contact-row">{body}</div>
                  )}
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal>
            <div className="section-head">
              <span className="section-index">02 — Elsewhere</span>
              <div><h2 className="h2">Find me online.</h2></div>
            </div>
          </Reveal>

          <div className="contact-list">
            {elsewhere.map((c, i) => (
              <Reveal key={c.label} delay={i * 35}>
                <a href={c.href} target="_blank" rel="noopener noreferrer" className="contact-row">
                  <span className="mono">{c.label}</span>
                  <span className="contact-value">{c.value}</span>
                  <span className="contact-note">Open profile</span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="wrap">
          <Reveal>
            <h2 className="h1">Start with an email.</h2>
            <p>Tell me what you&apos;re working on and I&apos;ll tell you how I&apos;d approach it.</p>
            <div className="cta-actions">
              <a href={`mailto:${profile.email}`} className="btn btn-solid">{profile.email} <Arrow /></a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
