import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { absoluteUrl } from '@/lib/site'
import { getProductsByCategory, formatPriceCLP, sizeToSlug, getDefaultSize } from '@/lib/products'
import { buildBreadcrumb, buildFAQ, buildCollectionPage } from '@/lib/schema'
import categories from '@/data/categories.json'
import type { CategoryData } from '@/lib/types'

interface Props {
  params: Promise<{ categoria: string }>
}

export async function generateStaticParams() {
  return categories.map(cat => ({ categoria: cat.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoria } = await params
  const cat = categories.find(c => c.slug === categoria) as CategoryData | undefined
  if (!cat) return {}

  return {
    title: cat.metaTitle,
    description: cat.metaDescription,
    alternates: { canonical: absoluteUrl(`/neumaticos-kenda-moto/${categoria}/`) },
    openGraph: {
      title: cat.metaTitle,
      description: cat.metaDescription,
      url: absoluteUrl(`/neumaticos-kenda-moto/${categoria}/`),
    },
  }
}

export default async function CategoryPage({ params }: Props) {
  const { categoria } = await params
  const cat = categories.find(c => c.slug === categoria) as CategoryData | undefined
  if (!cat) notFound()

  const products = await getProductsByCategory(categoria)

  const breadcrumb = buildBreadcrumb([
    { name: 'Inicio', url: absoluteUrl('/') },
    { name: 'Neumáticos Kenda Moto', url: absoluteUrl('/neumaticos-kenda-moto/') },
    {
      name: cat.name,
      url: absoluteUrl(`/neumaticos-kenda-moto/${categoria}/`),
    },
  ])

  const collectionSchema = buildCollectionPage(
    cat.h1,
    absoluteUrl(`/neumaticos-kenda-moto/${categoria}/`),
    products.map(p => ({ slug: p.slug, name: p.name, categoria }))
  )

  const faqSchema = cat.faq ? buildFAQ(cat.faq) : null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Hero */}
      <section style={{ background: 'var(--ink)', color: 'white', padding: '64px 0 0' }}>
        <div className="wrap">
          <div className="eyebrow mb-4" style={{ color: 'var(--kenda)' }}>
            {cat.eyebrow ?? `Categoría · ${cat.name}`}
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(36px, 6vw, 72px)',
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
              lineHeight: 0.95,
              marginBottom: '16px',
            }}
          >
            {cat.h1}
          </h1>
          {cat.lead && (
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '16px',
                color: 'var(--dim)',
                maxWidth: '600px',
                lineHeight: 1.6,
                marginBottom: '24px',
              }}
            >
              {cat.lead}
            </p>
          )}

          {/* Stats */}
          {cat.stats && (
            <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', paddingBottom: '32px' }}>
              {cat.stats.map(stat => (
                <div key={stat.label}>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 800,
                      fontSize: '32px',
                      color: 'var(--kenda)',
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '11px',
                      color: 'var(--dim)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sub-nav categorías */}
        <div
          style={{
            borderTop: '1px solid var(--line-dark)',
            background: 'var(--ink-2)',
            overflowX: 'auto',
          }}
        >
          <div
            className="wrap"
            style={{
              display: 'flex',
              gap: '4px',
              padding: '12px var(--pad-x)',
              whiteSpace: 'nowrap',
            }}
          >
            {categories.map(c => (
              <Link
                key={c.slug}
                href={`/neumaticos-kenda-moto/${c.slug}/`}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '12px',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  padding: '6px 14px',
                  borderRadius: '99px',
                  textDecoration: 'none',
                  background: c.slug === categoria ? 'var(--kenda)' : 'transparent',
                  color: c.slug === categoria ? 'white' : 'var(--dim)',
                  border:
                    c.slug === categoria ? '1px solid var(--kenda)' : '1px solid var(--line-dark)',
                  transition: 'all 0.15s',
                }}
              >
                {c.name}
              </Link>
            ))}
          </div>
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
          <Link
            href="/neumaticos-kenda-moto/"
            style={{ color: 'var(--muted)', textDecoration: 'none' }}
          >
            Neumáticos Kenda Moto
          </Link>
          {' › '}
          <span style={{ color: 'var(--text)' }}>{cat.name}</span>
        </div>
      </nav>

      {/* Productos */}
      <section style={{ padding: '48px 0', background: 'var(--paper)' }}>
        <div className="wrap">
          <div
            style={{
              marginBottom: '24px',
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              color: 'var(--muted)',
            }}
          >
            {products.length} producto{products.length !== 1 ? 's' : ''} · {cat.name} · Kenda Chile
          </div>

          {products.length > 0 ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: '16px',
              }}
            >
              {products.map(product => {
                const defaultSize = product.sizes?.length > 0 ? getDefaultSize(product) : null
                const defaultSizeSlug = defaultSize ? sizeToSlug(defaultSize.medida) : null

                return (
                  <Link
                    key={product.slug}
                    href={
                      defaultSizeSlug
                        ? `/neumaticos-kenda-moto/${categoria}/${product.slug}/${defaultSizeSlug}/`
                        : `/neumaticos-kenda-moto/${categoria}/${product.slug}/`
                    }
                    style={{ textDecoration: 'none' }}
                  >
                    <div
                      style={{
                        background: 'white',
                        border: '1px solid var(--line)',
                        padding: '24px',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      {/* Placeholder */}
                      <div
                        style={{
                          background: 'var(--ink)',
                          height: '160px',
                          marginBottom: '20px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontFamily: 'var(--font-display)',
                          fontWeight: 800,
                          fontSize: '32px',
                          color: 'var(--kenda)',
                          letterSpacing: '0.04em',
                        }}
                      >
                        {product.ref}
                      </div>

                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 700,
                            fontSize: '12px',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            color: 'var(--kenda)',
                            marginBottom: '4px',
                          }}
                        >
                          Kenda {product.ref}
                        </div>
                        <div
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 800,
                            fontSize: '20px',
                            textTransform: 'uppercase',
                            letterSpacing: '-0.01em',
                            color: 'var(--text)',
                            marginBottom: '4px',
                          }}
                        >
                          {product.name}
                        </div>
                        <div
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '13px',
                            color: 'var(--muted)',
                            marginBottom: '12px',
                          }}
                        >
                          {product.tagline}
                        </div>
                        {product.sizes && (
                          <div
                            style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: '12px',
                              color: 'var(--dim)',
                            }}
                          >
                            {product.sizes.length} medida{product.sizes.length !== 1 ? 's' : ''}{' '}
                            disponibles
                          </div>
                        )}
                      </div>

                      <div
                        style={{
                          marginTop: '16px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-end',
                        }}
                      >
                        <div>
                          {defaultSize && (
                            <>
                              <div
                                style={{
                                  fontFamily: 'var(--font-body)',
                                  fontSize: '11px',
                                  color: 'var(--muted)',
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.06em',
                                }}
                              >
                                Desde
                              </div>
                              <div
                                style={{
                                  fontFamily: 'var(--font-display)',
                                  fontWeight: 800,
                                  fontSize: '22px',
                                  color: 'var(--text)',
                                }}
                              >
                                {formatPriceCLP(defaultSize.priceCLP)}
                              </div>
                            </>
                          )}
                        </div>
                        <span
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 700,
                            fontSize: '12px',
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            color: 'var(--kenda)',
                          }}
                        >
                          Ver →
                        </span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div
              style={{
                padding: '64px',
                textAlign: 'center',
                background: 'var(--cream)',
                border: '1px solid var(--line)',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '20px',
                  marginBottom: '12px',
                }}
              >
                Catálogo {cat.name} disponible próximamente
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  color: 'var(--muted)',
                  marginBottom: '20px',
                }}
              >
                Consulta disponibilidad y medidas específicas por WhatsApp.
              </p>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP?.replace(/[^0-9]/g, '') ?? '56900000000'}?text=${encodeURIComponent(`Hola, consulto por neumáticos Kenda ${cat.name}`)}`}
                className="btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Consultar por WhatsApp
              </a>
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      {cat.faq && cat.faq.length > 0 && (
        <section style={{ padding: '64px 0', background: 'var(--cream)' }}>
          <div className="wrap" style={{ maxWidth: '800px' }}>
            <div className="eyebrow mb-4">Preguntas frecuentes</div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'clamp(24px, 4vw, 40px)',
                textTransform: 'uppercase',
                letterSpacing: '-0.01em',
                lineHeight: 1,
                marginBottom: '32px',
              }}
            >
              FAQ — {cat.name}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
              {cat.faq.map((item, i) => (
                <details
                  key={i}
                  style={{ background: 'white', border: '1px solid var(--line)' }}
                >
                  <summary
                    style={{
                      padding: '18px 24px',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: '15px',
                      cursor: 'pointer',
                      listStyle: 'none',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    {item.question}
                    <span style={{ color: 'var(--kenda)', flexShrink: 0 }}>+</span>
                  </summary>
                  <div
                    style={{
                      padding: '0 24px 18px',
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      color: 'var(--muted)',
                      lineHeight: 1.7,
                    }}
                  >
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* B2B Banner */}
      <section style={{ background: 'var(--ink)', padding: '48px 0' }}>
        <div className="wrap">
          <div
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}
          >
            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '28px',
                  textTransform: 'uppercase',
                  color: 'white',
                }}
              >
                ¿Eres taller o distribuidor?
              </h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--dim)' }}>
                Precios mayoristas y cuenta B2B con factura electrónica.
              </p>
            </div>
            <Link href="/mayoristas/" className="btn-primary">
              Portal Mayoristas B2B
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
