'use client'

import { useState, useEffect } from 'react'

interface Heading { level: 2 | 3; text: string; id: string }

export function BlogTOC({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string>('')
  const [isCollapsed, setIsCollapsed] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting)
        if (visible.length > 0) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-20px 0px -60% 0px', threshold: 0 }
    )
    headings.forEach(h => {
      const el = document.getElementById(h.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [headings])

  if (headings.length < 2) return null

  return (
    <nav
      style={{
        position: 'sticky',
        top: '24px',
        background: 'var(--cream)',
        border: '1px solid var(--line)',
        padding: '0',
      }}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        style={{
          width: '100%',
          padding: '14px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          borderBottom: isCollapsed ? 'none' : '1px solid var(--line)',
        }}
      >
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text)' }}>
          Contenido
        </span>
        <span style={{ color: 'var(--muted)', fontSize: '14px' }}>{isCollapsed ? '+' : '−'}</span>
      </button>

      {!isCollapsed && (
        <ul style={{ listStyle: 'none', padding: '12px 0', margin: 0 }}>
          {headings.map(h => (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                onClick={e => {
                  e.preventDefault()
                  document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  setActiveId(h.id)
                }}
                style={{
                  display: 'block',
                  padding: `6px 20px 6px ${h.level === 3 ? '32px' : '20px'}`,
                  fontFamily: 'var(--font-body)',
                  fontSize: h.level === 2 ? '13px' : '12px',
                  fontWeight: activeId === h.id ? 700 : 400,
                  color: activeId === h.id ? 'var(--kenda)' : 'var(--muted)',
                  textDecoration: 'none',
                  lineHeight: 1.4,
                  borderLeft: activeId === h.id ? '2px solid var(--kenda)' : '2px solid transparent',
                  transition: 'all 0.15s',
                }}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  )
}
