import type { Metadata } from 'next'
import Link from 'next/link'
import ScrollAnimator from '@/components/ScrollAnimator'
import { profile } from '@/lib/resume'

export const metadata: Metadata = {
  title: 'Contact | Ricky Savanna',
  description: 'Get in touch with Ricky Savanna — operations, IT support, and full-stack development.',
}

const channels = [
  {
    label: 'Email',
    value: profile.email,
    href: `mailto:${profile.email}`,
    note: 'Best way to reach me — I reply the same day.',
    icon: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
  },
  {
    label: 'Phone',
    value: profile.phone,
    href: `tel:${profile.phone.replace(/-/g, '')}`,
    note: 'Call or text during business hours, CT.',
    icon: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.4 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />,
  },
  {
    label: 'Book a call',
    value: 'calendly.com/rsvna',
    href: 'https://calendly.com/rsvna',
    note: 'Grab a slot that works for you.',
    icon: (
      <>
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </>
    ),
  },
  {
    label: 'Location',
    value: profile.location,
    note: 'Open to hybrid and remote roles.',
    icon: (
      <>
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </>
    ),
  },
]

const socials = [
  { label: 'GitHub', href: 'https://github.com/genesisx-1' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rsavanna/' },
  { label: 'X', href: 'https://x.com/rickysvna' },
]

export default function ContactPage() {
  return (
    <div>
      <section className="page-hero">
        <div className="max-w-content mx-auto px-6">
          <div className="hero-animate-1">
            <span className="section-label">Contact</span>
          </div>
          <h1 className="hero-animate-2 page-title">
            Let&apos;s <span className="gradient-text">connect</span>
          </h1>
          <p className="hero-animate-3 page-lede">
            Hiring, contracting, or just want to talk through a build — I&apos;m easy to reach.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '20px' }}>
        <div className="max-w-content mx-auto px-6">
          <div className="contact-grid">
            {channels.map(c => {
              const inner = (
                <>
                  <span className="contact-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      {c.icon}
                    </svg>
                  </span>
                  <h3>{c.label}</h3>
                  <p className="contact-value">{c.value}</p>
                  <p className="contact-note">{c.note}</p>
                </>
              )
              return (
                <ScrollAnimator key={c.label}>
                  {c.href ? (
                    <a
                      href={c.href}
                      target={c.href.startsWith('http') ? '_blank' : undefined}
                      rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="contact-card"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="contact-card">{inner}</div>
                  )}
                </ScrollAnimator>
              )
            })}
          </div>

          <ScrollAnimator>
            <div className="cta-card" style={{ marginTop: '48px' }}>
              <h2>Find me online</h2>
              <div className="cta-actions">
                {socials.map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                    {s.label}
                  </a>
                ))}
                <Link href="/resume" className="btn-primary">View résumé</Link>
              </div>
            </div>
          </ScrollAnimator>
        </div>
      </section>
    </div>
  )
}
