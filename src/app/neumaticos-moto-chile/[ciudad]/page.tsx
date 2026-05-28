import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { absoluteUrl } from '@/lib/site'
import { buildLocalBusinessSchema, buildBreadcrumb, buildFAQ } from '@/lib/schema'
import cities from '@/data/cities.json'
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
  }
}

export default async function CityPage({ params }: Props) {
  const { ciudad } = await params
  const city = cities.find(c => c.slug === ciudad) as City | undefined
  if (!city) notFound()

  const breadcrumb = buildBreadcrumb([
    { name: 'Inicio', url: absoluteUrl('/') },
    { name: 'Neumáticos Moto Chile', url: absoluteUrl('/neumaticos-moto-chile/') },
    { name: city.name, url: absoluteUrl(`/neumaticos-moto-chile/${ciudad}/`) },
  ])

  const localBusiness = {
    ...buildLocalBusinessSchema(),
    areaServed: { '@type': 'City', name: city.name, '@id': `https://www.wikidata.org/wiki/${city.name}` },
    name: `Kenda Moto Chile — ${city.name}`,
  }

  const faq = [
    {
      question: `¿Cuánto tarda el envío de neumáticos Kenda a ${city.name}?`,
      answer: `El envío de neumáticos Kenda a ${city.name} tarda ${city.deliveryDays}. Despachamos desde nuestra bodega en la Zona Franca de Iquique (ZOFRI) con cobertura a toda la región de ${city.region}.`,
    },
    {
      question: `¿Tienen stock de neumáticos Kenda para envío a ${city.name}?`,
      answer: `Sí, mantenemos stock permanente de más de 200 referencias Kenda para despacho inmediato a ${city.name} y toda la Región de ${city.region}. El envío es gratis sin mínimo de compra.`,
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFAQ(faq)) }}
      />

      {/* Hero */}
      <section style={{ background: 'var(--ink)', color: 'white', padding: '64px 0' }}>
        <div className="wrap">
          <div className="eyebrow mb-4" style={{ color: 'var(--kenda)' }}>
            Neumáticos Kenda · {city.region}
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(32px, 6vw, 64px)',
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
              fontSize: '16px',
              color: 'var(--dim)',
              maxWidth: '560px',
              lineHeight: 1.6,
              marginBottom: '24px',
            }}
          >
            {city.description}
          </p>
          <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '28px', color: 'var(--kenda)' }}>
                {city.deliveryDays}
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--dim)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Tiempo de entrega
              </div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '28px', color: 'var(--kenda)' }}>
                Gratis
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--dim)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Envío a {city.name}
              </div>
            </div>
            {city.terrain && (
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px', color: 'white' }}>
                  {city.terrain}
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--dim)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Terreno local
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <nav style={{ background: 'var(--cream)', borderBottom: '1px solid var(--line)', padding: '12px 0' }}>
        <div className="wrap" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--muted)' }}>
          <Link href="/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Inicio</Link>
          {' › '}
          <Link href="/neumaticos-moto-chile/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Neumáticos Moto Chile</Link>
          {' › '}
          <span style={{ color: 'var(--text)' }}>{city.name}</span>
        </div>
      </nav>

      {/* Content */}
      <section style={{ padding: '64px 0', background: 'var(--paper)' }}>
        <div className="wrap" style={{ maxWidth: '800px' }}>
          {city.isSede && (
            <div
              style={{
                background: 'var(--kenda-tint)',
                border: '1px solid var(--kenda)',
                padding: '16px 24px',
                marginBottom: '32px',
                display: 'flex',
                gap: '12px',
                alignItems: 'center',
              }}
            >
              <span style={{ fontSize: '20px' }}>📍</span>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px', textTransform: 'uppercase', color: 'var(--kenda)' }}>
                  Sede principal
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--muted)' }}>
                  Nuestra bodega central está ubicada en la Zona Franca de Iquique (ZOFRI). Visita presencial con cita previa.
                </div>
              </div>
            </div>
          )}

          {city.localContent && (
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '16px',
                color: 'var(--text)',
                lineHeight: 1.8,
                marginBottom: '40px',
              }}
            >
              {city.localContent}
            </div>
          )}

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '40px' }}>
            <Link href="/neumaticos-kenda-moto/" className="btn-primary">
              Ver catálogo completo
            </Link>
            <Link href="/mayoristas/" className="btn-outline">
              Portal mayoristas B2B
            </Link>
          </div>

          {/* FAQ */}
          <div className="eyebrow mb-4">Preguntas frecuentes</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
            {faq.map((item, i) => (
              <details key={i} style={{ background: 'var(--cream)', border: '1px solid var(--line)' }}>
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
                  }}
                >
                  {item.question}
                  <span style={{ color: 'var(--kenda)', flexShrink: 0 }}>+</span>
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
        </div>
      </section>

      {/* Otras ciudades */}
      <section style={{ padding: '48px 0', background: 'var(--cream)' }}>
        <div className="wrap">
          <div className="eyebrow mb-4">Cobertura nacional</div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: '28px',
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
              marginBottom: '24px',
            }}
          >
            Envío a todo Chile
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {cities.filter(c => c.slug !== ciudad).map(c => (
              <Link
                key={c.slug}
                href={`/neumaticos-moto-chile/${c.slug}/`}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  color: 'var(--text)',
                  textDecoration: 'none',
                  background: 'white',
                  border: '1px solid var(--line)',
                  padding: '6px 14px',
                }}
              >
                {c.name} · {c.deliveryDays}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
