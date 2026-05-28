import type { Metadata } from 'next'
import Link from 'next/link'
import { absoluteUrl } from '@/lib/site'
import { buildBreadcrumb } from '@/lib/schema'
import categories from '@/data/categories.json'

export const metadata: Metadata = {
  title: 'Neumáticos Kenda Moto Chile — Todas las Categorías | Kenda Moto',
  description:
    'Catálogo completo de neumáticos Kenda para moto en Chile. Enduro, trail adventure, motocross, dual sport, calle, scooter. Distribuidor oficial ZOFRI Iquique.',
  alternates: { canonical: absoluteUrl('/neumaticos-kenda-moto/') },
}

export default function NeumaticosCatalogPage() {
  const breadcrumb = buildBreadcrumb([
    { name: 'Inicio', url: absoluteUrl('/') },
    { name: 'Neumáticos Kenda Moto', url: absoluteUrl('/neumaticos-kenda-moto/') },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      {/* Hero */}
      <section style={{ background: 'var(--ink)', color: 'white', padding: '64px 0' }}>
        <div className="wrap">
          <div className="eyebrow mb-4" style={{ color: 'var(--kenda)' }}>
            Catálogo completo
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(36px, 6vw, 72px)',
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
              lineHeight: 0.95,
            }}
          >
            Neumáticos Kenda para Moto Chile
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '16px',
              color: 'var(--dim)',
              marginTop: '16px',
              maxWidth: '560px',
            }}
          >
            Más de 200 referencias en stock. Enduro, trail, motocross, calle y scooter.
            Distribuidor oficial Kenda — Iquique ZOFRI.
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <nav
        style={{
          background: 'var(--cream)',
          borderBottom: '1px solid var(--line)',
          padding: '12px 0',
        }}
      >
        <div
          className="wrap"
          style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--muted)' }}
        >
          <Link href="/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>
            Inicio
          </Link>
          {' › '}
          <span style={{ color: 'var(--text)' }}>Neumáticos Kenda Moto</span>
        </div>
      </nav>

      {/* Categories grid */}
      <section style={{ padding: '64px 0', background: 'var(--paper)' }}>
        <div className="wrap">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '2px',
            }}
          >
            {categories.map((cat, i) => (
              <Link
                key={cat.slug}
                href={`/neumaticos-kenda-moto/${cat.slug}/`}
                style={{ textDecoration: 'none' }}
              >
                <div
                  style={{
                    background: i === 1 ? 'var(--ink)' : 'var(--cream)',
                    color: i === 1 ? 'white' : 'var(--text)',
                    padding: '40px 32px',
                    minHeight: '200px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    border: '1px solid var(--line)',
                    transition: 'background 0.15s',
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 800,
                        fontSize: '28px',
                        textTransform: 'uppercase',
                        letterSpacing: '-0.01em',
                        marginBottom: '8px',
                      }}
                    >
                      {cat.name}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '13px',
                        color: i === 1 ? 'var(--dim)' : 'var(--muted)',
                        marginBottom: '8px',
                      }}
                    >
                      {cat.featuredModel}
                    </div>
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '12px',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--kenda)',
                    }}
                  >
                    {cat.products.length > 0 ? `${cat.products.length} modelos` : 'Consultar'} →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
