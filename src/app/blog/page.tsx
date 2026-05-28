import type { Metadata } from 'next'
import { absoluteUrl } from '@/lib/site'
import { getAllPosts } from '@/lib/blog'
import { BlogFilter } from '@/components/blog/BlogFilter'

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
      <section style={{ background: 'var(--ink)', color: 'white', padding: '64px 0 48px' }}>
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
              marginBottom: '16px',
            }}
          >
            Guías y Comparativas<br />Kenda Chile
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--dim)', maxWidth: '480px', lineHeight: 1.6 }}>
            {posts.length} artículos sobre neumáticos para moto: comparativas, guías de compra, técnica de terrenos y consejos desde ZOFRI Iquique.
          </p>
        </div>
      </section>

      <section style={{ padding: '48px 0 80px' }}>
        <div className="wrap">
          {posts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '64px', color: 'var(--muted)', fontFamily: 'var(--font-body)' }}>
              Artículos próximamente...
            </div>
          ) : (
            <BlogFilter posts={posts} />
          )}
        </div>
      </section>
    </div>
  )
}
