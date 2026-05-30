import type { Metadata } from 'next'
import Link from 'next/link'
import { absoluteUrl } from '@/lib/site'
import { buildBreadcrumb } from '@/lib/schema'
import cities from '@/data/cities.json'

export const metadata: Metadata = {
  title: 'Neumáticos Moto Chile — Envío Gratis a Todo Chile | Kenda Moto',
  description:
    'Distribuidor oficial Kenda con envío gratis a las 16 regiones de Chile. Stock ZOFRI Iquique. Santiago, Concepción, Valparaíso, Temuco, Antofagasta y más.',
  alternates: { canonical: absoluteUrl('/neumaticos-moto-chile/') },
  openGraph: {
    title: 'Neumáticos Kenda Moto — Envío Gratis a Todo Chile',
    description: 'Distribuidor oficial Kenda con envío gratis a las 16 regiones. Stock permanente ZOFRI Iquique.',
    url: absoluteUrl('/neumaticos-moto-chile/'),
  },
}

const breadcrumb = buildBreadcrumb([
  { name: 'Inicio', url: absoluteUrl('/') },
  { name: 'Neumáticos Moto Chile', url: absoluteUrl('/neumaticos-moto-chile/') },
])

export default function NeumaticosMotoChilePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      {/* ── HERO ── */}
      <section style={{ background: 'var(--ink)', color: 'white', padding: '64px 0 48px' }}>
        <div className="wrap">
          <nav style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--dim)', marginBottom: '24px' }}>
            <Link href="/" style={{ color: 'var(--dim)', textDecoration: 'none' }}>Inicio</Link>
            {' › '}
            <span style={{ color: 'var(--dim)' }}>Neumáticos Moto Chile</span>
          </nav>

          <div className="eyebrow mb-4" style={{ color: 'var(--kenda)' }}>
            Cobertura nacional · 16 regiones
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(32px, 6vw, 60px)',
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
              lineHeight: 0.95,
              marginBottom: '20px',
            }}
          >
            Neumáticos Kenda<br />con Envío Gratis a Todo Chile
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
            Distribuidor oficial Kenda Tires® en Chile. Stock permanente de más de 200 referencias
            en bodega Zona Franca Iquique (ZOFRI). Envío gratis sin mínimo de compra a las
            16 regiones del país.
          </p>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
            {[
              { val: '+200', label: 'Referencias en stock' },
              { val: '16', label: 'Regiones con cobertura' },
              { val: 'Gratis', label: 'Envío a todo Chile' },
              { val: '25+', label: 'Años como distribuidor' },
            ].map(({ val, label }) => (
              <div key={label}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '26px', color: 'var(--kenda)' }}>
                  {val}
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--dim)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CIUDADES GRID ── */}
      <section style={{ padding: '64px 0', background: 'var(--paper)' }}>
        <div className="wrap">
          <div className="eyebrow mb-3">Selecciona tu ciudad</div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(24px, 4vw, 36px)',
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
              lineHeight: 1,
              marginBottom: '32px',
            }}
          >
            Despacho a todo el país
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '12px',
            }}
          >
            {cities.map(city => (
              <Link
                key={city.slug}
                href={`/neumaticos-moto-chile/${city.slug}/`}
                style={{ textDecoration: 'none' }}
              >
                <div
                  style={{
                    background: city.isSede ? 'var(--ink)' : 'var(--cream)',
                    color: city.isSede ? 'white' : 'var(--text)',
                    border: city.isSede ? '2px solid var(--kenda)' : '1px solid var(--line)',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    height: '100%',
                  }}
                >
                  {city.isSede && (
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
                      Sede principal · ZOFRI
                    </div>
                  )}
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 800,
                      fontSize: '22px',
                      textTransform: 'uppercase',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {city.name}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '12px',
                      color: city.isSede ? 'var(--dim)' : 'var(--muted)',
                    }}
                  >
                    {city.region}
                  </div>
                  {city.terrain && (
                    <div
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '11px',
                        color: city.isSede ? '#555' : 'var(--muted)',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {city.terrain}
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
                      marginTop: '8px',
                    }}
                  >
                    Entrega {city.deliveryDays} →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CÓMO FUNCIONA ── */}
      <section style={{ padding: '56px 0', background: 'var(--cream)', borderTop: '1px solid var(--line)' }}>
        <div className="wrap">
          <div className="eyebrow mb-3">Proceso de compra</div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(22px, 3vw, 32px)',
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
              lineHeight: 1,
              marginBottom: '32px',
            }}
          >
            Cómo recibir tu neumático Kenda
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '1px',
              background: 'var(--line)',
            }}
          >
            {[
              { n: '01', title: 'Elige tu neumático', desc: 'Busca por tipo de moto, categoría de terreno o medida exacta en el catálogo.' },
              { n: '02', title: 'Compra online o WhatsApp', desc: 'Pago seguro con tarjeta o transferencia. Hasta 12 cuotas sin interés.' },
              { n: '03', title: 'Sale de ZOFRI Iquique', desc: 'Despachamos el mismo día hábil si el pago llega antes de las 14h.' },
              { n: '04', title: 'Lo recibes en casa', desc: 'Entrega en 24-72h hábiles según región. Envío siempre gratis.' },
            ].map(({ n, title, desc }) => (
              <div key={n} style={{ background: 'white', padding: '24px 20px' }}>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 900,
                    fontSize: '36px',
                    color: 'var(--kenda)',
                    opacity: 0.25,
                    letterSpacing: '-0.02em',
                    lineHeight: 1,
                    marginBottom: '8px',
                  }}
                >
                  {n}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '14px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    marginBottom: '6px',
                  }}
                >
                  {title}
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--muted)', lineHeight: 1.6 }}>
                  {desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUIZ CTA ── */}
      <section style={{ padding: '48px 0', background: 'var(--ink)' }}>
        <div className="wrap" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}>
          <div>
            <div className="eyebrow mb-2" style={{ color: 'var(--kenda)' }}>Buscador inteligente</div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'clamp(20px, 3vw, 30px)',
                textTransform: 'uppercase',
                color: 'white',
                lineHeight: 1,
                marginBottom: '8px',
              }}
            >
              ¿No sabes qué medida necesitas?
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--dim)' }}>
              4 preguntas · Resultado exacto · Compatible con envío a toda Chile
            </p>
          </div>
          <Link href="/buscar-mi-neumatico/" className="btn-primary" style={{ whiteSpace: 'nowrap' }}>
            Encontrar mi neumático →
          </Link>
        </div>
      </section>

      {/* ── CATEGORÍAS ── */}
      <section style={{ padding: '56px 0', background: 'var(--paper)' }}>
        <div className="wrap">
          <div className="eyebrow mb-3">Neumáticos por tipo</div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(22px, 3vw, 32px)',
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
              lineHeight: 1,
              marginBottom: '24px',
            }}
          >
            Catálogo Kenda Moto Chile
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {[
              { slug: 'trail-adventure', label: 'Trail Adventure' },
              { slug: 'enduro', label: 'Enduro' },
              { slug: 'cross-motocross', label: 'Cross / Motocross' },
              { slug: 'dual-sport', label: 'Dual Sport' },
              { slug: 'calle-carretera', label: 'Calle / Carretera' },
              { slug: 'scooter', label: 'Scooter' },
            ].map(({ slug, label }) => (
              <Link
                key={slug}
                href={`/neumaticos-kenda-moto/${slug}/`}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '13px',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: 'var(--text)',
                  textDecoration: 'none',
                  background: 'var(--cream)',
                  border: '1px solid var(--line)',
                  padding: '8px 18px',
                }}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/neumaticos-kenda-moto/"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '13px',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'var(--kenda)',
                textDecoration: 'none',
                background: 'transparent',
                border: '1px solid rgba(227,6,19,0.35)',
                padding: '8px 18px',
              }}
            >
              Ver todo el catálogo →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
