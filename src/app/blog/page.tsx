import type { Metadata } from 'next'
import Link from 'next/link'
import { absoluteUrl } from '@/lib/site'
import { getAllPosts } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Blog Kenda Moto Chile — Guías y Comparativas de Neumáticos',
  description:
    'Guías de compra, comparativas de neumáticos y consejos técnicos para motociclistas en Chile. Enduro, trail, motocross, calle y más.',
  alternates: { canonical: absoluteUrl('/blog/') },
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div style={{ background: 'var(--paper)', minHeight: '100vh' }}>
      <section style={{ background: 'var(--ink)', color: 'white', padding: '64px 0' }}>
        <div className="wrap">
          <div className="eyebrow mb-4" style={{ color: 'var(--kenda)' }}>Blog</div>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(36px, 6vw, 64px)',
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
              lineHeight: 0.95,
            }}
          >
            Guías y Comparativas Kenda Chile
          </h1>
        </div>
      </section>

      <section style={{ padding: '64px 0' }}>
        <div className="wrap">
          {posts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '64px', color: 'var(--muted)', fontFamily: 'var(--font-body)' }}>
              Artículos próximamente...
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
              {posts.map(post => (
                <Link key={post.slug} href={`/blog/${post.slug}/`} style={{ textDecoration: 'none' }}>
                  <div style={{ background: 'var(--cream)', border: '1px solid var(--line)', padding: '28px' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--kenda)', marginBottom: '8px' }}>
                      {post.category} · {post.readTime}
                    </div>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '22px', color: 'var(--text)', lineHeight: 1.2, marginBottom: '8px' }}>
                      {post.title}
                    </h2>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--muted)', lineHeight: 1.5 }}>
                      {post.description}
                    </p>
                    <div style={{ marginTop: '16px', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--kenda)' }}>
                      Leer artículo →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
