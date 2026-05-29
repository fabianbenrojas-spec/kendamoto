import Link from 'next/link'
import { sizeToSlug, formatPriceCLP } from '@/lib/products'
import type { Product } from '@/lib/types'

interface Props {
  products: Product[]
  categoria: string
}

export function RelatedProducts({ products, categoria }: Props) {
  if (products.length === 0) return null

  const categoriaLabel = categoria
    .split('-')
    .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')

  return (
    <section style={{ padding: '64px 0', background: 'var(--paper)' }}>
      <div className="wrap">
        <div className="eyebrow mb-4">Misma categoría</div>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(24px, 3vw, 36px)',
            textTransform: 'uppercase',
            letterSpacing: '-0.01em',
            marginBottom: '24px',
          }}
        >
          Otros modelos {categoriaLabel}
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '16px',
            marginBottom: '24px',
          }}
        >
          {products.map(p => {
            const defSize = p.sizes?.[0]
            const defSlug = defSize ? sizeToSlug(defSize.medida) : null
            const href = defSlug
              ? `/neumaticos-kenda-moto/${categoria}/${p.slug}/${defSlug}/`
              : `/neumaticos-kenda-moto/${categoria}/${p.slug}/`
            const minPrice = p.sizes && p.sizes.length > 0
              ? Math.min(...p.sizes.map(s => s.priceCLP))
              : null

            return (
              <Link key={p.slug} href={href} style={{ textDecoration: 'none' }}>
                <div
                  style={{
                    background: 'white',
                    border: '1px solid var(--line)',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    height: '100%',
                    transition: 'border-color 0.15s',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: '11px',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--kenda)',
                    }}
                  >
                    Kenda {p.ref}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 800,
                      fontSize: '20px',
                      textTransform: 'uppercase',
                      letterSpacing: '-0.01em',
                      color: 'var(--text)',
                    }}
                  >
                    {p.name}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '13px',
                      color: 'var(--muted)',
                      flex: 1,
                    }}
                  >
                    {p.tagline}
                  </div>
                  {p.sizes && (
                    <div
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '12px',
                        color: 'var(--dim)',
                      }}
                    >
                      {p.sizes.length} medida{p.sizes.length !== 1 ? 's' : ''}
                    </div>
                  )}
                  {minPrice !== null && (
                    <div
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 800,
                        fontSize: '16px',
                        color: 'var(--text)',
                      }}
                    >
                      Desde {formatPriceCLP(minPrice)}
                    </div>
                  )}
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: '12px',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'var(--kenda)',
                    }}
                  >
                    Ver modelo →
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        <Link
          href={`/neumaticos-kenda-moto/${categoria}/`}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            color: 'var(--kenda)',
            textDecoration: 'none',
            borderBottom: '1px solid var(--kenda)',
            paddingBottom: '2px',
          }}
        >
          ← Ver todos los neumáticos {categoriaLabel}
        </Link>
      </div>
    </section>
  )
}
