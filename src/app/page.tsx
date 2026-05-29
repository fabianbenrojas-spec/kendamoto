import type { Metadata } from 'next'
import Link from 'next/link'
import { TrustStrip } from '@/components/ui/TrustStrip'
import { getFeaturedProducts } from '@/lib/products'
import { getFeaturedPosts } from '@/lib/blog'
import { buildFAQ, buildBreadcrumb } from '@/lib/schema'
import { absoluteUrl } from '@/lib/site'
import { TireFinder } from '@/components/finder/TireFinder'
import { FeaturedProductsFilter } from '@/components/home/FeaturedProductsFilter'
import { FAQAccordion } from '@/components/ui/FAQAccordion'
import { CoberturaChile } from '@/components/sections/CoberturaChile'
import { NewsletterBanner } from '@/components/sections/NewsletterBanner'

export const metadata: Metadata = {
  title: 'Neumáticos Kenda Moto Chile | Distribuidor Iquique ZOFRI | Envío Gratis',
  description:
    'Distribuidor oficial Kenda en Chile. Neumáticos y cámaras para moto enduro, trail, motocross, calle y scooter. Importación directa Zona Franca Iquique ZOFRI. Envío gratis a todo Chile.',
  alternates: { canonical: absoluteUrl('/') },
  openGraph: {
    title: 'Kenda Moto Chile — Distribuidor Oficial',
    description: 'Neumáticos y cámaras Kenda para moto. Stock ZOFRI Iquique. Envío gratis.',
    url: absoluteUrl('/'),
  },
}

const categories = [
  {
    slug: 'enduro',
    name: 'Enduro',
    desc: 'K779 Knarly (delantera) · K778 Knarly (trasera)',
    models: '2 modelos · 4 medidas',
    col: '1',
  },
  {
    slug: 'trail-adventure',
    name: 'Trail Adventure',
    desc: 'K784 Big Block — El más versátil para adventure',
    models: '3 modelos · 17 medidas',
    col: '2',
    featured: true,
  },
  {
    slug: 'cross-motocross',
    name: 'Motocross',
    desc: 'K785 Millville · K782 Sand Mad',
    models: '2 modelos · 12 medidas',
    col: '1',
  },
  {
    slug: 'calle-carretera',
    name: 'Calle / Clásico',
    desc: 'K787 Equilibrium (clásico) · K761 Dual Sport',
    models: '2 modelos · 9 medidas',
    col: '1',
  },
]

const faqItems = [
  {
    question: '¿Kenda Moto Chile tiene envío gratis?',
    answer:
      'Sí, todos los pedidos incluyen envío gratis a cualquier región de Chile. Despachamos desde nuestra bodega en la Zona Franca de Iquique (ZOFRI) con cobertura nacional.',
  },
  {
    question: '¿Son neumáticos originales Kenda?',
    answer:
      'Sí, somos distribuidores oficiales de Kenda Tires® en Chile a través de Carioca Chile Ltda. Todos los neumáticos son 100% originales, importados directamente desde Kenda Rubber Industrial Co., Ltd. (Taiwan).',
  },
  {
    question: '¿Cuánto tarda el despacho desde ZOFRI Iquique?',
    answer:
      'El tiempo de entrega varía según la región: Santiago 2-3 días hábiles, sur de Chile 3-4 días hábiles. Iquique y el norte grande tienen despacho en 24 horas.',
  },
  {
    question: '¿Puedo pagar en cuotas?',
    answer:
      'Sí, ofrecemos hasta 12 cuotas sin interés con tarjetas de crédito seleccionadas. También aceptamos transferencia bancaria y otros medios de pago.',
  },
  {
    question: '¿Tienen programa para talleres y distribuidores?',
    answer:
      'Sí, contamos con un programa mayorista B2B para talleres, tiendas de repuestos y distribuidores. Visita nuestro portal de mayoristas para conocer las condiciones y precios especiales.',
  },
]

