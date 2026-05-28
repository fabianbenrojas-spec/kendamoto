import type { Metadata } from 'next'
import Link from 'next/link'
import { absoluteUrl } from '@/lib/site'
import { buildBreadcrumb } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Cámaras de Aire Kenda para Moto Chile — Estándar y Reforzadas | Kenda Moto',
  description:
    'Cámaras de aire Kenda para moto en Chile. Estándar, reforzadas y scooter. Distribuidor oficial ZOFRI Iquique. Envío gratis a todo Chile.',
  alternates: { canonical: absoluteUrl('/camaras-aire-moto-kenda/') },
}

const tipos = [
  {
    slug: 'estandar',
    name: 'Cámaras Estándar',
    desc: 'Para uso general en moto de calle, trail y adventure. Compatible con aros de radios.',
    aros: 'Aro 16 · 17 · 18 · 19 · 21',
    icon: '⭕',
  },
  {
    slug: 'reforzada',
    name: 'Cámaras Reforzadas',
    desc: 'Mayor espesor de pared para enduro y off-road exigente. Resistencia superior a pinchazos.',
    aros: 'Aro 17 · 18 · 19 · 21',
    icon: '🛡️',
  },
  {
    slug: 'scooter',
    name: 'Cámaras Scooter',
    desc: 'Especiales para scooter con válvula angular de 90°. Aros 10, 12 y 13 pulgadas.',
    aros: 'Aro 10 · 12 · 13',
    icon: '🛵',
  },
]

export default function CamarasPage() {
  const breadcrumb = buildBreadcrumb([
    { name: 'Inicio', url: absoluteUrl('/') },
    { name: 'Cámaras de Aire Kenda', url: absoluteUrl('/camaras-aire-moto-kenda/') },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <section style={{ background: 'var(--ink)', color: 'white', padding: '64px 0' }}>
        <div className="wrap">
          <div className="eyebrow mb-4" style={{ color: 'var(--kenda)' }}>
            Cámaras de Aire · Kenda
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
            Cámaras de Aire Kenda para Moto Chile
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '16px',
              color: 'var(--dim)',
              maxWidth: '560px',
              lineHeight: 1.6,
            }}
          >
            Cámaras de aire Kenda originales para moto en Chile. Estándar, reforzadas y scooter.
            Importación directa ZOFRI Iquique. Envío gratis a todo Chile.
          </p>
        </div>
      </section>

      <nav style={{ background: 'var(--cream)', borderBottom: '1px solid var(--line)', padding: '12px 0' }}>
        <div className="wrap" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--muted)' }}>
          <Link href="/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Inicio</Link>
          {' › '}
          <span style={{ color: 'var(--text)' }}>Cámaras de Aire Kenda</span>
        </div>
      </nav>

      <section style={{ padding: '64px 0', background: 'var(--paper)' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {tipos.map(tipo => (
              <Link key={tipo.slug} href={`/camaras-aire-moto-kenda/${tipo.slug}/`} style={{ textDecoration: 'none' }}>
                <div
                  style={{
                    background: 'var(--cream)',
                    border: '1px solid var(--line)',
                    padding: '40px 32px',
                    minHeight: '220px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '32px', marginBottom: '16px' }}>{tipo.icon}</div>
                    <div
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 800,
                        fontSize: '24px',
                        textTransform: 'uppercase',
                        letterSpacing: '-0.01em',
                        marginBottom: '8px',
                      }}
                    >
                      {tipo.name}
                    </div>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--muted)', lineHeight: 1.5 }}>
                      {tipo.desc}
                    </p>
                  </div>
                  <div style={{ marginTop: '16px' }}>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--dim)', marginBottom: '8px' }}>
                      {tipo.aros}
                    </div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--kenda)' }}>
                      Ver cámaras →
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ marginTop: '64px', background: 'var(--cream)', border: '1px solid var(--line)', padding: '40px' }}>
            <div className="eyebrow mb-4">¿No encuentras tu medida?</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '28px', textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: '12px' }}>
              Consulta disponibilidad por WhatsApp
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--muted)', marginBottom: '24px', maxWidth: '560px' }}>
              Tenemos más de 80 medidas de cámaras Kenda en stock. Si no encuentras la tuya, escríbenos con el tamaño del aro y tipo de válvula (recto o angular).
            </p>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP?.replace(/[^0-9]/g, '') ?? '56900000000'}?text=${encodeURIComponent('Hola, necesito una cámara de aire Kenda para moto. ¿Pueden ayudarme?')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
