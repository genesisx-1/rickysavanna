import Image from 'next/image'
import Link from 'next/link'
import ScrollAnimator from '@/components/ScrollAnimator'

export default function AboutPage() {
  const skills = [
    { category: 'Languages', items: ['JavaScript', 'TypeScript', 'Python', 'SQL', 'HTML', 'CSS'] },
    { category: 'Frontend', items: ['React', 'Next.js', 'React Native', 'Tailwind CSS', 'Three.js'] },
    { category: 'Backend', items: ['Node.js', 'Express', 'Django', 'REST APIs'] },
    { category: 'Data & AI', items: ['PostgreSQL', 'Supabase', 'OpenAI', 'Ollama', 'Pandas'] },
    { category: 'Tools', items: ['Git', 'Railway', 'Netlify', 'Expo', 'Vite'] },
  ]

  return (
    <div>
      {/* Hero */}
      <section style={{ padding: '80px 0 60px' }}>
        <div className="max-w-content mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
            <div className="lg:col-span-3">
              <div className="hero-animate-1">
                <span className="section-label">About Me</span>
              </div>
              <h1 className="hero-animate-2" style={{
                fontSize: 'clamp(36px, 5vw, 56px)',
                fontWeight: 900,
                lineHeight: 1.1,
                letterSpacing: '-2px',
                marginBottom: '24px',
              }}>
                Ricky <span className="gradient-text">Savanna</span>
              </h1>
              <div className="hero-animate-3" style={{ color: 'var(--text-secondary)', fontSize: '17px', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '16px' }}>
                  I&apos;m a full-stack developer and AI engineer with a background in operations, analytics, and
                  AI-driven automation. I founded <strong style={{ color: 'var(--text-primary)' }}>Astrid Genesis</strong>,
                  an AI software company focused on building practical tools for small and medium businesses.
                </p>
                <p style={{ marginBottom: '16px' }}>
                  Currently serving as <strong style={{ color: 'var(--text-primary)' }}>Technical Operations Manager &amp; Lead Developer</strong> at
                  NTX Limo in Dallas, TX &mdash; where I focus on AI productization, backend operations, and automation pipelines.
                </p>
                <p>
                  I connect systems, people, and technology to build software that creates real business impact.
                  From CRM platforms with AI agents to real-time dispatch systems and creative collaboration tools &mdash;
                  I build end-to-end.
                </p>
              </div>

              <div className="hero-animate-5" style={{ display: 'flex', gap: '16px', marginTop: '32px', flexWrap: 'wrap' }}>
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '12px 24px', fontSize: '14px' }}>
                  Download Resume
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                </a>
                <Link href="/contact" className="btn-secondary" style={{ padding: '12px 24px', fontSize: '14px' }}>
                  Get in Touch
                </Link>
              </div>
            </div>

            <div className="lg:col-span-2 hero-animate-4">
              <div className="gradient-border" style={{ borderRadius: '20px', overflow: 'hidden' }}>
                <Image
                  src="/images/profile.jpg"
                  alt="Ricky Savanna"
                  width={500}
                  height={600}
                  className="rounded-2xl"
                  style={{ objectFit: 'cover', width: '100%', height: 'auto', filter: 'grayscale(20%)' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section style={{ padding: '60px 0' }}>
        <div className="max-w-content mx-auto px-6">
          <ScrollAnimator>
            <span className="section-label">Skills & Technologies</span>
            <h2 style={{ fontSize: '32px', fontWeight: 800, letterSpacing: '-1px', marginBottom: '40px' }}>
              My tech stack
            </h2>
          </ScrollAnimator>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map(group => (
              <ScrollAnimator key={group.category}>
                <div className="glass-card" style={{ padding: '28px' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--accent)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    {group.category}
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {group.items.map(skill => (
                      <span key={skill} className="skill-tag" style={{ fontSize: '13px', padding: '6px 14px' }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollAnimator>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section style={{ padding: '60px 0' }}>
        <div className="max-w-content mx-auto px-6">
          <ScrollAnimator>
            <span className="section-label">Education</span>
            <h2 style={{ fontSize: '32px', fontWeight: 800, letterSpacing: '-1px', marginBottom: '40px' }}>
              Background
            </h2>
          </ScrollAnimator>

          <ScrollAnimator>
            <div className="glass-card" style={{ padding: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'var(--accent-glow)',
                  border: '1px solid var(--accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-light)" strokeWidth="2">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c0 2 4 3 6 3s6-1 6-3v-5" />
                  </svg>
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '4px' }}>
                    Associate of Applied Science in Cybersecurity
                  </h3>
                  <p style={{ color: 'var(--accent-light)', fontSize: '15px', marginBottom: '4px' }}>
                    Tarrant County College &mdash; Fort Worth, TX
                  </p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
                    Aug 2022 &ndash; May 2024
                  </p>
                </div>
              </div>
            </div>
          </ScrollAnimator>
        </div>
      </section>

      {/* Experience */}
      <section style={{ padding: '60px 0' }}>
        <div className="max-w-content mx-auto px-6">
          <ScrollAnimator>
            <span className="section-label">Experience</span>
            <h2 style={{ fontSize: '32px', fontWeight: 800, letterSpacing: '-1px', marginBottom: '40px' }}>
              Where I&apos;ve worked
            </h2>
          </ScrollAnimator>

          <div style={{ maxWidth: '700px' }}>
            <ScrollAnimator>
              <div className="timeline-item" style={{ paddingBottom: '40px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '4px' }}>
                  Technical Operations Manager & Lead Developer
                </h3>
                <p style={{ color: 'var(--accent-light)', fontSize: '15px', marginBottom: '4px' }}>
                  NTX Limo &mdash; Dallas, TX
                </p>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '12px' }}>
                  Jan 2025 &ndash; Present
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.7' }}>
                  Building dispatch systems, investor CRMs, and automation pipelines. Leading full-stack development with AI integration for fleet management operations.
                </p>
              </div>
            </ScrollAnimator>

            <ScrollAnimator>
              <div className="timeline-item">
                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '4px' }}>
                  Founder & Lead Developer
                </h3>
                <p style={{ color: 'var(--accent-light)', fontSize: '15px', marginBottom: '4px' }}>
                  Astrid Genesis
                </p>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '12px' }}>
                  2024 &ndash; Present
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.7' }}>
                  Founded an AI software company building practical tools for SMBs. Created the Astrid Platform ecosystem including CRM, chat, creative collaboration hub, and automotive marketplace.
                </p>
              </div>
            </ScrollAnimator>
          </div>
        </div>
      </section>
    </div>
  )
}