const stats = [
  { value: '200+', label: 'Referencias en stock' },
  { value: '24h', label: 'Despacho ZOFRI' },
  { value: '16', label: 'Regiones de Chile' },
  { value: '4.8★', label: 'Valoración clientes' },
]

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts()
  const recentPosts = getFeaturedPosts()

  const breadcrumb = buildBreadcrumb([{ name: 'Inicio', url: absoluteUrl('/') }])
  const faqSchema = buildFAQ(faqItems)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* HERO */}
      <section
        style={{
          background: 'var(--ink)',
          color: 'white',
          padding: '80px 0 64px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse at 70% 50%, rgba(227,6,19,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div className="wrap" style={{ position: 'relative' }}>
          <div className="eyebrow mb-6" style={{ color: 'var(--kenda)' }}>
            Distribuidor Oficial Kenda · Iquique ZOFRI · Chile
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(48px, 8vw, 96px)',
              lineHeight: 0.95,
              letterSpacing: '-0.01em',
              marginBottom: '24px',
              textTransform: 'uppercase',
            }}
          >
            Neumáticos y Cámaras Kenda para Moto —{' '}
            <span style={{ color: 'var(--kenda)' }}>Distribuidor Oficial Chile</span>
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '18px',
              color: 'var(--dim)',
              maxWidth: '560px',
              marginBottom: '40px',
              lineHeight: 1.6,
            }}
          >
            Del Atacama a la Patagonia. Stock directo ZOFRI Iquique, envío gratis a todo Chile.
            Enduro, trail, motocross, calle y scooter.
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '48px' }}>
            <Link href="/neumaticos-kenda-moto/" className="btn-primary">
              Ver neumáticos
            </Link>
            <Link href="/mayoristas/" className="btn-ghost">
              Portal mayoristas B2B
            </Link>
          </div>

          {/* Stats */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '1px',
              background: 'var(--line-dark)',
              maxWidth: '640px',
              border: '1px solid var(--line-dark)',
            }}
          >
            {stats.map(stat => (
              <div
                key={stat.label}
                style={{
                  background: 'var(--ink-2)',
                  padding: '20px 16px',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: '28px',
                    color: 'white',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '11px',
                    color: 'var(--dim)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    marginTop: '4px',
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <TrustStrip />

      {/* CATEGORÍAS */}
      <section style={{ padding: '80px 0', background: 'var(--paper)' }}>
        <div className="wrap">
          <div className="eyebrow mb-3">Categorías</div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(32px, 5vw, 56px)',
              letterSpacing: '-0.01em',
              textTransform: 'uppercase',
              marginBottom: '40px',
              lineHeight: 1,
            }}
          >
            Neumáticos para cada terreno
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2px',
            }}
          >
            {categories.map(cat => (
              <Link
                key={cat.slug}
                href={`/neumaticos-kenda-moto/${cat.slug}/`}
                style={{ textDecoration: 'none' }}
              >
                <div
                  style={{
                    background: cat.featured ? 'var(--ink)' : 'var(--cream)',
                    color: cat.featured ? 'white' : 'var(--text)',
                    padding: '40px 32px',
                    height: '220px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'background 0.15s',
                    cursor: 'pointer',
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
                        color: cat.featured ? 'white' : 'var(--text)',
                      }}
                    >
                      {cat.name}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '14px',
                        color: cat.featured ? 'var(--dim)' : 'var(--muted)',
                      }}
                    >
                      {cat.desc}
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
                    {cat.models} →
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ marginTop: '16px', textAlign: 'center' }}>
            <Link href="/neumaticos-kenda-moto/" className="btn-outline">
              Ver todas las categorías
            </Link>
          </div>
        </div>
      </section>

      {/* TIRE FINDER */}
      <section style={{ padding: '80px 0', background: 'var(--ink)', color: 'white' }}>
        <div className="wrap">
          <div className="eyebrow mb-3" style={{ color: 'var(--kenda)' }}>Buscador de neumático</div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(28px, 5vw, 48px)',
              letterSpacing: '-0.01em',
              textTransform: 'uppercase',
              marginBottom: '16px',
              lineHeight: 1,
            }}
          >
            ¿Qué neumático necesita tu moto?
          </h2>

          {/* Quick stats */}
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginBottom: '20px' }}>
            {[
              { value: '7', label: 'modelos Kenda' },
              { value: '31', label: 'medidas en stock' },
              { value: '5', label: 'categorías' },
              { value: '100%', label: 'originales' },
            ].map(s => (
              <div key={s.label} style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '20px', color: 'var(--kenda)' }}>{s.value}</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--dim)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</span>
              </div>
            ))}
          </div>

          {/* Tab descriptions */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1px', background: 'var(--line-dark)', marginBottom: '32px' }}>
            {[
              { tab: 'Por Uso', desc: 'Terrain → modelo Kenda recomendado' },
              { tab: 'Por Moto', desc: 'Marca / modelo → medidas compatibles' },
              { tab: 'Por Medida', desc: 'Ancho / perfil / aro → productos disponibles' },
            ].map(item => (
              <div key={item.tab} style={{ background: 'var(--ink-2)', padding: '12px 16px' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--kenda)', marginBottom: '3px' }}>{item.tab}</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--dim)' }}>{item.desc}</div>
              </div>
            ))}
          </div>

          <TireFinder />

          {/* Escape hatch */}
          <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid var(--line-dark)', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--dim)' }}>
              ¿No encontraste tu moto o medida?
            </span>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP?.replace(/[^0-9]/g, '') ?? '56900000000'}?text=${encodeURIComponent('Hola, busco neumáticos Kenda para mi moto y no encuentro la medida/modelo. ¿Pueden ayudarme?')}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '12px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#25D366',
                textDecoration: 'none',
                border: '1px solid rgba(37,211,102,0.3)',
                padding: '6px 14px',
              }}
            >
              Consultar por WhatsApp →
            </a>
          </div>
        </div>
      </section>

      {/* PRODUCTOS DESTACADOS */}
      <section style={{ padding: '80px 0', background: 'var(--cream)' }}>
        <div className="wrap">
          <div className="eyebrow mb-3">Productos destacados</div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(32px, 5vw, 56px)',
              letterSpacing: '-0.01em',
              textTransform: 'uppercase',
              marginBottom: '40px',
              lineHeight: 1,
            }}
          >
            Los más vendidos
          </h2>
          <FeaturedProductsFilter products={featuredProducts} />
        </div>
      </section>

      {/* ZOFRI BLOCK */}
      <section style={{ padding: '80px 0', background: 'var(--paper)' }}>
        <div className="wrap">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '64px',
              alignItems: 'center',
            }}
          >
            <div>
              <div className="eyebrow mb-4">Ventaja ZOFRI</div>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: 'clamp(28px, 4vw, 48px)',
                  textTransform: 'uppercase',
                  letterSpacing: '-0.01em',
                  lineHeight: 1,
                  marginBottom: '20px',
                }}
              >
                Importación directa desde Zona Franca
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '16px',
                  color: 'var(--muted)',
                  lineHeight: 1.7,
                  marginBottom: '24px',
                }}
              >
                Carioca Chile Ltda. importa directamente desde Kenda Rubber Industrial Co., Ltd.
                (Taiwán) a través de la Zona Franca de Iquique. Esto nos permite ofrecer los
                mejores precios del mercado con stock permanente de más de 200 referencias.
              </p>
              <Link href="/mayoristas/zofri-iquique/" className="btn-outline">
                Conocer más sobre ZOFRI →
              </Link>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
              }}
            >
              {[
                { value: '+200', label: 'Referencias en stock permanente' },
                { value: '2000', label: 'Año de fundación Carioca Chile' },
                { value: '16', label: 'Regiones de Chile con cobertura' },
                { value: '100%', label: 'Neumáticos originales garantizados' },
              ].map(item => (
                <div
                  key={item.label}
                  style={{
                    background: 'var(--cream)',
                    padding: '24px 20px',
                    border: '1px solid var(--line)',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 800,
                      fontSize: '36px',
                      color: 'var(--kenda)',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {item.value}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '13px',
                      color: 'var(--muted)',
                      lineHeight: 1.4,
                      marginTop: '4px',
                    }}
                  >
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CoberturaChile />

      {/* B2B BANNER */}
      <section style={{ background: 'var(--ink)', padding: '48px 0' }}>
        <div className="wrap">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '24px',
            }}
          >
            <div>
              <div className="eyebrow mb-2" style={{ color: 'var(--kenda)' }}>
                Portal Mayoristas
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: 'clamp(24px, 4vw, 40px)',
                  textTransform: 'uppercase',
                  letterSpacing: '-0.01em',
                  color: 'white',
                  lineHeight: 1,
                }}
              >
                ¿Eres taller o distribuidor?
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '15px',
                  color: 'var(--dim)',
                  marginTop: '8px',
                }}
              >
                Precios mayoristas, catálogo completo y cuenta B2B con factura electrónica.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/mayoristas/" className="btn-primary">
                Solicitar cuenta B2B
              </Link>
              <Link href="/mayoristas/catalogo-pdf/" className="btn-ghost">
                Descargar catálogo PDF
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* BLOG */}
      {recentPosts.length > 0 && (
        <section style={{ padding: '80px 0', background: 'var(--paper)' }}>
          <div className="wrap">
            <div className="eyebrow mb-3">Blog</div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'clamp(28px, 4vw, 48px)',
                textTransform: 'uppercase',
                letterSpacing: '-0.01em',
                lineHeight: 1,
                marginBottom: '40px',
              }}
            >
              Guías y comparativas
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '16px',
              }}
            >
              {recentPosts.map(post => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}/`}
                  style={{
                    textDecoration: 'none',
                    background: 'var(--cream)',
                    border: '1px solid var(--line)',
                    padding: '24px',
                    display: 'block',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--kenda)',
                      marginBottom: '8px',
                    }}
                  >
                    {post.category} · {post.readTime}
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: '20px',
                      color: 'var(--text)',
                      lineHeight: 1.2,
                      marginBottom: '8px',
                    }}
                  >
                    {post.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '13px',
                      color: 'var(--muted)',
                      lineHeight: 1.5,
                    }}
                  >
                    {post.description}
                  </p>
                </Link>
              ))}
            </div>
            <div style={{ marginTop: '32px', textAlign: 'center' }}>
              <Link href="/blog/" className="btn-outline">
                Ver todos los artículos →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* HERITAGE */}
      <section
        style={{
          padding: '64px 0',
          background: 'var(--ink)',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <div className="wrap">
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(20px, 3vw, 32px)',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              marginBottom: '8px',
            }}
          >
            Kenda Since 1962 · Carioca Chile desde 2000
          </div>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              color: 'var(--dim)',
              maxWidth: '560px',
              margin: '0 auto',
            }}
          >
            Más de 60 años de tecnología Kenda Tires® en el mundo. Más de 25 años de distribución
            exclusiva en Chile a través de Carioca Chile Ltda. desde la Zona Franca de Iquique.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '80px 0', background: 'var(--paper)' }}>
        <div className="wrap" style={{ maxWidth: '800px' }}>
          <div className="eyebrow mb-3">Preguntas frecuentes</div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(28px, 4vw, 48px)',
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
              lineHeight: 1,
              marginBottom: '40px',
            }}
          >
            FAQ
          </h2>
          <FAQAccordion items={faqItems} />
        </div>
      </section>
      <NewsletterBanner />
    </>
  )
}
