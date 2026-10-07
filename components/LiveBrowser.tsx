'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { platforms } from '@/lib/resume'

type Viewport = 'desktop' | 'mobile'

export default function LiveBrowser() {
  const [active, setActive] = useState(0)
  const [viewport, setViewport] = useState<Viewport>('desktop')
  const [launched, setLaunched] = useState(false)
  const [loading, setLoading] = useState(false)
  const [reloadKey, setReloadKey] = useState(0)
  const [stalled, setStalled] = useState(false)
  const frameRef = useRef<HTMLIFrameElement>(null)

  const site = platforms[active]

  const open = useCallback((index: number) => {
    setActive(index)
    setLaunched(true)
    setLoading(true)
    setStalled(false)
    setReloadKey(k => k + 1)
  }, [])

  const reload = useCallback(() => {
    setLoading(true)
    setStalled(false)
    setReloadKey(k => k + 1)
  }, [])

  // If the frame never finishes loading, surface a way out instead of a blank panel.
  useEffect(() => {
    if (!launched || !loading) return
    const timer = window.setTimeout(() => setStalled(true), 12000)
    return () => window.clearTimeout(timer)
  }, [launched, loading, reloadKey])

  return (
    <div className="live-browser">
      {/* Tab strip */}
      <div className="lb-tabs" role="tablist" aria-label="Live project sites">
        {platforms.map((p, i) => (
          <button
            key={p.domain}
            role="tab"
            aria-selected={i === active}
            className={`lb-tab ${i === active ? 'active' : ''}`}
            onClick={() => open(i)}
            style={{ '--tab-accent': p.accent } as React.CSSProperties}
          >
            <span className="lb-tab-dot" />
            <span className="lb-tab-name">{p.name}</span>
            <span className="lb-tab-domain">{p.domain}</span>
          </button>
        ))}
      </div>

      {/* Browser chrome */}
      <div className="lb-chrome">
        <div className="lb-dots">
          <span style={{ background: '#ff5f57' }} />
          <span style={{ background: '#febc2e' }} />
          <span style={{ background: '#28c840' }} />
        </div>

        <button className="lb-icon-btn" onClick={reload} aria-label="Reload site" title="Reload">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M21 12a9 9 0 1 1-2.64-6.36" />
            <path d="M21 3v6h-6" />
          </svg>
        </button>

        <div className="lb-url">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
            <rect x="4" y="11" width="16" height="10" rx="2" />
            <path d="M8 11V7a4 4 0 0 1 8 0v4" />
          </svg>
          <span>{site.url.replace('https://', '')}</span>
          {loading && launched && <span className="lb-loading-bar" />}
        </div>

        <div className="lb-viewport-toggle" role="group" aria-label="Viewport size">
          <button
            className={viewport === 'desktop' ? 'active' : ''}
            onClick={() => setViewport('desktop')}
            aria-label="Desktop view"
            title="Desktop"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="4" width="20" height="13" rx="2" />
              <path d="M8 21h8M12 17v4" />
            </svg>
          </button>
          <button
            className={viewport === 'mobile' ? 'active' : ''}
            onClick={() => setViewport('mobile')}
            aria-label="Mobile view"
            title="Mobile"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="7" y="2" width="10" height="20" rx="2" />
              <path d="M11 18h2" />
            </svg>
          </button>
        </div>

        <a
          className="lb-icon-btn"
          href={site.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${site.domain} in a new tab`}
          title="Open in new tab"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M15 3h6v6" />
            <path d="M10 14 21 3" />
            <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
          </svg>
        </a>
      </div>

      {/* Stage */}
      <div className={`lb-stage ${viewport}`}>
        <div className="lb-screen" key={`${site.domain}-${viewport}`}>
          {launched ? (
            <>
            <iframe
              ref={frameRef}
              key={reloadKey}
              src={site.url}
              title={`${site.name} live site`}
              className="lb-frame"
              onLoad={() => { setLoading(false); setStalled(false) }}
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
              referrerPolicy="no-referrer-when-downgrade"
              loading="lazy"
            />
            {stalled && (
              <div className="lb-stalled">
                <p className="lb-stalled-title">Taking longer than usual</p>
                <p className="lb-stalled-body">
                  {site.domain} may be blocking embedding, or it&apos;s slow right now.
                  Open it in its own tab instead.
                </p>
                <div className="lb-stalled-actions">
                  <a href={site.url} target="_blank" rel="noopener noreferrer" className="btn-primary">
                    Open {site.domain}
                  </a>
                  <button className="btn-secondary" onClick={reload}>Try again</button>
                </div>
              </div>
            )}
            </>
          ) : (
            <div className="lb-splash">
              <div className="lb-splash-glow" style={{ background: site.accent }} />
              <h3>{site.name}</h3>
              <p className="lb-splash-tag">{site.tagline}</p>
              <p className="lb-splash-desc">{site.description}</p>
              <div className="lb-splash-stack">
                {site.stack.map(s => (
                  <span key={s} className="tech-badge">{s}</span>
                ))}
              </div>
              <button className="btn-primary" onClick={() => open(active)}>
                Launch live site
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m5 3 14 9-14 9V3z" />
                </svg>
              </button>
              <p className="lb-splash-hint">Runs the real site right here — click around, it&apos;s interactive.</p>
            </div>
          )}
        </div>
      </div>

      {/* Caption */}
      <div className="lb-caption">
        <div>
          <strong>{site.name}</strong>
          <span> — {site.tagline}</span>
        </div>
        <a href={site.url} target="_blank" rel="noopener noreferrer" className="nav-link lb-caption-link">
          Trouble loading? Open {site.domain} &rarr;
        </a>
      </div>
    </div>
  )
}
