import type { Metadata } from 'next'
import Link from 'next/link'
import { absoluteUrl } from '@/lib/site'
import { buildBreadcrumb } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Cámaras de Aire Scooter Kenda Chile — Aro 10 12 13 | Kenda Moto',
  description:
    'Cámaras de aire Kenda para scooter en Chile. Aros 10, 12 y 13 pulgadas. Válvula angular 90°. Distribuidor oficial ZOFRI Iquique. Envío gratis.',
  alternates: { canonical: absoluteUrl('/camaras-aire-moto-kenda/scooter/') },
}

const medidas = [
  { medida: '3.00-10', aro: '10', price: 5990 },
  { medida: '3.50-10', aro: '10', price: 6490 },
  { medida: '3.00-12', aro: '12', price: 6990 },
  { medida: '3.50-12', aro: '12', price: 7490 },
  { medida: '100/90-12', aro: '12', price: 7990 },
  { medida: '110/70-12', aro: '12', price: 7990 },
  { medida: '120/70-12', aro: '12', price: 8490 },
  { medida: '130/70-12', aro: '12', price: 8490 },
  { medida: '110/70-13', aro: '13', price: 8990 },
  { medida: '120/70-13', aro: '13', price: 9490 },
]

export default function CamarasScooterPage() {
  const breadcrumb = buildBreadcrumb([
    { name: 'Inicio', url: absoluteUrl('/') },
    { name: 'Cámaras de Aire Kenda', url: absoluteUrl('/camaras-aire-moto-kenda/') },
    { name: 'Scooter', url: absoluteUrl('/camaras-aire-moto-kenda/scooter/') },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <section style={{ background: 'var(--ink)', color: 'white', padding: '48px 0' }}>
        <div className="wrap">
          <div className="eyebrow mb-4" style={{ color: 'var(--kenda)' }}>Cámaras Kenda · Scooter</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(32px, 5vw, 60px)', textTransform: 'uppercase', letterSpacing: '-0.01em', lineHeight: 0.95 }}>
            Cámaras de Aire Scooter Kenda Chile
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'var(--dim)', maxWidth: '520px', lineHeight: 1.6, marginTop: '16px' }}>
            Cámaras originales Kenda para scooter en aros 10, 12 y 13 pulgadas. Válvula angular de 90°. Compatibles con los principales scooters disponibles en Chile.
          </p>
        </div>
      </section>

      <nav style={{ background: 'var(--cream)', borderBottom: '1px solid var(--line)', padding: '12px 0' }}>
        <div className="wrap" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--muted)' }}>
          <Link href="/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Inicio</Link>
          {' › '}
          <Link href="/camaras-aire-moto-kenda/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Cámaras de Aire Kenda</Link>
          {' › '}
          <span style={{ color: 'var(--text)' }}>Scooter</span>
        </div>
      </nav>

      <section style={{ padding: '48px 0', background: 'var(--paper)' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '8px' }}>
            {medidas.map(m => (
              <div key={m.medida} style={{ background: 'var(--cream)', border: '1px solid var(--line)', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px' }}>{m.medida}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--muted)' }}>Aro {m.aro} · Válvula 90°</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '16px' }}>
                    ${m.price.toLocaleString('es-CL')}
                  </div>
                  <a
                    href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP?.replace(/[^0-9]/g, '') ?? '56900000000'}?text=${encodeURIComponent(`Hola, necesito una cámara Kenda scooter medida ${m.medida}. ¿Tienen stock?`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--kenda)', textDecoration: 'none' }}
                  >
                    Pedir →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
