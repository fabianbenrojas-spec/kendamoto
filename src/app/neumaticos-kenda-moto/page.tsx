import type { Metadata } from 'next'
import Link from 'next/link'
import { absoluteUrl } from '@/lib/site'
import { buildBreadcrumb } from '@/lib/schema'
import { FAQAccordion } from '@/components/ui/FAQAccordion'
import { CoberturaChile } from '@/components/sections/CoberturaChile'
import { HubSeoContent } from '@/components/sections/HubSeoContent'
import { B2BBanner } from '@/components/product/B2BBanner'
import categories from '@/data/categories.json'

export const metadata: Metadata = {
  title: 'Neumáticos Kenda para Moto Chile | Catálogo Completo | ZOFRI Iquique',
  description:
    'Catálogo completo de neumáticos Kenda para moto en Chile. Enduro, trail adventure, motocross, dual sport, calle y scooter. +200 referencias. Distribuidor oficial ZOFRI Iquique.',
  alternates: { canonical: absoluteUrl('/neumaticos-kenda-moto/') },
  openGraph: {
    title: 'Neumáticos Kenda Moto Chile — Catálogo Completo',
    description: '+200 referencias. Enduro, trail, motocross, calle. Stock directo ZOFRI Iquique.',
    url: absoluteUrl('/neumaticos-kenda-moto/'),
  },
}

export default function NeumaticosCatalogPage() {
  const breadcrumb = buildBreadcrumb([
    { name: 'Inicio', url: absoluteUrl('/') },
    { name: 'Neumáticos Kenda Moto', url: absoluteUrl('/neumaticos-kenda-moto/') },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      {/* Hero */}
      <section style={{ background: 'var(--ink)', color: 'white', padding: '64px 0' }}>
        <div className="wrap">
          <div className="eyebrow mb-4" style={{ color: 'var(--kenda)' }}>
            Catálogo completo
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(36px, 6vw, 72px)',
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
              lineHeight: 0.95,
            }}
          >
            Neumáticos Kenda para Moto Chile
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '16px',
              color: 'var(--dim)',
              marginTop: '16px',
              maxWidth: '560px',
            }}
          >
            Más de 200 referencias en stock. Enduro, trail, motocross, calle y scooter.
            Distribuidor oficial Kenda — Iquique ZOFRI.
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <nav
        style={{
          background: 'var(--cream)',
          borderBottom: '1px solid var(--line)',
          padding: '12px 0',
        }}
      >
        <div
          className="wrap"
          style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--muted)' }}
        >
          <Link href="/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>
            Inicio
          </Link>
          {' › '}
          <span style={{ color: 'var(--text)' }}>Neumáticos Kenda Moto</span>
        </div>
      </nav>

      {/* Popular sizes */}
      <section style={{ background: 'var(--cream)', padding: '32px 0', borderBottom: '1px solid var(--line)' }}>
        <div className="wrap">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', flexShrink: 0 }}>
              Medidas populares
            </span>
            {['90/90B21', '150/70B17', '170/60B17', '80/100-21', '110/100-18', '120/90-18'].map(size => (
              <Link
                key={size}
                href={`/neumaticos-kenda-moto/medida/${size.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')}/`}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '13px',
                  letterSpacing: '0.04em',
                  padding: '6px 14px',
                  background: 'white',
                  border: '1px solid var(--line)',
                  color: 'var(--text)',
                  textDecoration: 'none',
                }}
              >
                {size}
              </Link>
            ))}
            <Link href="/neumaticos-kenda-moto/medida/" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--kenda)', textDecoration: 'none' }}>
              Ver todas →
            </Link>
          </div>
        </div>
      </section>

      {/* Categories grid */}
      <section style={{ padding: '64px 0', background: 'var(--paper)' }}>
        <div className="wrap">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '2px',
            }}
          >
            {categories.map((cat, i) => (
              <Link
                key={cat.slug}
                href={`/neumaticos-kenda-moto/${cat.slug}/`}
                style={{ textDecoration: 'none' }}
              >
                <div
                  style={{
                    background: i === 1 ? 'var(--ink)' : 'var(--cream)',
                    color: i === 1 ? 'white' : 'var(--text)',
                    padding: '40px 32px',
                    minHeight: '200px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    border: '1px solid var(--line)',
                    transition: 'background 0.15s',
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 800,
                        fontSize: '28px',
                        textTransform: 'uppercase',
                        letterSpacing: '-0.01em',
                        marginBottom: '8px',
                      }}
                    >
                      {cat.name}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '13px',
                        color: i === 1 ? 'var(--dim)' : 'var(--muted)',
                        marginBottom: '8px',
                      }}
                    >
                      {cat.featuredModel}
                    </div>
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '12px',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--kenda)',
                    }}
                  >
                    {cat.products.length > 0 ? `${cat.products.length} modelos` : 'Consultar'} →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <HubSeoContent />
      <CoberturaChile />
      <B2BBanner />

      {/* FAQ */}
      <section style={{ padding: '64px 0', background: 'var(--paper)' }}>
        <div className="wrap" style={{ maxWidth: '800px' }}>
          <div className="eyebrow mb-3">FAQ</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(24px, 4vw, 40px)', textTransform: 'uppercase', letterSpacing: '-0.01em', lineHeight: 1, marginBottom: '32px' }}>
            Preguntas frecuentes
          </h2>
          <FAQAccordion items={[
            { question: '¿Los neumáticos Kenda tienen envío gratis a todo Chile?', answer: 'Sí, todos los pedidos incluyen envío gratis a cualquier región de Chile continental. Despachamos desde nuestra bodega ZOFRI Iquique con cobertura nacional en 24-72 horas hábiles según la región.' },
            { question: '¿Son neumáticos Kenda 100% originales?', answer: 'Sí. Carioca Chile Ltda. (RUT 78.846.500-9) es el importador oficial de Kenda Tires® en Chile, importando directamente desde Kenda Rubber Industrial Co., Ltd. (Taiwán) a través de la Zona Franca de Iquique. Todos los neumáticos son originales con documentación de importación.' },
            { question: '¿Cómo sé qué medida de neumático necesito?', answer: 'La medida está grabada en el flanco de tu neumático actual (ej. 150/70B17) o en el manual de propietario de tu moto. También puedes consultarnos por WhatsApp con el modelo de tu moto y te indicamos qué medidas tenemos disponibles.' },
            { question: '¿Puedo pagar en cuotas sin interés?', answer: 'Sí, aceptamos pago en hasta 12 cuotas sin interés con tarjetas de crédito seleccionadas. También aceptamos transferencia bancaria y otros medios de pago.' },
            { question: '¿Qué diferencia hay entre TL (tubeless) y TT (con cámara)?', answer: 'TL (Tubeless) es para llantas de aleación sin cámara de aire — más seguro ante pinchazos lentos. TT (Tube Type) requiere cámara de aire y es el estándar para llantas de radios de off-road y motos clásicas. Debes montar siempre el tipo correcto para tu llanta.' },
            { question: '¿Tienen programa mayorista para talleres y distribuidores?', answer: 'Sí, contamos con un programa B2B para talleres, tiendas de repuestos y distribuidores. A partir de 6 unidades aplican precios mayoristas. Visita nuestro portal de mayoristas para conocer los planes Básico, Distribuidor y Premium.' },
          ]} />
        </div>
      </section>
    </>
  )
}
