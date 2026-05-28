import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { absoluteUrl } from '@/lib/site'
import { buildBreadcrumb, buildProductSchema } from '@/lib/schema'
import { getProducts, sizeToSlug, formatPriceCLP } from '@/lib/products'
import { FAQAccordion } from '@/components/ui/FAQAccordion'
import type { Product, Size } from '@/lib/types'

type Props = { params: Promise<{ medida: string }> }

type Match = { product: Product; size: Size }

async function getMatchesForSlug(slug: string): Promise<Match[]> {
  const products = await getProducts()
  const matches: Match[] = []
  for (const product of products) {
    for (const size of product.sizes) {
      if (sizeToSlug(size.medida) === slug) {
        matches.push({ product, size })
      }
    }
  }
  return matches
}

function decodeMedida(medida: string): { ancho: string; perfil: string; tipo: string; aro: string } | null {
  const metricMatch = medida.match(/^(\d+)\/(\d+)([BR-]?)(\d+)$/)
  if (metricMatch) {
    const [, ancho, perfil, tipoChar, aro] = metricMatch
    const tipo = tipoChar === 'B' ? 'Bias-Belt tubeless (TL)' : tipoChar === 'R' ? 'Radial (R)' : 'Diagonal'
    return { ancho: `${ancho} mm`, perfil: `${perfil}% del ancho (${Math.round(parseInt(ancho) * parseInt(perfil) / 100)} mm de altura)`, tipo, aro: `${aro} pulgadas` }
  }
  const imperialMatch = medida.match(/^(\d+\.\d+)-(\d+)$/)
  if (imperialMatch) {
    const [, ancho, aro] = imperialMatch
    return { ancho: `${ancho} pulgadas (imperial)`, perfil: 'Formato imperial — perfil integrado', tipo: 'Diagonal con cámara (TT)', aro: `${aro} pulgadas` }
  }
  return null
}

function getAro(medida: string): string | null {
  const m = medida.match(/(\d+)$/)
  return m ? m[1] : null
}

