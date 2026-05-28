'use client'

import Link from 'next/link'

interface Product {
  ref: string
  name: string
  href: string
  tagline: string
}

interface RelatedPost {
  slug: string
  category: string
  readTime: string
  title: string
}

export function BlogRelatedProducts({ products }: { products: Product[] }) {
  if (!products || products.length === 0) return null
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
      {products.map(prod => (
        <Link key={prod.ref + prod.name} href={prod.href} style={{ textDecoration: 'none' }}>
          <div
            style={{
              background: 'white',
              border: '1px solid var(--line)',
              padding: '24px',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              transition: 'border-color 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--kenda)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--line)')}
          >
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--kenda)' }}>
              Kenda {prod.ref}
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '22px', textTransform: 'uppercase', letterSpacing: '-0.01em', color: 'var(--text)' }}>
              {prod.name}
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--muted)', flex: 1 }}>
              {prod.tagline}
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--kenda)', marginTop: '8px' }}>
              Ver precio y medidas →
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export function BlogRelatedPosts({ posts }: { posts: RelatedPost[] }) {
  if (!posts || posts.length === 0) return null
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
      {posts.map(rp => (
        <Link key={rp.slug} href={`/blog/${rp.slug}/`} style={{ textDecoration: 'none' }}>
          <div
            style={{ background: 'var(--cream)', border: '1px solid var(--line)', borderLeft: '3px solid transparent', padding: '24px', height: '100%', display: 'flex', flexDirection: 'column', gap: '8px', transition: 'border-left-color 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.borderLeftColor = 'var(--kenda)')}
            onMouseLeave={e => (e.currentTarget.style.borderLeftColor = 'transparent')}
          >
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--kenda)' }}>
              {rp.category} · {rp.readTime}
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '18px', color: 'var(--text)', lineHeight: 1.2, flex: 1 }}>
              {rp.title}
            </h3>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--kenda)' }}>
              Leer →
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}
