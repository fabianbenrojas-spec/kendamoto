import type { Metadata } from 'next'
import Link from 'next/link'
import { absoluteUrl } from '@/lib/site'
import { buildBreadcrumb } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Cámaras de Aire Reforzadas Kenda Moto Chile — Enduro Off-Road | Kenda Moto',
  description:
    'Cámaras Kenda reforzadas para enduro y off-road en Chile. Mayor espesor, máxima resistencia a pinchazos. Aros 17, 18, 19 y 21. Distribuidor oficial ZOFRI Iquique.',
  alternates: { canonical: absoluteUrl('/camaras-aire-moto-kenda/reforzada/') },
}

const medidas = [
  { medida: '80/100-21', aro: '21', price: 14990, stock: 'in_stock' },
  { medida: '90/90-21', aro: '21', price: 14990, stock: 'in_stock' },
  { medida: '90/100-21', aro: '21', price: 14990, stock: 'in_stock' },
  { medida: '100/90-19', aro: '19', price: 15990, stock: 'in_stock' },
  { medida: '110/100-18', aro: '18', price: 16490, stock: 'in_stock' },
  { medida: '120/100-18', aro: '18', price: 16990, stock: 'in_stock' },
  { medida: '140/80-18', aro: '18', price: 17490, stock: 'low_stock' },
  { medida: '150/70 R17', aro: '17', price: 17990, stock: 'in_stock' },
]

export default function CamarasReforzadaPage() {
  const breadcrumb = buildBreadcrumb([
    { name: 'Inicio', url: absoluteUrl('/') },
    { name: 'Cámaras de Aire Kenda', url: absoluteUrl('/camaras-aire-moto-kenda/') },
    { name: 'Reforzadas', url: absoluteUrl('/camaras-aire-moto-kenda/reforzada/') },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <section style={{ background: 'var(--ink)', color: 'white', padding: '48px 0' }}>
        <div className="wrap">
          <div className="eyebrow mb-4" style={{ color: 'var(--kenda)' }}>Cámaras Kenda · Reforzadas</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(32px, 5vw, 60px)', textTransform: 'uppercase', letterSpacing: '-0.01em', lineHeight: 0.95 }}>
            Cámaras Reforzadas Kenda — Enduro y Off-Road Chile
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'var(--dim)', maxWidth: '520px', lineHeight: 1.6, marginTop: '16px' }}>
            Mayor espesor de pared para máxima resistencia en enduro, motocross y off-road. Para KTM EXC, Husqvarna FE, Beta RR y similares.
          </p>
        </div>
      </section>

      <nav style={{ background: 'var(--cream)', borderBottom: '1px solid var(--line)', padding: '12px 0' }}>
        <div className="wrap" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--muted)' }}>
          <Link href="/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Inicio</Link>
          {' › '}
          <Link href="/camaras-aire-moto-kenda/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Cámaras de Aire Kenda</Link>
          {' › '}
          <span style={{ color: 'var(--text)' }}>Reforzadas</span>
        </div>
      </nav>

      <section style={{ padding: '48px 0', background: 'var(--paper)' }}>
        <div className="wrap">
          <div style={{ background: 'var(--blue-bg)', border: '1px solid var(--blue)', padding: '16px 24px', marginBottom: '32px', display: 'flex', gap: '12px', alignItems: 'center' }}>
            <span style={{ fontSize: '20px' }}>🛡️</span>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--blue)' }}>
              <strong>Pared reforzada:</strong> hasta 4mm de espesor vs 2.5mm estándar. Reducción de pinchazos en off-road hasta un 60%.
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '8px' }}>
            {medidas.map(m => (
              <div key={m.medida} style={{ background: 'var(--cream)', border: `1px solid ${m.stock === 'low_stock' ? 'var(--amber)' : 'var(--line)'}`, padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '16px' }}>{m.medida}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--muted)', marginBottom: '4px' }}>Aro {m.aro} · Reforzada · TT</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: m.stock === 'in_stock' ? 'var(--green)' : 'var(--amber)' }}>
                    {m.stock === 'in_stock' ? '● En stock' : '● Stock limitado'}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '18px', color: 'var(--text)' }}>
                    ${m.price.toLocaleString('es-CL')}
                  </div>
                  <a
                    href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP?.replace(/[^0-9]/g, '') ?? '56900000000'}?text=${encodeURIComponent(`Hola, me interesa la cámara Kenda reforzada medida ${m.medida}. ¿Tienen stock?`)}`}
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
