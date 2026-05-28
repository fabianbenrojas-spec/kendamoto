import type { Metadata } from 'next'
import Link from 'next/link'
import { absoluteUrl } from '@/lib/site'
import { buildBreadcrumb } from '@/lib/schema'
import { getProducts, sizeToSlug } from '@/lib/products'

export const metadata: Metadata = {
  title: 'Neumáticos Kenda Moto por Medida — Todas las Medidas Chile | Kenda Moto',
  description:
    'Busca tu neumático Kenda por medida. 120/70 R17, 150/70 R17, 110/80 R19, 90/90-21 y más. Distribuidor oficial Chile. Importación directa ZOFRI Iquique.',
  alternates: { canonical: absoluteUrl('/neumaticos-kenda-moto/medida/') },
}

type MedidaEntry = {
  medida: string
  slug: string
  productos: { nombre: string; slug: string }[]
  position: string
  priceCLP: number
}

export default async function MedidaHubPage() {
  const products = await getProducts()

  const medidaMap = new Map<string, MedidaEntry>()

  for (const product of products) {
    for (const size of product.sizes) {
      const slug = sizeToSlug(size.medida)
      if (!medidaMap.has(slug)) {
        medidaMap.set(slug, {
          medida: size.medida,
          slug,
          productos: [],
          position: size.position,
          priceCLP: size.priceCLP,
        })
      }
      medidaMap.get(slug)!.productos.push({ nombre: product.name, slug: product.slug })
    }
  }

  const medidas = Array.from(medidaMap.values()).sort((a, b) => a.medida.localeCompare(b.medida))

  const breadcrumb = buildBreadcrumb([
    { name: 'Inicio', url: absoluteUrl('/') },
    { name: 'Neumáticos Kenda Moto', url: absoluteUrl('/neumaticos-kenda-moto/') },
    { name: 'Por Medida', url: absoluteUrl('/neumaticos-kenda-moto/medida/') },
  ])


  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <section style={{ background: 'var(--ink)', color: 'white', padding: '64px 0' }}>
        <div className="wrap">
          <div className="eyebrow mb-4" style={{ color: 'var(--kenda)' }}>Catálogo · Por Medida</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(32px, 6vw, 64px)', textTransform: 'uppercase', letterSpacing: '-0.01em', lineHeight: 0.95 }}>
            Neumáticos Kenda por Medida
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'var(--dim)', maxWidth: '560px', lineHeight: 1.6, marginTop: '16px' }}>
            Selecciona la medida de tu neumático para ver los modelos disponibles, precio y compatibilidad. Stock en ZOFRI Iquique.
          </p>
        </div>
      </section>

      <nav style={{ background: 'var(--cream)', borderBottom: '1px solid var(--line)', padding: '12px 0' }}>
        <div className="wrap" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--muted)' }}>
          <Link href="/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Inicio</Link>
          {' › '}
          <Link href="/neumaticos-kenda-moto/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Neumáticos Kenda Moto</Link>
          {' › '}
          <span style={{ color: 'var(--text)' }}>Por Medida</span>
        </div>
      </nav>

      <section style={{ padding: '48px 0', background: 'var(--paper)' }}>
        <div className="wrap">
          <div style={{ marginBottom: '32px', fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--muted)' }}>
            {medidas.length} medidas disponibles en stock · Importación directa ZOFRI Iquique
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '8px' }}>
            {medidas.map(m => (
              <Link key={m.slug} href={`/neumaticos-kenda-moto/medida/${m.slug}/`} style={{ textDecoration: 'none' }}>
                <div style={{ background: 'var(--cream)', border: '1px solid var(--line)', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'border-color 0.15s' }} className="product-card">
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '18px', letterSpacing: '-0.01em', color: 'var(--text)' }}>{m.medida}</div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--muted)', marginTop: '4px', textTransform: 'capitalize' }}>
                      {m.position} · {m.productos.length} {m.productos.length === 1 ? 'modelo' : 'modelos'}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '16px', color: 'var(--kenda)' }}>
                      desde ${m.priceCLP.toLocaleString('es-CL')}
                    </div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.05em', textTransform: 'uppercase', marginTop: '4px' }}>
                      Ver →
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ marginTop: '48px', background: 'var(--ink)', color: 'white', padding: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div className="eyebrow mb-2" style={{ color: 'var(--kenda)' }}>¿No encuentras tu medida?</div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--dim)', margin: 0, lineHeight: 1.6 }}>
                Cotiza por WhatsApp. Podemos importar medidas a pedido desde Taiwan.
              </p>
            </div>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP?.replace(/[^0-9]/g, '') ?? '56900000000'}?text=${encodeURIComponent('Hola, necesito un neumático Kenda en una medida específica. ¿Pueden ayudarme?')}`}
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
