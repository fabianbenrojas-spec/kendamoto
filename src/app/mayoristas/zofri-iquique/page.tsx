import type { Metadata } from 'next'
import Link from 'next/link'
import { absoluteUrl } from '@/lib/site'
import { buildBreadcrumb, buildLocalBusinessSchema, buildFAQ } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Neumáticos Kenda desde ZOFRI Iquique — Importación Directa Chile | Kenda Moto',
  description:
    'Carioca Chile Ltda. importa neumáticos Kenda directamente desde Taiwan a través de la Zona Franca de Iquique (ZOFRI). Precios de importador, stock permanente, envío a las 16 regiones.',
  alternates: { canonical: absoluteUrl('/mayoristas/zofri-iquique/') },
}

const faqs = [
  {
    question: '¿Qué ventajas tiene comprar neumáticos desde ZOFRI?',
    answer: 'La Zona Franca de Iquique permite importar con beneficios arancelarios especiales. Al importar directamente desde Taiwan y distribuir desde ZOFRI, eliminamos intermediarios: los precios son de importador, no de revendedor. Además mantenemos un stock de más de 200 referencias permanentes.',
  },
  {
    question: '¿Cuánto demora el despacho desde Iquique a Santiago?',
    answer: 'Los despachos a Santiago demoran 2-3 días hábiles desde confirmación de pago. Para regiones extremas (Aysén, Magallanes) pueden ser 5-7 días hábiles. Iquique y la región de Tarapacá tienen retiro en bodega el mismo día con pedido previo.',
  },
  {
    question: '¿Los neumáticos de ZOFRI pagan IVA?',
    answer: 'Sí. Los precios que publicamos incluyen IVA (19%). La operación en ZOFRI beneficia el proceso de importación (aranceles), pero la venta al consumidor final en Chile siempre incluye IVA. Mayoristas con actividad en ZOFRI pueden tener condiciones especiales — consultar.',
  },
  {
    question: '¿Puedo visitar la bodega en Iquique?',
    answer: 'Sí, con cita previa. Nuestra bodega está ubicada dentro de la Zona Franca de Iquique. Para visitas de mayoristas o clientes B2B, coordinamos acceso con el equipo comercial. Contáctanos por mayoristas@kendamoto.cl o WhatsApp.',
  },
]

