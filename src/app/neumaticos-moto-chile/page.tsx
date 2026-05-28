import type { Metadata } from 'next'
import Link from 'next/link'
import { absoluteUrl } from '@/lib/site'
import cities from '@/data/cities.json'

export const metadata: Metadata = {
  title: 'Neumáticos Moto Chile — Envío Gratis a Todo Chile | Kenda Moto',
  description:
    'Distribuidor oficial Kenda con envío gratis a las 16 regiones de Chile. Iquique ZOFRI, Santiago, Concepción, Valparaíso, Temuco y más.',
  alternates: { canonical: absoluteUrl('/neumaticos-moto-chile/') },
}

export default function NeumaticosMotoChilePage() {
  return (
    <section style={{ padding: '64px 0', background: 'var(--paper)' }}>
      <div className="wrap">
        <div className="eyebrow mb-4">Cobertura Nacional</div>
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
          Neumáticos Moto Chile — Envío Gratis a Todo Chile
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '16px',
            color: 'var(--muted)',
            maxWidth: '560px',
            lineHeight: 1.6,
            marginBottom: '48px',
          }}
        >
          Distribuidor oficial Kenda con envío gratis a las 16 regiones de Chile. Stock permanente
          en bodega ZOFRI Iquique.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '16px',
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
                  padding: '28px 24px',
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
                      marginBottom: '8px',
                    }}
                  >
                    Sede · ZOFRI
                  </div>
                )}
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: '22px',
                    textTransform: 'uppercase',
                    letterSpacing: '-0.01em',
                    marginBottom: '4px',
                  }}
                >
                  {city.name}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    color: city.isSede ? 'var(--dim)' : 'var(--muted)',
                    marginBottom: '12px',
                  }}
                >
                  {city.region}
                </div>
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
                  Entrega: {city.deliveryDays} →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
