'use client'

import { useState, useCallback, useEffect } from 'react'
import { platforms } from '@/lib/resume'

type Viewport = 'desktop' | 'mobile'

export default function LiveBrowser() {
  const [active, setActive] = useState(0)
  const [viewport, setViewport] = useState<Viewport>('desktop')
  const [launched, setLaunched] = useState(false)
  const [loading, setLoading] = useState(false)
  const [stalled, setStalled] = useState(false)
  const [reloadKey, setReloadKey] = useState(0)

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

  // If a frame never settles, offer a way out instead of a blank panel.
  useEffect(() => {
    if (!launched || !loading) return
    const timer = window.setTimeout(() => setStalled(true), 12000)
    return () => window.clearTimeout(timer)
  }, [launched, loading, reloadKey])

  return (
    <div className="live-browser">
      <div className="lb-tabs" role="tablist" aria-label="Live project sites">
        {platforms.map((p, i) => (
          <button
            key={p.domain}
            role="tab"
            aria-selected={i === active}
            className={`lb-tab ${i === active ? 'active' : ''}`}
            onClick={() => open(i)}
          >
            <span className="lb-tab-name">{p.name}</span>
            <span className="lb-tab-domain">{p.domain}</span>
          </button>
        ))}
      </div>

      <div className="lb-chrome">
        <button className="lb-icon-btn" onClick={reload} aria-label="Reload site" title="Reload">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M21 12a9 9 0 1 1-2.64-6.36" />
            <path d="M21 3.5V9h-5.5" />
          </svg>
        </button>

        <div className="lb-url">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="4" y="11" width="16" height="10" rx="1.5" />
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
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="2.5" y="4" width="19" height="13" rx="1.5" />
              <path d="M8.5 21h7M12 17v4" />
            </svg>
          </button>
          <button
            className={viewport === 'mobile' ? 'active' : ''}
            onClick={() => setViewport('mobile')}
            aria-label="Mobile view"
            title="Mobile"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="7" y="2.5" width="10" height="19" rx="1.8" />
              <path d="M11 18.2h2" />
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
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M15 3h6v6" />
            <path d="M10 14 21 3" />
            <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
          </svg>
        </a>
      </div>

      <div className={`lb-stage ${viewport}`}>
        <div className="lb-screen" key={`${site.domain}-${viewport}`}>
          {launched ? (
            <>
              <iframe
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
                  <span className="mono">Not loading</span>
                  <h4>{site.domain} isn&apos;t responding in the frame</h4>
                  <p>
                    It may block embedding, or it&apos;s slow right now. Open it in its own tab instead.
                  </p>
                  <div className="lb-stalled-actions">
                    <a href={site.url} target="_blank" rel="noopener noreferrer" className="btn btn-solid">
                      Open {site.domain}
                    </a>
                    <button className="btn btn-outline" onClick={reload}>Try again</button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="lb-splash">
              <span className="mono">{site.tagline}</span>
              <h3>{site.name}</h3>
              <p className="lb-splash-desc">{site.description}</p>
              <div className="lb-splash-stack">
                {site.stack.map(s => (
                  <span key={s} className="tag">{s}</span>
                ))}
              </div>
              <button className="btn btn-solid" onClick={() => open(active)}>
                Load live site
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
              <p className="lb-splash-hint">
                Loads the real site in this frame. Click through it without leaving the page.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="lb-caption">
        <span><strong>{site.name}</strong> — {site.tagline}</span>
        <a href={site.url} target="_blank" rel="noopener noreferrer" className="link-arrow">
          Open {site.domain}
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  )
}
