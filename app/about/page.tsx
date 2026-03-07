import Image from 'next/image'
import Link from 'next/link'
import ScrollAnimator from '@/components/ScrollAnimator'

export default function AboutPage() {
  const skills = [
    { name: 'JavaScript', category: 'language' },
    { name: 'TypeScript', category: 'language' },
    { name: 'Python', category: 'language' },
    { name: 'React', category: 'frontend' },
    { name: 'Next.js', category: 'frontend' },
    { name: 'Three.js', category: 'frontend' },
    { name: 'Tailwind CSS', category: 'frontend' },
    { name: 'HTML/CSS', category: 'frontend' },
    { name: 'Node.js', category: 'backend' },
    { name: 'Django', category: 'backend' },
    { name: 'Express', category: 'backend' },
    { name: 'PostgreSQL', category: 'backend' },
    { name: 'Supabase', category: 'backend' },
    { name: 'SQL', category: 'backend' },
    { name: 'React Native', category: 'mobile' },
    { name: 'Expo', category: 'mobile' },
    { name: 'AI/ML', category: 'other' },
    { name: 'OpenAI', category: 'other' },
    { name: 'Git', category: 'other' },
    { name: 'Railway', category: 'other' },
    { name: 'Netlify', category: 'other' },
  ]

  return (
    <div>
      {/* Hero */}
      <section style={{ padding: '80px 0 40px' }}>
        <div className="max-w-narrow mx-auto px-6">
          <div className="hero-animate-1">
            <span className="section-label">About Me</span>
          </div>
          <h1 className="hero-animate-2" style={{
            fontSize: 'clamp(36px, 5vw, 56px)',
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: '-2px',
            marginBottom: '32px',
          }}>
            Developer, founder,
            <br />
            <span className="gradient-text">problem solver</span>
          </h1>
        </div>
      </section>

      {/* Bio */}
      <section style={{ paddingBottom: '60px' }}>
        <div className="max-w-narrow mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
            <div className="hero-animate-3">
              <div className="gradient-border" style={{ borderRadius: '20px', overflow: 'hidden' }}>
                <Image
                  src="/images/profile.jpg"
                  alt="Ricky Savanna"
                  width={300}
                  height={300}
                  className="rounded-2xl w-full"
                  priority
                  style={{ objectFit: 'cover', filter: 'grayscale(20%)' }}
                />
              </div>
            </div>

            <div className="md:col-span-2 hero-animate-4" style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: '1.8' }}>
              <p style={{ marginBottom: '20px' }}>
                I&apos;ve built my career around connecting systems, people, and technology. My background spans operations, analytics, and AI-driven automation &mdash; from managing campaigns and data workflows to building and scaling custom software platforms.
              </p>
              <p style={{ marginBottom: '20px' }}>
                I got into development by necessity, automating business bottlenecks and optimizing backend systems. That evolved into <strong style={{ color: 'var(--text-primary)' }}>Astrid Genesis</strong>, my AI software company that helps small and medium businesses integrate intelligent tools into their daily operations.
              </p>
              <p>
                I specialize in full-stack systems and practical automation &mdash; designing solutions that scale. My focus is on AI productization, backend operations, and automation pipelines &mdash; creating efficiency, leverage, and measurable business impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Current Role */}
      <section style={{ padding: '60px 0' }}>
        <div className="max-w-narrow mx-auto px-6">
          <ScrollAnimator>
            <div className="glass-card" style={{ padding: '40px', borderRadius: '20px' }}>
              <span className="section-label">Current Role</span>
              <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px', marginTop: '12px' }}>
                Technical Operations Manager & Lead Developer
              </h3>
              <p style={{ color: 'var(--accent-light)', fontSize: '18px', fontWeight: 600, marginBottom: '4px' }}>
                NTX Limo
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
                Dallas, TX &bull; January 2025 &ndash; Present
              </p>
            </div>
          </ScrollAnimator>
        </div>
      </section>

      {/* Skills */}
      <section style={{ padding: '60px 0' }}>
        <div className="max-w-narrow mx-auto px-6">
          <ScrollAnimator>
            <span className="section-label">Skills & Technologies</span>
            <h2 style={{ fontSize: '32px', fontWeight: 800, letterSpacing: '-1px', marginBottom: '32px' }}>
              What I work with
            </h2>
          </ScrollAnimator>

          <ScrollAnimator stagger>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {skills.map(skill => (
                <span key={skill.name} className="skill-tag">{skill.name}</span>
              ))}
            </div>
          </ScrollAnimator>
        </div>
      </section>

      {/* Education */}
      <section style={{ padding: '60px 0' }}>
        <div className="max-w-narrow mx-auto px-6">
          <ScrollAnimator>
            <span className="section-label">Education</span>
            <div className="glass-card" style={{ padding: '32px', borderRadius: '20px', marginTop: '16px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>
                Associate of Applied Science in Cybersecurity
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '4px' }}>
                Tarrant County College at Fort Worth, TX
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
                August 2022 &ndash; May 2024
              </p>
            </div>
          </ScrollAnimator>
        </div>
      </section>

      {/* Resume CTA */}
      <section style={{ padding: '60px 0' }}>
        <div className="max-w-narrow mx-auto px-6">
          <ScrollAnimator>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-primary">
                Download Resume
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </a>
              <Link href="/contact" className="btn-secondary">
                Get In Touch
              </Link>
            </div>
          </ScrollAnimator>
        </div>
      </section>
    </div>
  )
}
