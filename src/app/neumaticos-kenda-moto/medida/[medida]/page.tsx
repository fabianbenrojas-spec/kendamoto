import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { absoluteUrl } from '@/lib/site'
import { buildBreadcrumb, buildProductSchema } from '@/lib/schema'
import { getProducts, sizeToSlug, formatPriceCLP } from '@/lib/products'
import type { Product, Size } from '@/lib/types'

type Props = { params: Promise<{ medida: string }> }

type Match = { product: Product; size: Size }

async function getMatchesForSlug(slug: string): Promise<Match[]> {
  const products = await getProducts()
  const matches: Match[] = []
  for (const product of products) {
    for (const size of product.sizes) {
      if (sizeToSlug(size.medida) === slug) {
        matches.push({ product, size })
      }
    }
  }
  return matches
}

export async function generateStaticParams() {
  const products = await getProducts()
  const slugs = new Set<string>()
  for (const product of products) {
    for (const size of product.sizes) {
      slugs.add(sizeToSlug(size.medida))
    }
  }
  return Array.from(slugs).map(medida => ({ medida }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { medida: slug } = await params
  const matches = await getMatchesForSlug(slug)
  if (!matches.length) return {}

  const medidaLabel = matches[0].size.medida
  const minPrice = Math.min(...matches.map(m => m.size.priceCLP))

  return {
    title: `Neumático Kenda ${medidaLabel} Chile — Precio y Compatibilidad | Kenda Moto`,
    description: `Neumáticos Kenda en medida ${medidaLabel} disponibles en Chile desde $${minPrice.toLocaleString('es-CL')}. ${matches.length > 1 ? `${matches.length} modelos disponibles.` : `Modelo ${matches[0].product.name}.`} Distribuidor oficial ZOFRI Iquique.`,
    alternates: { canonical: absoluteUrl(`/neumaticos-kenda-moto/medida/${slug}/`) },
  }
}

export default async function MedidaPage({ params }: Props) {
  const { medida: slug } = await params
  const matches = await getMatchesForSlug(slug)

  if (!matches.length) notFound()

  const medidaLabel = matches[0].size.medida
  const minPrice = Math.min(...matches.map(m => m.size.priceCLP))

  const breadcrumb = buildBreadcrumb([
    { name: 'Inicio', url: absoluteUrl('/') },
    { name: 'Neumáticos Kenda Moto', url: absoluteUrl('/neumaticos-kenda-moto/') },
    { name: 'Por Medida', url: absoluteUrl('/neumaticos-kenda-moto/medida/') },
    { name: medidaLabel, url: absoluteUrl(`/neumaticos-kenda-moto/medida/${slug}/`) },
  ])

  const productSchemas = matches.map(m =>
    buildProductSchema(m.product, m.size, m.product.category)
  )

  const allCompatMotos = Array.from(
    new Set(matches.flatMap(m => m.size.compatMotos ?? []))
  )

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {productSchemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <section style={{ background: 'var(--ink)', color: 'white', padding: '64px 0' }}>
        <div className="wrap">
          <div className="eyebrow mb-4" style={{ color: 'var(--kenda)' }}>Medida · {medidaLabel}</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(32px, 6vw, 64px)', textTransform: 'uppercase', letterSpacing: '-0.01em', lineHeight: 0.95 }}>
            Neumático Kenda {medidaLabel}
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'var(--dim)', maxWidth: '520px', lineHeight: 1.6, marginTop: '16px' }}>
            {matches.length === 1
              ? `${matches[0].product.name} disponible en medida ${medidaLabel}. Desde $${minPrice.toLocaleString('es-CL')}. Stock en ZOFRI Iquique.`
              : `${matches.length} modelos Kenda disponibles en medida ${medidaLabel}. Desde $${minPrice.toLocaleString('es-CL')}. Distribuidor oficial Chile.`
            }
          </p>
        </div>
      </section>

      <nav style={{ background: 'var(--cream)', borderBottom: '1px solid var(--line)', padding: '12px 0' }}>
        <div className="wrap" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--muted)' }}>
          <Link href="/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Inicio</Link>
          {' › '}
          <Link href="/neumaticos-kenda-moto/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Neumáticos Kenda Moto</Link>
          {' › '}
          <Link href="/neumaticos-kenda-moto/medida/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Por Medida</Link>
          {' › '}
          <span style={{ color: 'var(--text)' }}>{medidaLabel}</span>
        </div>
      </nav>

      <section style={{ padding: '48px 0', background: 'var(--paper)' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px', marginBottom: '48px' }}>
            {matches.map(({ product, size }) => (
              <div key={product.slug} style={{ background: 'var(--cream)', border: '2px solid var(--kenda)', padding: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--kenda)', marginBottom: '6px' }}>
                      {product.ref}
                    </div>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '22px', textTransform: 'uppercase', letterSpacing: '-0.01em', lineHeight: 1 }}>
                      {product.name}
                    </h2>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--muted)', marginTop: '4px' }}>{product.tagline}</div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: '12px' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '24px', color: 'var(--kenda)' }}>
                      {formatPriceCLP(size.priceCLP)}
                    </div>
                    {size.originalPriceCLP && (
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--muted)', textDecoration: 'line-through' }}>
                        {formatPriceCLP(size.originalPriceCLP)}
                      </div>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                  {[
                    size.position === 'delantera' ? '⬆ Delantera' : '⬇ Trasera',
                    ...size.type.map(t => t),
                    `Índice ${size.speedIndex}`,
                  ].map(tag => (
                    <span key={tag} style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', background: 'white', border: '1px solid var(--line)', padding: '3px 8px', color: 'var(--text)' }}>
                      {tag}
                    </span>
                  ))}
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', background: size.stock === 'in_stock' ? '#dcfce7' : '#fef9c3', border: `1px solid ${size.stock === 'in_stock' ? '#86efac' : '#fde68a'}`, padding: '3px 8px', color: size.stock === 'in_stock' ? '#166534' : '#92400e' }}>
                    {size.stock === 'in_stock' ? 'En stock' : size.stock === 'low_stock' ? 'Stock bajo' : 'Sin stock'}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <Link
                    href={`/neumaticos-kenda-moto/${product.category}/${product.slug}/${sizeToSlug(size.medida)}/`}
                    className="btn-primary"
                    style={{ fontSize: '13px', padding: '10px 20px' }}
                  >
                    Ver producto
                  </Link>
                  <a
                    href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP?.replace(/[^0-9]/g, '') ?? '56900000000'}?text=${encodeURIComponent(`Hola, quiero el ${product.name} en medida ${size.medida}. ¿Tienen stock?`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline"
                    style={{ fontSize: '13px', padding: '10px 20px' }}
                  >
                    WhatsApp →
                  </a>
                </div>
              </div>
            ))}
          </div>

          {allCompatMotos.length > 0 && (
            <div style={{ background: 'var(--cream)', border: '1px solid var(--line)', padding: '32px', marginBottom: '48px' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '20px', textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: '16px' }}>
                Motos compatibles con la medida {medidaLabel}
              </h2>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {allCompatMotos.map(moto => (
                  <span key={moto} style={{ fontFamily: 'var(--font-body)', fontSize: '13px', background: 'white', border: '1px solid var(--line)', padding: '6px 12px', color: 'var(--text)' }}>
                    {moto}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/neumaticos-kenda-moto/medida/" className="btn-outline">← Otras medidas</Link>
            <Link href="/neumaticos-kenda-moto/" className="btn-outline">Ver catálogo completo</Link>
          </div>
        </div>
      </section>
    </>
  )
}
