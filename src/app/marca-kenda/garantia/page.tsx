import type { Metadata } from 'next'
import Link from 'next/link'
import { absoluteUrl } from '@/lib/site'
import { buildBreadcrumb, buildFAQ } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Garantía Neumáticos Kenda Chile — Política Oficial | Kenda Moto',
  description:
    'Política de garantía oficial de neumáticos y cámaras Kenda en Chile. Cobertura, plazos, exclusiones y proceso para hacer valer tu garantía con Carioca Chile Ltda.',
  alternates: { canonical: absoluteUrl('/marca-kenda/garantia/') },
}

const faqs = [
  {
    question: '¿Cuánto tiempo dura la garantía de los neumáticos Kenda?',
    answer: 'La garantía de fabricación es de 5 años desde la fecha de fabricación marcada en el neumático (código DOT). Para defectos de fabricación detectados dentro de los primeros 12 meses de uso normal, Carioca Chile Ltda. gestiona la reposición directa.',
  },
  {
    question: '¿La garantía cubre desgaste normal o pinchazos?',
    answer: 'No. La garantía cubre exclusivamente defectos de fabricación: deformaciones en la carcasa, despegue de capas, fisuras prematuras no asociadas a impacto, y defectos en la banda de rodadura. El desgaste por uso, pinchazos, cortes por impacto o daños por montaje incorrecto no están cubiertos.',
  },
  {
    question: '¿Cómo hago valer la garantía?',
    answer: 'Envía un correo a ventas@kendamoto.cl con fotos del neumático mostrando el defecto, el número DOT (código en el flanco), y la boleta o comprobante de compra. Nuestro equipo evalúa el caso y responde en 48-72 horas hábiles.',
  },
  {
    question: '¿Qué pasa si el neumático se dañó por mal montaje?',
    answer: 'Los daños causados por montaje incorrecto, presión de inflado inadecuada, uso en condiciones para las que el neumático no está diseñado, o modificaciones del vehículo no están cubiertos. Recomendamos siempre el montaje en taller especializado.',
  },
]

