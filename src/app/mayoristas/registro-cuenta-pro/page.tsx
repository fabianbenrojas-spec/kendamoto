import type { Metadata } from 'next'
import Link from 'next/link'
import { absoluteUrl } from '@/lib/site'
import { buildBreadcrumb } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Registro Cuenta Pro Mayorista Kenda — Portal B2B | Kenda Moto',
  description:
    'Solicita acceso al portal mayorista B2B de Kenda Moto Chile. Precios de distribuidor, condiciones de pago especiales y acceso a stock ZOFRI para empresas y talleres.',
  alternates: { canonical: absoluteUrl('/mayoristas/registro-cuenta-pro/') },
}

const requisitos = [
  'Ser empresa constituida con RUT activo en el SII',
  'Actividad relacionada con la comercialización o instalación de neumáticos de moto',
  'Compra mínima inicial de $500.000 CLP (neto)',
  'Aceptar los términos y condiciones de venta mayorista',
]

const beneficios = [
  { icon: '💰', title: 'Precios de distribuidor', desc: '15% a 30% por debajo del precio de lista público, según volumen y plan.' },
  { icon: '📋', title: 'Acceso a lista de precios', desc: 'Lista de precios completa y actualizada con todas las referencias disponibles en ZOFRI.' },
  { icon: '🚚', title: 'Despacho prioritario', desc: 'Tu pedido tiene prioridad en el fulfillment desde nuestra bodega en Iquique.' },
  { icon: '📞', title: 'Ejecutivo comercial dedicado', desc: 'Un punto de contacto directo para cotizaciones, disponibilidad y seguimiento de pedidos.' },
  { icon: '📅', title: 'Condiciones de pago', desc: 'Opción de pago a 30 días para distribuidores con historial de compra (según evaluación).' },
  { icon: '🔄', title: 'Reposición automática', desc: 'Alertas de stock y sugerencias de reposición basadas en tu historial de pedidos.' },
]

export default function RegistroCuentaProPage() {
  const breadcrumb = buildBreadcrumb([
    { name: 'Inicio', url: absoluteUrl('/') },
    { name: 'Mayoristas', url: absoluteUrl('/mayoristas/') },
    { name: 'Registro Cuenta Pro', url: absoluteUrl('/mayoristas/registro-cuenta-pro/') },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <section style={{ background: 'var(--ink)', color: 'white', padding: '64px 0' }}>
        <div className="wrap">
          <div className="eyebrow mb-4" style={{ color: 'var(--kenda)' }}>B2B · Mayoristas</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(32px, 6vw, 64px)', textTransform: 'uppercase', letterSpacing: '-0.01em', lineHeight: 0.95 }}>
            Cuenta Pro Mayorista
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'var(--dim)', maxWidth: '560px', lineHeight: 1.6, marginTop: '16px' }}>
            Acceso al portal B2B de Kenda Moto Chile con precios de distribuidor, lista de stock ZOFRI y ejecutivo comercial dedicado.
          </p>
        </div>
      </section>

      <nav style={{ background: 'var(--cream)', borderBottom: '1px solid var(--line)', padding: '12px 0' }}>
        <div className="wrap" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--muted)' }}>
          <Link href="/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Inicio</Link>
          {' › '}
          <Link href="/mayoristas/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Mayoristas</Link>
          {' › '}
          <span style={{ color: 'var(--text)' }}>Registro Cuenta Pro</span>
        </div>
      </nav>

      <section style={{ padding: '64px 0', background: 'var(--paper)' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', marginBottom: '64px' }}>

            <div>
              <div className="eyebrow mb-4">Beneficios Cuenta Pro</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '28px', textTransform: 'uppercase', letterSpacing: '-0.01em', lineHeight: 1, marginBottom: '24px' }}>
                Lo que obtienes como distribuidor
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {beneficios.map(b => (
                  <div key={b.title} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{ fontSize: '22px', flexShrink: 0 }}>{b.icon}</div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: '4px' }}>{b.title}</div>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div style={{ background: 'var(--kenda-tint)', border: '2px solid var(--kenda)', padding: '32px', marginBottom: '24px' }}>
                <div className="eyebrow mb-3" style={{ color: 'var(--kenda)' }}>Requisitos de acceso</div>
                <ul style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text)', lineHeight: 2, paddingLeft: '16px', margin: 0 }}>
                  {requisitos.map(r => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </div>

              <div style={{ background: 'var(--cream)', border: '1px solid var(--line)', padding: '32px' }}>
                <div className="eyebrow mb-3">¿Cómo solicitar acceso?</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                  {[
                    { n: '01', t: 'Completa el formulario de cotización con tu RUT de empresa' },
                    { n: '02', t: 'Nuestro equipo comercial evalúa tu solicitud en 24 horas' },
                    { n: '03', t: 'Si procede, te enviamos acceso al portal y lista de precios' },
                    { n: '04', t: 'Tu ejecutivo comercial te contacta para la primera compra' },
                  ].map(s => (
                    <div key={s.n} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '16px', color: 'var(--kenda)', minWidth: '28px' }}>{s.n}</div>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>{s.t}</p>
                    </div>
                  ))}
                </div>
                <Link href="/mayoristas/cotizacion/" className="btn-primary">Iniciar solicitud →</Link>
              </div>
            </div>
          </div>

          <div style={{ background: 'var(--ink)', color: 'white', padding: '40px' }}>
            <div className="eyebrow mb-3" style={{ color: 'var(--kenda)' }}>¿Prefieres hablar directamente?</div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--dim)', lineHeight: 1.7, marginBottom: '20px', maxWidth: '560px' }}>
              Nuestro equipo comercial B2B está disponible de lunes a viernes de 09:00 a 18:00 hrs (hora Chile continental). Escríbenos directamente para agilizar el proceso.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a href="mailto:mayoristas@kendamoto.cl" className="btn-primary">mayoristas@kendamoto.cl</a>
              <Link href="/mayoristas/condiciones/" className="btn-outline" style={{ color: 'white', borderColor: 'white' }}>Ver condiciones B2B</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
