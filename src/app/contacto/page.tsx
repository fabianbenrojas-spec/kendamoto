import type { Metadata } from 'next'
import Link from 'next/link'
import { absoluteUrl } from '@/lib/site'
import { buildBreadcrumb, buildLocalBusinessSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Contacto — Carioca Chile Ltda. Distribuidor Kenda | Kenda Moto',
  description:
    'Contáctanos para consultas sobre neumáticos y cámaras Kenda en Chile. Bodega en ZOFRI Iquique. Atención de lunes a viernes 09:00–18:00 hrs.',
  alternates: { canonical: absoluteUrl('/contacto/') },
}

const canales = [
  {
    icon: '💬',
    titulo: 'WhatsApp',
    detalle: 'Respuesta en minutos',
    accion: 'Escribir por WhatsApp',
    href: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP?.replace(/[^0-9]/g, '') ?? '56900000000'}?text=${encodeURIComponent('Hola, tengo una consulta sobre neumáticos Kenda.')}`,
    externo: true,
  },
  {
    icon: '📧',
    titulo: 'Email ventas',
    detalle: 'ventas@kendamoto.cl',
    accion: 'Enviar email',
    href: 'mailto:ventas@kendamoto.cl',
    externo: false,
  },
  {
    icon: '🏢',
    titulo: 'Email mayoristas',
    detalle: 'mayoristas@kendamoto.cl',
    accion: 'Contacto B2B',
    href: 'mailto:mayoristas@kendamoto.cl',
    externo: false,
  },
]

export default function ContactoPage() {
  const breadcrumb = buildBreadcrumb([
    { name: 'Inicio', url: absoluteUrl('/') },
    { name: 'Contacto', url: absoluteUrl('/contacto/') },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildLocalBusinessSchema()) }} />

      <section style={{ background: 'var(--ink)', color: 'white', padding: '64px 0' }}>
        <div className="wrap">
          <div className="eyebrow mb-4" style={{ color: 'var(--kenda)' }}>Carioca Chile Ltda.</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(32px, 6vw, 64px)', textTransform: 'uppercase', letterSpacing: '-0.01em', lineHeight: 0.95 }}>
            Contacto
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'var(--dim)', maxWidth: '520px', lineHeight: 1.6, marginTop: '16px' }}>
            Distribuidor oficial exclusivo de Kenda Tires en Chile. Bodega en Zona Franca de Iquique (ZOFRI).
          </p>
        </div>
      </section>

      <nav style={{ background: 'var(--cream)', borderBottom: '1px solid var(--line)', padding: '12px 0' }}>
        <div className="wrap" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--muted)' }}>
          <Link href="/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Inicio</Link>
          {' › '}
          <span style={{ color: 'var(--text)' }}>Contacto</span>
        </div>
      </nav>

      <section style={{ padding: '64px 0', background: 'var(--paper)' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px' }}>

            {/* Canales de contacto */}
            <div>
              <div className="eyebrow mb-4">Canales de atención</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '40px' }}>
                {canales.map(c => (
                  <a
                    key={c.titulo}
                    href={c.href}
                    target={c.externo ? '_blank' : undefined}
                    rel={c.externo ? 'noopener noreferrer' : undefined}
                    style={{ textDecoration: 'none', display: 'block' }}
                  >
                    <div style={{ background: 'var(--cream)', border: '1px solid var(--line)', padding: '20px 24px', display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <div style={{ fontSize: '24px', flexShrink: 0 }}>{c.icon}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px', textTransform: 'uppercase', letterSpacing: '-0.01em' }}>{c.titulo}</div>
                        <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--muted)', marginTop: '2px' }}>{c.detalle}</div>
                      </div>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--kenda)', flexShrink: 0 }}>
                        {c.accion} →
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              <div style={{ background: 'var(--cream)', border: '1px solid var(--line)', padding: '24px' }}>
                <div className="eyebrow mb-3">Horario de atención</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text)', lineHeight: 2 }}>
                  <strong>Lunes a Viernes</strong><br />
                  09:00 – 18:00 hrs (hora Chile continental)<br /><br />
                  <strong>Sábado y Domingo</strong><br />
                  Cerrado — respuesta al siguiente día hábil
                </div>
              </div>
            </div>

            {/* Datos empresa */}
            <div>
              <div className="eyebrow mb-4">Datos empresa</div>
              <div style={{ background: 'var(--kenda-tint)', border: '2px solid var(--kenda)', padding: '32px', marginBottom: '16px' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '22px', textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: '20px' }}>
                  Carioca Chile Ltda.
                </h2>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text)', lineHeight: 2 }}>
                  <strong>Razón social:</strong><br />Carioca Chile Ltda.<br /><br />
                  <strong>RUT:</strong><br />78.846.500-9<br /><br />
                  <strong>Tipo de empresa:</strong><br />Soc. de Responsabilidad Limitada<br /><br />
                  <strong>Giro SII:</strong><br />Importadora y Exportadora de Bicicletas<br /><br />
                  <strong>Año de fundación:</strong><br />2000<br /><br />
                  <strong>Trabajadores:</strong><br />1–10<br /><br />
                  <strong>Actividad:</strong><br />Importación y distribución de neumáticos y cámaras Kenda<br /><br />
                  <strong>Sede operativa:</strong><br />Zona Franca de Iquique (ZOFRI)<br />Iquique, Región de Tarapacá, Chile<br /><br />
                  <strong>Cobertura:</strong><br />Las 16 regiones de Chile
                </div>
              </div>

              <div style={{ background: 'var(--cream)', border: '1px solid var(--line)', padding: '24px' }}>
                <div className="eyebrow mb-3">¿Eres mayorista?</div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '16px' }}>
                  Para consultas de distribuidores, talleres y empresas con cuenta mayorista, usa el canal B2B.
                </p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <Link href="/mayoristas/" className="btn-primary" style={{ fontSize: '13px', padding: '10px 16px' }}>Portal Mayoristas</Link>
                  <Link href="/mayoristas/cotizacion/" className="btn-outline" style={{ fontSize: '13px', padding: '10px 16px' }}>Solicitar cotización</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
