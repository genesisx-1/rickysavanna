import Link from 'next/link'
import Image from 'next/image'
import { getProjects } from '@/lib/projects'
import ScrollAnimator from '@/components/ScrollAnimator'

export default async function Home() {
  const projects = await getProjects()
  const featuredProjects = projects.slice(0, 3)

  const skills = ['JavaScript', 'TypeScript', 'Python', 'React', 'Next.js', 'Django', 'Node.js', 'PostgreSQL', 'Supabase', 'AI/ML', 'Three.js']

  return (
    <div>
      {/* Hero Section */}
      <section style={{ minHeight: 'calc(100vh - 65px)', display: 'flex', alignItems: 'center' }}>
        <div className="max-w-content mx-auto px-6 py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="hero-animate-1">
                <span className="section-label">Full-Stack Developer & AI Engineer</span>
              </div>

              <h1 className="hero-animate-2" style={{
                fontSize: 'clamp(40px, 6vw, 72px)',
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: '-2px',
                marginBottom: '24px',
              }}>
                Building the
                <br />
                <span className="gradient-text">future with code</span>
              </h1>

              <p className="hero-animate-3" style={{
                fontSize: '18px',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                maxWidth: '500px',
                marginBottom: '40px',
              }}>
                I connect systems, people, and technology. From AI-driven automation
                to scalable platforms &mdash; I build software that creates real business impact.
              </p>

              <div className="hero-animate-5" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link href="/work" className="btn-primary">
                  View My Work
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link href="/contact" className="btn-secondary">
                  Get In Touch
                </Link>
              </div>
            </div>

            <div className="hero-animate-4 hidden lg:flex justify-center">
              <div className="gradient-border" style={{ borderRadius: '24px', overflow: 'hidden' }}>
                <Image
                  src="/images/profile.jpg"
                  alt="Ricky Savanna"
                  width={400}
                  height={400}
                  className="rounded-3xl"
                  priority
                  style={{
                    objectFit: 'cover',
                    filter: 'grayscale(20%)',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="hero-animate-5 grid grid-cols-2 md:grid-cols-4 gap-4 mt-20">
            <div className="stat-card">
              <div className="stat-number">12+</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>Projects Built</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">5+</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>Astrid Products</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">3+</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>Years Coding</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">AI</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>Focused</div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section style={{ padding: '80px 0' }}>
        <div className="max-w-content mx-auto px-6">
          <ScrollAnimator>
            <span className="section-label">Tech Stack</span>
            <h2 style={{ fontSize: '36px', fontWeight: 800, letterSpacing: '-1px', marginBottom: '40px' }}>
              Tools I work with
            </h2>
          </ScrollAnimator>

          <ScrollAnimator stagger>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {skills.map(skill => (
                <span key={skill} className="skill-tag">{skill}</span>
              ))}
            </div>
          </ScrollAnimator>
        </div>
      </section>

      {/* Featured Projects */}
      <section style={{ padding: '80px 0' }}>
        <div className="max-w-content mx-auto px-6">
          <ScrollAnimator>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <span className="section-label">Featured Work</span>
                <h2 style={{ fontSize: '36px', fontWeight: 800, letterSpacing: '-1px' }}>
                  Recent projects
                </h2>
              </div>
              <Link href="/work" className="btn-secondary" style={{ padding: '10px 20px', fontSize: '14px' }}>
                View All
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </ScrollAnimator>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project, i) => (
              <ScrollAnimator key={project.slug}>
                <div className="project-card" style={{ animationDelay: `${i * 0.15}s` }}>
                  {project.url && (
                    <div className="project-preview">
                      <iframe
                        src={project.url}
                        title={`${project.title} preview`}
                        loading="lazy"
                        sandbox="allow-same-origin allow-scripts"
                      />
                    </div>
                  )}
                  <div style={{ padding: '24px' }}>
                    {i === 0 && <span className="featured-badge" style={{ marginBottom: '12px' }}>Featured</span>}
                    <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px', marginTop: i === 0 ? '12px' : 0 }}>
                      {project.title}
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6', marginBottom: '16px' }}>
                      {project.description}
                    </p>
                    {project.technologies && project.technologies.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                        {project.technologies.slice(0, 4).map(tech => (
                          <span key={tech} className="tech-badge">{tech}</span>
                        ))}
                      </div>
                    )}
                    <div style={{ display: 'flex', gap: '12px' }}>
                      {project.url && (
                        <a href={project.url} target="_blank" rel="noopener noreferrer" className="nav-link" style={{ fontSize: '13px', fontWeight: 600 }}>
                          Live Site &rarr;
                        </a>
                      )}
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="nav-link" style={{ fontSize: '13px', fontWeight: 600 }}>
                          GitHub &rarr;
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </ScrollAnimator>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '80px 0' }}>
        <div className="max-w-content mx-auto px-6">
          <ScrollAnimator>
            <div className="glass-card" style={{
              padding: 'clamp(40px, 6vw, 80px)',
              textAlign: 'center',
              borderRadius: '24px',
            }}>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: '16px' }}>
                Let&apos;s build something <span className="gradient-text">together</span>
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '18px', maxWidth: '500px', margin: '0 auto 32px' }}>
                Looking for a developer who can turn ideas into scalable, intelligent software?
              </p>
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href="https://calendly.com/rsvna" target="_blank" rel="noopener noreferrer" className="btn-primary">
                  Book a Call
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </a>
                <Link href="/contact" className="btn-secondary">
                  Contact Info
                </Link>
              </div>
            </div>
          </ScrollAnimator>
        </div>
      </section>
    </div>
  )
}