export async function generateStaticParams() {
  const products = await getProducts()
  const slugs = new Set<string>()
  for (const product of products) {
    for (const size of product.sizes) {
      slugs.add(sizeToSlug(size.medida))
    }
  }
  return Array.from(slugs).map(medida => ({ medida }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { medida: slug } = await params
  const matches = await getMatchesForSlug(slug)
  if (!matches.length) return {}

  const medidaLabel = matches[0].size.medida
  const minPrice = Math.min(...matches.map(m => m.size.priceCLP))

  return {
    title: `Neumático Kenda ${medidaLabel} Chile — Precio y Compatibilidad | Kenda Moto`,
    description: `Neumáticos Kenda en medida ${medidaLabel} disponibles en Chile desde $${minPrice.toLocaleString('es-CL')}. ${matches.length > 1 ? `${matches.length} modelos disponibles.` : `Modelo ${matches[0].product.name}.`} Distribuidor oficial ZOFRI Iquique.`,
    alternates: { canonical: absoluteUrl(`/neumaticos-kenda-moto/medida/${slug}/`) },
  }
}

export default async function MedidaPage({ params }: Props) {
  const { medida: slug } = await params
  const matches = await getMatchesForSlug(slug)
  if (!matches.length) notFound()

  const medidaLabel = matches[0].size.medida
  const minPrice = Math.min(...matches.map(m => m.size.priceCLP))
  const decoded = decodeMedida(medidaLabel)
  const aroActual = getAro(medidaLabel)

  // Related sizes: other sizes with same rim diameter
  const allProducts = await getProducts()
  const relatedSizes: { medida: string; slug: string; productName: string }[] = []
  const seen = new Set<string>()
  if (aroActual) {
    for (const product of allProducts) {
      for (const size of product.sizes) {
        const aro = getAro(size.medida)
        if (aro === aroActual && size.medida !== medidaLabel && !seen.has(size.medida)) {
          seen.add(size.medida)
          relatedSizes.push({ medida: size.medida, slug: sizeToSlug(size.medida), productName: product.ref })
        }
      }
    }
  }

  const breadcrumb = buildBreadcrumb([
    { name: 'Inicio', url: absoluteUrl('/') },
    { name: 'Neumáticos Kenda Moto', url: absoluteUrl('/neumaticos-kenda-moto/') },
    { name: 'Por Medida', url: absoluteUrl('/neumaticos-kenda-moto/medida/') },
    { name: medidaLabel, url: absoluteUrl(`/neumaticos-kenda-moto/medida/${slug}/`) },
  ])

  const productSchemas = matches.map(m => buildProductSchema(m.product, m.size, m.product.category))
  const allCompatMotos = Array.from(new Set(matches.flatMap(m => m.size.compatMotos ?? [])))

  const faqItems = [
    {
      question: `¿Qué significa la medida ${medidaLabel}?`,
      answer: decoded
        ? `La medida ${medidaLabel} se lee así: Ancho ${decoded.ancho} · Perfil ${decoded.perfil} · Construcción ${decoded.tipo} · Aro ${decoded.aro}. Estos valores deben coincidir exactamente con las especificaciones de tu moto para garantizar seguridad y rendimiento óptimo.`
        : `La medida ${medidaLabel} corresponde a las dimensiones del neumático: ancho, altura de perfil y diámetro de aro. Consulta el manual de tu moto para verificar que sea la medida homologada.`,
    },
    {
      question: `¿Qué motos usan la medida ${medidaLabel}?`,
      answer: allCompatMotos.length > 0
        ? `Las motos compatibles con la medida ${medidaLabel} incluyen: ${allCompatMotos.join(', ')}. Esta lista no es exhaustiva — consulta siempre el manual de propietario de tu moto para confirmar la medida homologada.`
        : `La compatibilidad depende del fabricante y modelo específico de tu moto. Consulta el manual de propietario o contáctanos por WhatsApp con el modelo de tu moto para confirmar.`,
    },
    {
      question: `¿Tienen stock de ${medidaLabel} en Chile?`,
      answer: `Sí, mantenemos stock permanente en nuestra bodega ZOFRI Iquique. El ${matches.map(m => `Kenda ${m.product.ref} en ${m.size.medida}`).join(' y el ')} está disponible con despacho en 24-72 horas hábiles a todo Chile con envío gratis.`,
    },
    {
      question: `¿Cuál es el precio del neumático Kenda ${medidaLabel} en Chile?`,
      answer: `El precio del neumático Kenda en medida ${medidaLabel} parte desde ${formatPriceCLP(minPrice)} CLP con IVA incluido y envío gratis. Aceptamos pago en hasta 12 cuotas sin interés con tarjetas de crédito seleccionadas. Para precios mayoristas a partir de 6 unidades, consulta nuestro portal B2B.`,
    },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {productSchemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <section style={{ background: 'var(--ink)', color: 'white', padding: '64px 0' }}>
        <div className="wrap">
          <div className="eyebrow mb-4" style={{ color: 'var(--kenda)' }}>Medida · {medidaLabel}</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(32px, 6vw, 64px)', textTransform: 'uppercase', letterSpacing: '-0.01em', lineHeight: 0.95 }}>
            Neumático Kenda {medidaLabel}
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'var(--dim)', maxWidth: '520px', lineHeight: 1.6, marginTop: '16px' }}>
            {matches.length === 1
              ? `${matches[0].product.name} disponible en medida ${medidaLabel}. Desde ${formatPriceCLP(minPrice)}. Stock en ZOFRI Iquique.`
              : `${matches.length} modelos Kenda disponibles en medida ${medidaLabel}. Desde ${formatPriceCLP(minPrice)}. Distribuidor oficial Chile.`
            }
          </p>
        </div>
      </section>

      <nav style={{ background: 'var(--cream)', borderBottom: '1px solid var(--line)', padding: '12px 0' }}>
        <div className="wrap" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--muted)' }}>
          <Link href="/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Inicio</Link>
          {' › '}
          <Link href="/neumaticos-kenda-moto/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Neumáticos Kenda Moto</Link>
          {' › '}
          <Link href="/neumaticos-kenda-moto/medida/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Por Medida</Link>
          {' › '}
          <span style={{ color: 'var(--text)' }}>{medidaLabel}</span>
        </div>
      </nav>

      {/* Size decoder */}
      {decoded && (
        <section style={{ padding: '32px 0', background: 'var(--cream)', borderBottom: '1px solid var(--line)' }}>
          <div className="wrap">
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '12px' }}>
              Cómo leer esta medida
            </div>
            <div style={{ display: 'flex', gap: '2px', flexWrap: 'wrap' }}>
              {[
                { label: 'Ancho', value: decoded.ancho },
                { label: 'Perfil', value: decoded.perfil },
                { label: 'Construcción', value: decoded.tipo },
                { label: 'Aro', value: decoded.aro },
              ].map(item => (
                <div key={item.label} style={{ background: 'white', border: '1px solid var(--line)', padding: '14px 20px', flex: '1 1 160px' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--kenda)', marginBottom: '4px' }}>{item.label}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px', color: 'var(--text)' }}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section style={{ padding: '48px 0', background: 'var(--paper)' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px', marginBottom: '48px' }}>
            {matches.map(({ product, size }) => (
              <div key={product.slug} style={{ background: 'var(--cream)', border: '2px solid var(--kenda)', padding: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--kenda)', marginBottom: '6px' }}>{product.ref}</div>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '22px', textTransform: 'uppercase', letterSpacing: '-0.01em', lineHeight: 1 }}>{product.name}</h2>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--muted)', marginTop: '4px' }}>{product.tagline}</div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: '12px' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '24px', color: 'var(--kenda)' }}>{formatPriceCLP(size.priceCLP)}</div>
                    {size.originalPriceCLP && (
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--muted)', textDecoration: 'line-through' }}>{formatPriceCLP(size.originalPriceCLP)}</div>
                    )}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                  {[
                    size.position === 'delantera' ? '⬆ Delantera' : '⬇ Trasera',
                    ...size.type.map(t => t),
                    `Índice ${size.speedIndex}`,
                  ].map(tag => (
                    <span key={tag} style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', background: 'white', border: '1px solid var(--line)', padding: '3px 8px', color: 'var(--text)' }}>{tag}</span>
                  ))}
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', background: size.stock === 'in_stock' ? '#dcfce7' : '#fef9c3', border: `1px solid ${size.stock === 'in_stock' ? '#86efac' : '#fde68a'}`, padding: '3px 8px', color: size.stock === 'in_stock' ? '#166534' : '#92400e' }}>
                    {size.stock === 'in_stock' ? 'En stock' : size.stock === 'low_stock' ? 'Stock bajo' : 'Sin stock'}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <Link href={`/neumaticos-kenda-moto/${product.category}/${product.slug}/${sizeToSlug(size.medida)}/`} className="btn-primary" style={{ fontSize: '13px', padding: '10px 20px' }}>
                    Ver producto
                  </Link>
                  <a
                    href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP?.replace(/[^0-9]/g, '') ?? '56900000000'}?text=${encodeURIComponent(`Hola, quiero el ${product.name} en medida ${size.medida}. ¿Tienen stock?`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline"
                    style={{ fontSize: '13px', padding: '10px 20px' }}
                  >
                    WhatsApp →
                  </a>
                </div>
              </div>
            ))}
          </div>

          {allCompatMotos.length > 0 && (
            <div style={{ background: 'var(--cream)', border: '1px solid var(--line)', padding: '32px', marginBottom: '48px' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '20px', textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: '16px' }}>
                Motos compatibles con la medida {medidaLabel}
              </h2>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {allCompatMotos.map(moto => (
                  <span key={moto} style={{ fontFamily: 'var(--font-body)', fontSize: '13px', background: 'white', border: '1px solid var(--line)', padding: '6px 12px', color: 'var(--text)' }}>
                    {moto}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Related sizes */}
          {relatedSizes.length > 0 && (
            <div style={{ marginBottom: '48px' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '12px' }}>
                Otras medidas aro {aroActual}&quot;
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {relatedSizes.slice(0, 12).map(rs => (
                  <Link
                    key={rs.medida}
                    href={`/neumaticos-kenda-moto/medida/${rs.slug}/`}
                    style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '13px', letterSpacing: '0.04em', padding: '8px 16px', background: 'var(--cream)', border: '1px solid var(--line)', color: 'var(--text)', textDecoration: 'none' }}
                  >
                    {rs.medida} <span style={{ fontSize: '11px', color: 'var(--dim)', marginLeft: '4px' }}>{rs.productName}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/neumaticos-kenda-moto/medida/" className="btn-outline">← Otras medidas</Link>
            <Link href="/neumaticos-kenda-moto/" className="btn-outline">Ver catálogo completo</Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '64px 0', background: 'var(--cream)' }}>
        <div className="wrap" style={{ maxWidth: '800px' }}>
          <div className="eyebrow mb-3">FAQ</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(22px, 4vw, 36px)', textTransform: 'uppercase', letterSpacing: '-0.01em', lineHeight: 1, marginBottom: '28px' }}>
            Preguntas sobre la medida {medidaLabel}
          </h2>
          <FAQAccordion items={faqItems} />
        </div>
      </section>
    </>
  )
}
