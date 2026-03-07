import Link from 'next/link'
import { getProjects } from '@/lib/projects'
import { remark } from 'remark'
import remarkHtml from 'remark-html'
import ScrollAnimator from '@/components/ScrollAnimator'

type ProjectWithContentHtml = Awaited<ReturnType<typeof getProjects>>[number] & {
  contentHtml?: string
}

export default async function WorkPage() {
  const projects = await getProjects()

  const projectsWithContent = await Promise.all(
    projects.map(async (project) => {
      let contentHtml = ''
      if (project.content) {
        const processedContent = await remark()
          .use(remarkHtml, { sanitize: false })
          .process(project.content)
        contentHtml = processedContent.toString()
      }
      return { ...project, contentHtml } as ProjectWithContentHtml
    })
  )

  // Find Astrid Platform for featured section
  const astridPlatform = projectsWithContent.find(p => p.slug === 'astridplatform')
  const otherProjects = projectsWithContent.filter(p => p.slug !== 'astridplatform')

  return (
    <div>
      {/* Hero */}
      <section style={{ padding: '80px 0 40px' }}>
        <div className="max-w-content mx-auto px-6">
          <div className="hero-animate-1">
            <span className="section-label">Portfolio</span>
          </div>
          <h1 className="hero-animate-2" style={{
            fontSize: 'clamp(36px, 5vw, 56px)',
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: '-2px',
            marginBottom: '16px',
          }}>
            Things I&apos;ve <span className="gradient-text">built</span>
          </h1>
          <p className="hero-animate-3" style={{
            color: 'var(--text-secondary)',
            fontSize: '18px',
            maxWidth: '600px',
          }}>
            A collection of projects spanning AI platforms, SaaS tools, mobile apps, and more &mdash; each solving real problems.
          </p>
        </div>
      </section>

      {/* Featured: Astrid Platform */}
      {astridPlatform && (
        <section style={{ padding: '40px 0 60px' }}>
          <div className="max-w-content mx-auto px-6">
            <ScrollAnimator>
              <div className="project-card" style={{ borderRadius: '24px' }}>
                {astridPlatform.url && (
                  <div className="project-preview" style={{ aspectRatio: '21/9' }}>
                    <iframe
                      src={astridPlatform.url}
                      title={`${astridPlatform.title} preview`}
                      loading="lazy"
                      sandbox="allow-same-origin allow-scripts"
                    />
                    <a
                      href={astridPlatform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ position: 'absolute', inset: 0, zIndex: 10 }}
                      aria-label={`Visit ${astridPlatform.title}`}
                    />
                  </div>
                )}
                <div style={{ padding: '32px 40px 40px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
                    <span className="featured-badge">Flagship Project</span>
                    {astridPlatform.technologies?.map(tech => (
                      <span key={tech} className="tech-badge">{tech}</span>
                    ))}
                  </div>
                  <h2 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '12px' }}>
                    {astridPlatform.title}
                  </h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: '1.7', marginBottom: '20px', maxWidth: '700px' }}>
                    {astridPlatform.description}
                  </p>
                  {astridPlatform.contentHtml && (
                    <div
                      className="prose-custom"
                      style={{ marginBottom: '24px' }}
                      dangerouslySetInnerHTML={{ __html: astridPlatform.contentHtml }}
                    />
                  )}
                  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    {astridPlatform.url && (
                      <a href={astridPlatform.url} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '12px 24px', fontSize: '14px' }}>
                        Visit Astrid Platform
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </a>
                    )}
                    {astridPlatform.github && (
                      <a href={astridPlatform.github} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ padding: '12px 24px', fontSize: '14px' }}>
                        View Source
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </ScrollAnimator>
          </div>
        </section>
      )}

      {/* All Other Projects */}
      <section style={{ padding: '60px 0' }}>
        <div className="max-w-content mx-auto px-6">
          <ScrollAnimator>
            <span className="section-label">All Projects</span>
            <h2 style={{ fontSize: '32px', fontWeight: 800, letterSpacing: '-1px', marginBottom: '40px' }}>
              More work
            </h2>
          </ScrollAnimator>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project) => {
              const formattedDate = project.date
                ? new Date(project.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
                : null

              return (
                <ScrollAnimator key={project.slug}>
                  <div className="project-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
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
                    <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      {formattedDate && (
                        <span style={{ color: 'var(--text-muted)', fontSize: '12px', marginBottom: '8px' }}>
                          {formattedDate}
                        </span>
                      )}
                      <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>
                        {project.title}
                      </h3>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6', marginBottom: '16px', flex: 1 }}>
                        {project.description}
                      </p>
                      {project.technologies && project.technologies.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                          {project.technologies.slice(0, 4).map(tech => (
                            <span key={tech} className="tech-badge">{tech}</span>
                          ))}
                        </div>
                      )}
                      <div style={{ display: 'flex', gap: '16px', marginTop: 'auto' }}>
                        {project.url && (
                          <a href={project.url} target="_blank" rel="noopener noreferrer" className="nav-link" style={{ fontSize: '13px', fontWeight: 600 }}>
                            Live &rarr;
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
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