export default function GarantiaKendaPage() {
  const breadcrumb = buildBreadcrumb([
    { name: 'Inicio', url: absoluteUrl('/') },
    { name: 'Marca Kenda', url: absoluteUrl('/marca-kenda/') },
    { name: 'Garantía', url: absoluteUrl('/marca-kenda/garantia/') },
  ])
  const faqSchema = buildFAQ(faqs)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section style={{ background: 'var(--ink)', color: 'white', padding: '64px 0' }}>
        <div className="wrap">
          <div className="eyebrow mb-4" style={{ color: 'var(--kenda)' }}>Garantía · Kenda</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(32px, 6vw, 64px)', textTransform: 'uppercase', letterSpacing: '-0.01em', lineHeight: 0.95 }}>
            Garantía Oficial Kenda Chile
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'var(--dim)', maxWidth: '560px', lineHeight: 1.6, marginTop: '16px' }}>
            Como distribuidor oficial exclusivo, Carioca Chile Ltda. gestiona directamente todas las garantías Kenda para el mercado chileno.
          </p>
        </div>
      </section>

      <nav style={{ background: 'var(--cream)', borderBottom: '1px solid var(--line)', padding: '12px 0' }}>
        <div className="wrap" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--muted)' }}>
          <Link href="/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Inicio</Link>
          {' › '}
          <Link href="/marca-kenda/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Marca Kenda</Link>
          {' › '}
          <span style={{ color: 'var(--text)' }}>Garantía</span>
        </div>
      </nav>

      <section style={{ padding: '64px 0', background: 'var(--paper)' }}>
        <div className="wrap" style={{ maxWidth: '800px' }}>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '48px' }}>
            {[
              { label: 'Cobertura de fabricación', value: '5 años DOT' },
              { label: 'Respuesta a reclamos', value: '48–72 h' },
              { label: 'Gestión directa', value: 'Sin intermediarios' },
              { label: 'Neumáticos originales', value: '100% auténticos' },
            ].map(s => (
              <div key={s.label} style={{ background: 'var(--cream)', border: '2px solid var(--kenda)', padding: '24px 20px' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '22px', color: 'var(--kenda)', letterSpacing: '-0.01em' }}>{s.value}</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--muted)', marginTop: '4px' }}>{s.label}</div>
              </div>
            ))}
          </div>

          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '24px', textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: '16px' }}>
            ¿Qué cubre la garantía?
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--text)', lineHeight: 1.8, marginBottom: '16px' }}>
            La garantía de fábrica Kenda cubre <strong>defectos de fabricación</strong> detectables en condiciones normales de uso:
          </p>
          <ul style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--text)', lineHeight: 2, paddingLeft: '20px', marginBottom: '32px' }}>
            <li>Deformaciones o abultamientos en la carcasa sin impacto externo identificable</li>
            <li>Desprendimiento o despegue de capas de la carcasa o banda de rodadura</li>
            <li>Fisuras prematuras en el flanco no asociadas a montaje o impacto</li>
            <li>Defectos visibles en la banda de rodadura (huecos, irregularidades de molde)</li>
            <li>Problemas de balance o uniformidad atribuibles al proceso de fabricación</li>
          </ul>

          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '24px', textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: '16px' }}>
            Exclusiones de garantía
          </h2>
          <ul style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--text)', lineHeight: 2, paddingLeft: '20px', marginBottom: '32px' }}>
            <li>Desgaste natural por uso</li>
            <li>Pinchazos, cortes o daños por objetos en la vía</li>
            <li>Daños por montaje incorrecto (llanta incompatible, herramientas inadecuadas)</li>
            <li>Inflado incorrecto (sobre o sub-inflado)</li>
            <li>Uso en aplicaciones o terrenos no especificados para el modelo</li>
            <li>Neumáticos montados en vehículos modificados que afecten la geometría de marcha</li>
            <li>Daños por almacenamiento inadecuado (exposición UV, ozono, calor excesivo)</li>
          </ul>

          <div style={{ background: 'var(--cream)', border: '1px solid var(--line)', padding: '32px', marginBottom: '48px' }}>
            <div className="eyebrow mb-3" style={{ color: 'var(--kenda)' }}>Proceso de garantía</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { step: '01', text: 'Fotografía el neumático: vista general, zona del defecto y el código DOT del flanco' },
                { step: '02', text: 'Envía las fotos junto con tu boleta/comprobante a ventas@kendamoto.cl con asunto "GARANTÍA"' },
                { step: '03', text: 'Nuestro equipo evalúa el caso y responde en 48-72 horas hábiles' },
                { step: '04', text: 'Si procede, coordinamos el retiro del neumático y la reposición desde nuestra bodega ZOFRI' },
              ].map(s => (
                <div key={s.step} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '20px', color: 'var(--kenda)', minWidth: '32px' }}>{s.step}</div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text)', lineHeight: 1.7, margin: 0 }}>{s.text}</p>
                </div>
              ))}
            </div>
          </div>

          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '24px', textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: '24px' }}>
            Preguntas frecuentes sobre garantía
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

          <div style={{ background: 'var(--ink)', color: 'white', padding: '32px' }}>
            <div className="eyebrow mb-3" style={{ color: 'var(--kenda)' }}>¿Necesitas hacer valer tu garantía?</div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--dim)', lineHeight: 1.7, marginBottom: '20px' }}>
              Contáctanos directamente. Como distribuidor oficial somos el punto de contacto único para garantías Kenda en Chile.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a href="mailto:ventas@kendamoto.cl" className="btn-primary">ventas@kendamoto.cl</a>
              <Link href="/marca-kenda/distribuidores-chile/" className="btn-outline" style={{ color: 'white', borderColor: 'white' }}>Ver información distribuidor</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