export default function ZofriIquiquePage() {
  const breadcrumb = buildBreadcrumb([
    { name: 'Inicio', url: absoluteUrl('/') },
    { name: 'Mayoristas', url: absoluteUrl('/mayoristas/') },
    { name: 'ZOFRI Iquique', url: absoluteUrl('/mayoristas/zofri-iquique/') },
  ])
  const faqSchema = buildFAQ(faqs)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildLocalBusinessSchema()) }} />

      <section style={{ background: 'var(--ink)', color: 'white', padding: '64px 0' }}>
        <div className="wrap">
          <div className="eyebrow mb-4" style={{ color: 'var(--kenda)' }}>Importación directa · ZOFRI Iquique</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(32px, 6vw, 64px)', textTransform: 'uppercase', letterSpacing: '-0.01em', lineHeight: 0.95 }}>
            Neumáticos Kenda<br />desde ZOFRI Iquique
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'var(--dim)', maxWidth: '560px', lineHeight: 1.6, marginTop: '16px' }}>
            Importamos directamente desde Taiwan. Stock permanente de más de 200 referencias en bodega ZOFRI. Precios de importador para todo Chile.
          </p>
        </div>
      </section>

      <nav style={{ background: 'var(--cream)', borderBottom: '1px solid var(--line)', padding: '12px 0' }}>
        <div className="wrap" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--muted)' }}>
          <Link href="/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Inicio</Link>
          {' › '}
          <Link href="/mayoristas/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Mayoristas</Link>
          {' › '}
          <span style={{ color: 'var(--text)' }}>ZOFRI Iquique</span>
        </div>
      </nav>

      <section style={{ padding: '64px 0', background: 'var(--paper)' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '48px', alignItems: 'start', marginBottom: '64px' }}>
            <div>
              <div className="eyebrow mb-4">¿Por qué ZOFRI?</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(24px, 3vw, 36px)', textTransform: 'uppercase', letterSpacing: '-0.01em', lineHeight: 1, marginBottom: '20px' }}>
                La ventaja del importador directo
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--muted)', lineHeight: 1.8, marginBottom: '16px' }}>
                La Zona Franca de Iquique (ZOFRI) es el principal polo logístico de importación del norte de Chile. Operar desde ZOFRI nos permite importar neumáticos Kenda directamente desde Taiwan con beneficios arancelarios que no están disponibles para importadores fuera de la zona franca.
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--muted)', lineHeight: 1.8 }}>
                Carioca Chile Ltda. opera en ZOFRI desde su fundación en 1996. En casi 30 años hemos construido una cadena de suministro directa con Kenda Rubber Industrial Co., Ltd. (Taiwan) que nos permite ofrecer los precios más competitivos del mercado chileno, sin pasar por distribuidores regionales ni intermediarios.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { icon: '🚢', title: 'Importación directa Taiwan', desc: 'Sin intermediarios regionales. Kenda Taiwan → ZOFRI Chile.' },
                { icon: '📦', title: '200+ referencias en stock', desc: 'La mayor variedad de neumáticos Kenda moto disponible en Chile.' },
                { icon: '🚚', title: 'Despacho a las 16 regiones', desc: 'Desde Iquique al resto del país en 2-5 días hábiles.' },
                { icon: '✅', title: 'Originales con número DOT', desc: 'Autenticidad garantizada. Cada neumático tiene número de serie verificable.' },
              ].map(item => (
                <div key={item.title} style={{ background: 'var(--cream)', border: '1px solid var(--line)', padding: '20px 24px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ fontSize: '24px', flexShrink: 0 }}>{item.icon}</div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px', textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: '4px' }}>{item.title}</div>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: 'var(--kenda-tint)', border: '2px solid var(--kenda)', padding: '40px', marginBottom: '64px' }}>
            <div className="eyebrow mb-3" style={{ color: 'var(--kenda)' }}>Nuestra bodega</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text)', lineHeight: 1.8 }}>
                <strong>Ubicación:</strong><br />
                Zona Franca de Iquique (ZOFRI)<br />
                Iquique, Región de Tarapacá<br />
                Chile
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text)', lineHeight: 1.8 }}>
                <strong>Stock disponible:</strong><br />
                +200 referencias Kenda<br />
                Neumáticos moto + cámaras<br />
                Actualización semanal
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text)', lineHeight: 1.8 }}>
                <strong>Retiro en bodega:</strong><br />
                Con cita previa<br />
                Lunes a viernes<br />
                mayoristas@kendamoto.cl
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text)', lineHeight: 1.8 }}>
                <strong>Tiempos de despacho:</strong><br />
                Iquique: retiro mismo día<br />
                Santiago: 2-3 días hábiles<br />
                Regiones extremas: 5-7 días
              </div>
            </div>
          </div>

          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '28px', textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: '24px' }}>
            Preguntas frecuentes — ZOFRI
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '48px' }}>
            {faqs.map(faq => (
              <details key={faq.question} style={{ background: 'var(--cream)', border: '1px solid var(--line)', padding: '20px 24px' }}>
                <summary style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '16px', cursor: 'pointer', letterSpacing: '-0.01em' }}>
                  {faq.question}
                </summary>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--muted)', lineHeight: 1.7, marginTop: '12px', marginBottom: 0 }}>
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/mayoristas/" className="btn-primary">Portal Mayoristas B2B</Link>
            <Link href="/mayoristas/cotizacion/" className="btn-outline">Solicitar cotización</Link>
          </div>
        </div>
      </section>
    </>
  )
}
