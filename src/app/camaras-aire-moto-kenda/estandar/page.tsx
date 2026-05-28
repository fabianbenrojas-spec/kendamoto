import type { Metadata } from 'next'
import Link from 'next/link'
import { absoluteUrl } from '@/lib/site'
import { buildBreadcrumb, buildFAQ } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Cámaras de Aire Estándar Kenda para Moto Chile | Kenda Moto',
  description:
    'Cámaras de aire Kenda estándar para moto en Chile. Aros 16, 17, 18, 19 y 21. Válvula recta. Distribuidor oficial ZOFRI Iquique. Envío gratis.',
  alternates: { canonical: absoluteUrl('/camaras-aire-moto-kenda/estandar/') },
}

const medidas = [
  { aro: 'Aro 21', medidas: ['80/100-21', '90/90-21', '90/100-21'], price: 8990 },
  { aro: 'Aro 19', medidas: ['90/90-19', '100/90-19', '110/80 R19'], price: 9490 },
  { aro: 'Aro 18', medidas: ['100/90-18', '110/80-18', '120/90-18', '140/80-18', '150/70 R18'], price: 9990 },
  { aro: 'Aro 17', medidas: ['120/70 R17', '130/80 R17', '140/70 R17', '150/70 R17', '160/60 R17', '170/60 R17'], price: 10490 },
  { aro: 'Aro 16', medidas: ['110/90-16', '130/90-16', '150/80-16'], price: 9990 },
]

const faq = [
  {
    question: '¿Las cámaras Kenda estándar son compatibles con llantas de radios?',
    answer: 'Sí, las cámaras de aire Kenda estándar están diseñadas específicamente para llantas de radios (TT). No uses cámaras en llantas de aleación diseñadas para tubeless (TL).',
  },
  {
    question: '¿Qué válvula tienen las cámaras Kenda estándar?',
    answer: 'Las cámaras estándar incluyen válvula Schrader recta (la más común en motos). Para scooter con aro pequeño que requiere válvula angular de 90°, consulta la línea de cámaras scooter.',
  },
  {
    question: '¿Cuánto duran las cámaras Kenda?',
    answer: 'En condiciones normales de uso, una cámara Kenda dura entre 15.000 y 25.000 km. En enduro y off-road exigente, recomendamos las cámaras reforzadas para mayor durabilidad.',
  },
]

export default function CamarasEstandarPage() {
  const breadcrumb = buildBreadcrumb([
    { name: 'Inicio', url: absoluteUrl('/') },
    { name: 'Cámaras de Aire Kenda', url: absoluteUrl('/camaras-aire-moto-kenda/') },
    { name: 'Estándar', url: absoluteUrl('/camaras-aire-moto-kenda/estandar/') },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFAQ(faq)) }} />

      <section style={{ background: 'var(--ink)', color: 'white', padding: '48px 0' }}>
        <div className="wrap">
          <div className="eyebrow mb-4" style={{ color: 'var(--kenda)' }}>Cámaras Kenda · Estándar</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(32px, 5vw, 60px)', textTransform: 'uppercase', letterSpacing: '-0.01em', lineHeight: 0.95 }}>
            Cámaras de Aire Estándar Kenda para Moto Chile
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'var(--dim)', maxWidth: '520px', lineHeight: 1.6, marginTop: '16px' }}>
            Cámaras Kenda originales para llantas de radios. Disponibles en aros 16, 17, 18, 19 y 21. Válvula Schrader recta.
          </p>
        </div>
      </section>

      <nav style={{ background: 'var(--cream)', borderBottom: '1px solid var(--line)', padding: '12px 0' }}>
        <div className="wrap" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--muted)' }}>
          <Link href="/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Inicio</Link>
          {' › '}
          <Link href="/camaras-aire-moto-kenda/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Cámaras de Aire Kenda</Link>
          {' › '}
          <span style={{ color: 'var(--text)' }}>Estándar</span>
        </div>
      </nav>

      <section style={{ padding: '64px 0', background: 'var(--paper)' }}>
        <div className="wrap">
          {medidas.map(grupo => (
            <div key={grupo.aro} style={{ marginBottom: '40px' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '20px', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '16px', color: 'var(--kenda)' }}>
                {grupo.aro}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '8px' }}>
                {grupo.medidas.map(m => (
                  <div key={m} style={{ background: 'var(--cream)', border: '1px solid var(--line)', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px' }}>{m}</div>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--muted)' }}>Estándar · TT</div>
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '16px', color: 'var(--text)' }}>
                        ${grupo.price.toLocaleString('es-CL')}
                      </div>
                      <a
                        href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP?.replace(/[^0-9]/g, '') ?? '56900000000'}?text=${encodeURIComponent(`Hola, me interesa la cámara Kenda estándar medida ${m}. ¿Tienen stock?`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--kenda)', textDecoration: 'none' }}
                      >
                        Pedir →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '48px 0', background: 'var(--cream)' }}>
        <div className="wrap" style={{ maxWidth: '720px' }}>
          <div className="eyebrow mb-4">Preguntas frecuentes</div>
          {faq.map((item, i) => (
            <details key={i} style={{ background: 'white', border: '1px solid var(--line)', marginBottom: '1px' }}>
              <summary style={{ padding: '16px 20px', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px', cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between' }}>
                {item.question} <span style={{ color: 'var(--kenda)' }}>+</span>
              </summary>
              <div style={{ padding: '0 20px 16px', fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--muted)', lineHeight: 1.7 }}>
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </section>
    </>
  )
}
