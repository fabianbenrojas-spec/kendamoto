'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { BlogPost } from '@/lib/blog'

const CATEGORIES = [
  { id: 'todos', label: 'Todos' },
  { id: 'guias', label: 'Guías' },
  { id: 'comparativas', label: 'Comparativas' },
  { id: 'terrenos-chile', label: 'Terrenos Chile' },
  { id: 'mantenimiento', label: 'Mantenimiento' },
]

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString('es-CL', { year: 'numeric', month: 'long' })
  } catch { return dateStr }
}

export function BlogFilter({ posts }: { posts: BlogPost[] }) {
  const [active, setActive] = useState('todos')

  const filtered = active === 'todos' ? posts : posts.filter(p => p.category === active)
  const featured = posts.find(p => p.featured)
  const rest = filtered.filter(p => !p.featured || active !== 'todos')
  const displayPosts = active === 'todos' ? filtered.filter(p => !p.featured) : filtered

  return (
    <div>
      {/* Featured hero article (only on "Todos") */}
      {active === 'todos' && featured && (
        <Link href={`/blog/${featured.slug}/`} style={{ textDecoration: 'none', display: 'block', marginBottom: '40px' }}>
          <div
            style={{
              background: 'var(--ink)',
              color: 'white',
              padding: '48px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '32px',
              alignItems: 'center',
              borderLeft: '4px solid var(--kenda)',
            }}
            onMouseEnter={e => (e.currentTarget.style.borderLeftWidth = '8px')}
            onMouseLeave={e => (e.currentTarget.style.borderLeftWidth = '4px')}
          >
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--kenda)', marginBottom: '12px' }}>
                Artículo destacado · {featured.category} · {featured.readTime}
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(24px, 4vw, 40px)', textTransform: 'uppercase', letterSpacing: '-0.01em', lineHeight: 1, marginBottom: '16px' }}>
                {featured.title}
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--dim)', lineHeight: 1.6, marginBottom: '20px' }}>
                {featured.description}
              </p>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '13px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--kenda)' }}>
                Leer artículo →
              </span>
            </div>
            {featured.keyPoints && featured.keyPoints.length > 0 && (
              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: '24px' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--kenda)', marginBottom: '12px' }}>
                  Puntos clave
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {featured.keyPoints.slice(0, 3).map((pt, i) => (
                    <li key={i} style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.75)', display: 'flex', gap: '8px', lineHeight: 1.4 }}>
                      <span style={{ color: 'var(--kenda)', flexShrink: 0 }}>→</span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Link>
      )}

      {/* Category filter */}
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '32px' }}>
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActive(cat.id)}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '12px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '8px 16px',
              background: active === cat.id ? 'var(--ink)' : 'transparent',
              color: active === cat.id ? 'white' : 'var(--muted)',
              border: active === cat.id ? '1px solid var(--ink)' : '1px solid var(--line-2)',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Articles grid */}
      {displayPosts.length === 0 ? (
        <div style={{ padding: '48px', textAlign: 'center', fontFamily: 'var(--font-body)', color: 'var(--muted)' }}>
          No hay artículos en esta categoría aún.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
          {displayPosts.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}/`} style={{ textDecoration: 'none' }}>
              <div
                style={{
                  background: 'var(--cream)',
                  border: '1px solid var(--line)',
                  borderLeft: '3px solid transparent',
                  padding: '28px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'border-left-color 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.borderLeftColor = 'var(--kenda)')}
                onMouseLeave={e => (e.currentTarget.style.borderLeftColor = 'transparent')}
              >
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--kenda)', marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>{post.category}</span>
                  <span style={{ color: 'var(--dim)', fontWeight: 400 }}>{post.readTime}</span>
                </div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '20px', color: 'var(--text)', lineHeight: 1.2, marginBottom: '10px', flex: 'none' }}>
                  {post.title}
                </h2>
                {post.tldr ? (
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--muted)', lineHeight: 1.55, flex: 1, marginBottom: '16px' }}>
                    {post.tldr.length > 120 ? post.tldr.slice(0, 117) + '…' : post.tldr}
                  </p>
                ) : (
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--muted)', lineHeight: 1.55, flex: 1, marginBottom: '16px' }}>
                    {post.description}
                  </p>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--dim)' }}>{formatDate(post.date)}</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--kenda)' }}>Leer →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
