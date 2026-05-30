import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { absoluteUrl } from '@/lib/site'
import { buildLocalBusinessSchema, buildBreadcrumb, buildFAQ } from '@/lib/schema'
import { getProducts, formatPriceCLP } from '@/lib/products'
import cities from '@/data/cities.json'
import categories from '@/data/categories.json'
import type { City } from '@/lib/types'

interface Props {
  params: Promise<{ ciudad: string }>
}

export async function generateStaticParams() {
  return cities.map(city => ({ ciudad: city.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ciudad } = await params
  const city = cities.find(c => c.slug === ciudad) as City | undefined
  if (!city) return {}

  return {
    title: `Neumáticos Moto ${city.name} — Kenda Chile | Envío en ${city.deliveryDays}`,
    description: city.description,
    alternates: { canonical: absoluteUrl(`/neumaticos-moto-chile/${ciudad}/`) },
    openGraph: {
      title: `Neumáticos Kenda para Moto en ${city.name} — Envío Gratis`,
      description: city.description,
      url: absoluteUrl(`/neumaticos-moto-chile/${ciudad}/`),
    },
  }
}

const CATEGORY_NAMES: Record<string, string> = {
  'trail-adventure':  'Trail Adventure',
  'enduro':           'Enduro',
  'cross-motocross':  'Cross / Motocross',
  'dual-sport':       'Dual Sport',
  'calle-carretera':  'Calle / Carretera',
  'scooter':          'Scooter',
  'supermoto-pista':  'Supermoto / Pista',
  'custom-chopper':   'Custom / Chopper',
}

export default async function CityPage({ params }: Props) {
  const { ciudad } = await params
  const city = cities.find(c => c.slug === ciudad) as City | undefined
  if (!city) notFound()

  const allProducts = await getProducts()

  const recommendedProducts = (city.recommendedRefs ?? [])
    .map(ref => allProducts.find(p => p.ref === ref))
    .filter(Boolean)

  const relevantCats = (city.relevantCategories ?? [])
    .map(slug => categories.find(c => c.slug === slug))
    .filter(Boolean)

  const breadcrumb = buildBreadcrumb([
    { name: 'Inicio', url: absoluteUrl('/') },
    { name: 'Neumáticos Moto Chile', url: absoluteUrl('/neumaticos-moto-chile/') },
    { name: city.name, url: absoluteUrl(`/neumaticos-moto-chile/${ciudad}/`) },
  ])

  const localBusiness = {
    ...buildLocalBusinessSchema(),
    areaServed: { '@type': 'City', name: city.name },
    name: `Kenda Moto Chile — ${city.name}`,
  }

  const faq = [
    {
      question: `¿Cuánto tarda el envío de neumáticos Kenda a ${city.name}?`,
      answer: `El envío de neumáticos Kenda a ${city.name} tarda ${city.deliveryDays}. Despachamos desde nuestra bodega en la Zona Franca de Iquique (ZOFRI) con cobertura a toda la región de ${city.region}. El envío es gratuito sin monto mínimo de compra.`,
    },
    {
      question: `¿Tienen stock de neumáticos Kenda para envío a ${city.name}?`,
      answer: `Sí, mantenemos stock permanente de más de 200 referencias Kenda para despacho inmediato a ${city.name} y toda la Región de ${city.region}. Al comprar, el pedido sale de bodega ZOFRI el mismo día hábil si el pago se confirma antes de las 14h.`,
    },
    {
      question: `¿Qué neumáticos Kenda son los más populares en ${city.name}?`,
      answer: `En ${city.name} y la región de ${city.region}, los modelos más solicitados son ${(city.recommendedRefs ?? ['K784', 'K761']).join(' y ')}. La elección depende del terreno local (${city.terrain ?? 'carretera y ripio'}). Usa nuestro buscador en /buscar-mi-neumatico/ para encontrar la medida exacta para tu moto.`,
    },
    {
      question: `¿Cuáles son los precios de los neumáticos Kenda con envío a ${city.name}?`,
      answer: `Los neumáticos Kenda para moto parten desde $49.990 CLP (enduro y cross) hasta $109.990 CLP (trail adventure aro 17"). El envío a ${city.name} es siempre gratis, IVA incluido. Aceptamos tarjetas de crédito con hasta 12 cuotas sin interés.`,
    },
    {
      question: `¿Puedo comprar neumáticos Kenda al por mayor para mi taller en ${city.name}?`,
      answer: `Sí, tenemos un Portal Mayoristas B2B para talleres y distribuidores en ${city.name} y la Región de ${city.region}. Ofrece precios especiales, emisión de factura electrónica y despacho consolidado. Regístrate en /mayoristas/registro-cuenta-pro/ o cotiza por WhatsApp.`,
    },
  ]

  const otherCities = cities.filter(c => c.slug !== ciudad)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFAQ(faq)) }} />

      {/* ── HERO ── */}
      <section style={{ background: 'var(--ink)', color: 'white', padding: '64px 0 48px' }}>
        <div className="wrap">
          <nav style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--dim)', marginBottom: '24px' }}>
            <Link href="/" style={{ color: 'var(--dim)', textDecoration: 'none' }}>Inicio</Link>
            {' › '}
            <Link href="/neumaticos-moto-chile/" style={{ color: 'var(--dim)', textDecoration: 'none' }}>Neumáticos Moto Chile</Link>
            {' › '}
            <span style={{ color: 'var(--dim)' }}>{city.name}</span>
          </nav>

          <div className="eyebrow mb-4" style={{ color: 'var(--kenda)' }}>
            Neumáticos Kenda · {city.region}
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(32px, 6vw, 60px)',
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
              lineHeight: 0.95,
              marginBottom: '16px',
            }}
          >
            {city.h1}
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              color: 'var(--dim)',
              maxWidth: '560px',
              lineHeight: 1.65,
              marginBottom: '32px',
            }}
          >
            {city.description}
          </p>

          {/* Stats strip */}
          <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '26px', color: 'var(--kenda)' }}>
                {city.deliveryDays}
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--dim)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                Tiempo de entrega
              </div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '26px', color: 'var(--kenda)' }}>
                Gratis
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--dim)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                Envío a {city.name}
              </div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '26px', color: 'var(--kenda)' }}>
                +200
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--dim)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                Referencias en stock
              </div>
            </div>
            {city.terrain && (
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px', color: 'white', marginBottom: '4px' }}>
                  {city.terrain}
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--dim)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                  Terreno local
                </div>
              </div>
            )}
          </div>

          {city.isSede && (
            <div
              style={{
                background: 'rgba(227,6,19,0.1)',
                border: '1px solid rgba(227,6,19,0.4)',
                padding: '12px 20px',
                marginTop: '32px',
                display: 'inline-flex',
                gap: '10px',
                alignItems: 'center',
              }}
            >
              <span style={{ color: 'var(--kenda)', fontSize: '18px' }}>📍</span>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', color: 'var(--kenda)', letterSpacing: '0.06em' }}>
                  Sede principal · ZOFRI Iquique
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--dim)', marginTop: '2px' }}>
                  Visita presencial con cita previa · Stock máximo disponible
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── SEO TEXT ── */}
      <section style={{ padding: '56px 0', background: 'var(--paper)' }}>
        <div className="wrap" style={{ maxWidth: '760px' }}>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(22px, 4vw, 34px)',
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
              lineHeight: 1,
              marginBottom: '20px',
            }}
          >
            Neumáticos Kenda para {city.name} — Terreno y Recomendaciones
          </h2>
          {city.seoText && (
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '15px',
                color: 'var(--muted)',
                lineHeight: 1.8,
                marginBottom: '32px',
              }}
            >
              {city.seoText}
            </p>
          )}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/neumaticos-kenda-moto/" className="btn-primary">
              Ver catálogo completo
            </Link>
            <Link href="/buscar-mi-neumatico/" className="btn-outline">
              Buscar mi neumático →
            </Link>
          </div>
        </div>
      </section>

      {/* ── PRODUCTOS RECOMENDADOS ── */}
      {recommendedProducts.length > 0 && (
        <section style={{ padding: '56px 0', background: 'var(--cream)' }}>
          <div className="wrap">
            <div className="eyebrow mb-3">Más solicitados en {city.name}</div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'clamp(22px, 4vw, 34px)',
                textTransform: 'uppercase',
                letterSpacing: '-0.01em',
                lineHeight: 1,
                marginBottom: '32px',
              }}
            >
              Modelos para el terreno de {city.region}
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                gap: '16px',
              }}
            >
              {recommendedProducts.map((product) => {
                if (!product) return null
                const minPrice = Math.min(...product.sizes.map(s => s.priceCLP))
                return (
                  <Link
                    key={product.ref}
                    href={`/neumaticos-kenda-moto/${product.category}/${product.slug}/`}
                    style={{ textDecoration: 'none' }}
                  >
                    <div
                      style={{
                        background: 'white',
                        border: '1px solid var(--line)',
                        padding: '24px 20px',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                      }}
                    >
                      <div
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 700,
                          fontSize: '10px',
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          color: 'var(--kenda)',
                        }}
                      >
                        {CATEGORY_NAMES[product.category] ?? product.category}
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 800,
                          fontSize: '22px',
                          textTransform: 'uppercase',
                          letterSpacing: '-0.01em',
                          color: 'var(--text)',
                          lineHeight: 1,
                        }}
                      >
                        {product.name}
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '13px',
                          color: 'var(--muted)',
                          lineHeight: 1.5,
                          flexGrow: 1,
                        }}
                      >
                        {product.tagline}
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 800,
                          fontSize: '18px',
                          color: 'var(--kenda)',
                          marginTop: '8px',
                        }}
                      >
                        Desde {formatPriceCLP(minPrice)}
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 700,
                          fontSize: '12px',
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase',
                          color: 'var(--text)',
                          marginTop: '4px',
                        }}
                      >
                        Ver medidas disponibles →
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── CATEGORÍAS RELEVANTES ── */}
      {relevantCats.length > 0 && (
        <section style={{ padding: '56px 0', background: 'var(--ink)' }}>
          <div className="wrap">
            <div className="eyebrow mb-3" style={{ color: 'var(--kenda)' }}>Por tipo de terreno</div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'clamp(22px, 4vw, 34px)',
                textTransform: 'uppercase',
                letterSpacing: '-0.01em',
                lineHeight: 1,
                color: 'white',
                marginBottom: '32px',
              }}
            >
              Categorías para riders de {city.name}
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                gap: '8px',
              }}
            >
              {relevantCats.map((cat) => {
                if (!cat) return null
                return (
                  <Link
                    key={cat.slug}
                    href={`/neumaticos-kenda-moto/${cat.slug}/`}
                    style={{ textDecoration: 'none' }}
                  >
                    <div
                      style={{
                        background: 'var(--ink-2)',
                        border: '1px solid var(--line-dark)',
                        padding: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px',
                        transition: 'border-color 0.15s',
                      }}
                    >
                      <div
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 800,
                          fontSize: '17px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.02em',
                          color: 'white',
                        }}
                      >
                        {cat.name}
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '12px',
                          color: 'var(--dim)',
                          lineHeight: 1.5,
                        }}
                      >
                        {cat.lead ?? cat.metaDescription}
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 700,
                          fontSize: '11px',
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          color: 'var(--kenda)',
                          marginTop: '6px',
                        }}
                      >
                        Ver modelos →
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── QUIZ CTA ── */}
      <section style={{ padding: '48px 0', background: 'var(--paper)', borderTop: '1px solid var(--line)' }}>
        <div className="wrap" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}>
          <div>
            <div className="eyebrow mb-2">Buscador inteligente</div>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'clamp(20px, 3vw, 28px)',
                textTransform: 'uppercase',
                lineHeight: 1,
                marginBottom: '8px',
              }}
            >
              ¿No sabes qué medida necesitas?
            </h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--muted)' }}>
              4 preguntas · Resultado exacto para tu moto · {city.name} y todo Chile
            </p>
          </div>
          <Link href="/buscar-mi-neumatico/" className="btn-primary" style={{ whiteSpace: 'nowrap' }}>
            Encontrar mi neumático →
          </Link>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: '56px 0', background: 'var(--cream)' }}>
        <div className="wrap" style={{ maxWidth: '760px' }}>
          <div className="eyebrow mb-4">Preguntas frecuentes</div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(20px, 3vw, 28px)',
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
              marginBottom: '24px',
              lineHeight: 1,
            }}
          >
            Envío a {city.name} — FAQ
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {faq.map((item, i) => (
              <details key={i} style={{ background: 'white', border: '1px solid var(--line)' }}>
                <summary
                  style={{
                    padding: '16px 20px',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '14px',
                    cursor: 'pointer',
                    listStyle: 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  {item.question}
                  <span style={{ color: 'var(--kenda)', flexShrink: 0, fontWeight: 400 }}>+</span>
                </summary>
                <div
                  style={{
                    padding: '0 20px 16px',
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

          <div style={{ marginTop: '32px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/mayoristas/" className="btn-outline" style={{ fontSize: '13px' }}>
              Portal Mayoristas B2B
            </Link>
            <Link
              href={`/neumaticos-kenda-moto/`}
              className="btn-ghost"
              style={{ fontSize: '13px' }}
            >
              Catálogo completo
            </Link>
          </div>
        </div>
      </section>

      {/* ── OTRAS CIUDADES ── */}
      <section style={{ padding: '48px 0', background: 'var(--ink)' }}>
        <div className="wrap">
          <div className="eyebrow mb-4" style={{ color: 'var(--kenda)' }}>Cobertura nacional</div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(20px, 3vw, 28px)',
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
              color: 'white',
              marginBottom: '24px',
              lineHeight: 1,
            }}
          >
            Envío gratis a todo Chile
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {otherCities.map(c => (
              <Link
                key={c.slug}
                href={`/neumaticos-moto-chile/${c.slug}/`}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  color: 'var(--dim)',
                  textDecoration: 'none',
                  background: 'var(--ink-2)',
                  border: '1px solid var(--line-dark)',
                  padding: '8px 16px',
                  display: 'flex',
                  gap: '8px',
                  alignItems: 'center',
                }}
              >
                <span style={{ color: 'white', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase' }}>
                  {c.name}
                </span>
                <span style={{ color: 'var(--kenda)', fontSize: '11px' }}>
                  {c.deliveryDays}
                </span>
              </Link>
            ))}
          </div>

          <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid var(--line-dark)' }}>
            <Link
              href="/neumaticos-moto-chile/"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '12px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--dim)',
                textDecoration: 'none',
              }}
            >
              Ver cobertura completa →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
