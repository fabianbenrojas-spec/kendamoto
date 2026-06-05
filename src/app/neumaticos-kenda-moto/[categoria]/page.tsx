import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { absoluteUrl } from '@/lib/site'
import { getProductsByCategory, formatPriceCLP, sizeToSlug, getDefaultSize } from '@/lib/products'
import { buildBreadcrumb, buildFAQ, buildCollectionPage } from '@/lib/schema'
import categories from '@/data/categories.json'
import type { CategoryData } from '@/lib/types'
import { CategorySeoBlock } from '@/components/sections/CategorySeoBlock'
import { CATEGORY_SEO_CONTENT } from '@/data/category-seo-content'
import { CategoryHeroImage } from '@/components/ui/CategoryHeroImage'
import { ProductCard } from '@/components/ui/ProductCard'

type TerrainCard = { terrain: string; icon: string; percentage: number; description: string; model: string }
type CompatMoto = { make: string; model: string; front: string; rear: string; cc: string }

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

        <CategoryHeroImage categoria={categoria} priority />

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
                if (!defaultSize) return null
                const priceFrom = Math.min(...product.sizes.map(s => s.priceCLP))
                return (
                  <ProductCard
                    key={product.slug}
                    slug={product.ref.toLowerCase()}
                    modelName={product.name}
                    categoria={categoria}
                    medidaSlug={sizeToSlug(defaultSize.medida)}
                    medidaLabel={defaultSize.medida}
                    posicion={defaultSize.position}
                    priceFrom={priceFrom}
                  />
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

      {/* Terrain cards */}
      {(cat as CategoryData & { terrainCards?: TerrainCard[] }).terrainCards && (
        <section style={{ padding: '64px 0', background: 'var(--cream)' }}>
          <div className="wrap">
            <div className="eyebrow mb-4">Uso por terreno</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(22px, 4vw, 36px)', textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: '32px' }}>
              ¿En qué terreno rinde mejor?
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
              {((cat as CategoryData & { terrainCards: TerrainCard[] }).terrainCards).map((tc) => (
                <div key={tc.terrain} style={{ background: 'white', border: '1px solid var(--line)', padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '15px', textTransform: 'uppercase', letterSpacing: '-0.01em' }}>{tc.terrain}</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '22px', color: 'var(--kenda)' }}>{tc.percentage}%</div>
                  </div>
                  <div style={{ height: '4px', background: 'var(--line)', marginBottom: '12px', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${tc.percentage}%`, background: 'var(--kenda)' }} />
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--muted)', lineHeight: 1.5, marginBottom: '8px' }}>{tc.description}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '11px', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--dim)' }}>{tc.model}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Popular sizes */}
      {(cat as CategoryData & { popularSizes?: string[] }).popularSizes?.length && (
        <section style={{ padding: '64px 0', background: 'var(--paper)' }}>
          <div className="wrap">
            <div className="eyebrow mb-4">Medidas</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(22px, 4vw, 36px)', textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: '8px' }}>
              Medidas disponibles
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--muted)', marginBottom: '28px' }}>
              Haz clic en una medida para ver todos los modelos disponibles en esa dimensión.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {((cat as CategoryData & { popularSizes: string[] }).popularSizes).map((size) => (
                <Link
                  key={size}
                  href={`/neumaticos-kenda-moto/medida/${size.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')}/`}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '13px',
                    letterSpacing: '0.04em',
                    padding: '10px 18px',
                    background: 'var(--cream)',
                    border: '1px solid var(--line)',
                    color: 'var(--text)',
                    textDecoration: 'none',
                    transition: 'all 0.15s',
                  }}
                >
                  {size}
                </Link>
              ))}
              <Link
                href="/neumaticos-kenda-moto/medida/"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '13px',
                  letterSpacing: '0.04em',
                  padding: '10px 18px',
                  background: 'transparent',
                  border: '1px solid var(--kenda)',
                  color: 'var(--kenda)',
                  textDecoration: 'none',
                }}
              >
                Ver todas →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Compatible motos */}
      {(cat as CategoryData & { compatibleMotos?: CompatMoto[] }).compatibleMotos?.length && (
        <section style={{ padding: '64px 0', background: 'var(--cream)' }}>
          <div className="wrap">
            <div className="eyebrow mb-4">Compatibilidad</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(22px, 4vw, 36px)', textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: '8px' }}>
              Motos compatibles
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--muted)', marginBottom: '28px' }}>
              Medidas recomendadas por modelo de moto. Verifica siempre el manual del fabricante.
            </p>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'var(--ink)', color: 'white' }}>
                    {['Moto', 'cc', 'Delantera', 'Trasera', ''].map(h => (
                      <th key={h} style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '12px 16px', textAlign: 'left' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {((cat as CategoryData & { compatibleMotos: CompatMoto[] }).compatibleMotos).map((m, i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? 'white' : 'var(--paper)', borderBottom: '1px solid var(--line)' }}>
                      <td style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px', padding: '14px 16px' }}>{m.make} {m.model}</td>
                      <td style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--muted)', padding: '14px 16px' }}>{m.cc} cc</td>
                      <td style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '13px', padding: '14px 16px', color: 'var(--kenda)' }}>{m.front}</td>
                      <td style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '13px', padding: '14px 16px', color: 'var(--kenda)' }}>{m.rear}</td>
                      <td style={{ padding: '14px 16px' }}>
                        <Link href={`/neumaticos-kenda-moto/medida/${m.front.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')}/`} style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '11px', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--kenda)', textDecoration: 'none' }}>Ver medida →</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Related categories */}
      {cat.relatedCategories && cat.relatedCategories.length > 0 && (
        <section style={{ padding: '48px 0', background: 'var(--paper)' }}>
          <div className="wrap">
            <div className="eyebrow mb-4">También puede interesarte</div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {cat.relatedCategories.map(slug => {
                const related = categories.find(c => c.slug === slug)
                if (!related) return null
                return (
                  <Link
                    key={slug}
                    href={`/neumaticos-kenda-moto/${slug}/`}
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: '13px',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      padding: '12px 20px',
                      background: 'var(--cream)',
                      border: '1px solid var(--line)',
                      color: 'var(--text)',
                      textDecoration: 'none',
                    }}
                  >
                    {related.name} →
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

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

      {CATEGORY_SEO_CONTENT[categoria] && (
        <CategorySeoBlock content={CATEGORY_SEO_CONTENT[categoria]} />
      )}

      {/* Quiz link */}
      <div style={{ background: 'var(--ink-2)', padding: '20px 0', borderTop: '1px solid var(--line-dark)' }}>
        <div className="wrap" style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--dim)' }}>
            ¿No estás seguro de la medida exacta para tu moto?
          </span>
          <Link
            href="/buscar-mi-neumatico/"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--kenda)', textDecoration: 'none', border: '1px solid rgba(227,6,19,0.4)', padding: '6px 14px' }}
          >
            Usar el buscador →
          </Link>
        </div>
      </div>

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
