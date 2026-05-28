import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getProducts, getProductBySlug, getProductsByCategory, getSizeFromSlug, sizeToSlug } from '@/lib/products'
import { buildProductSchema, buildBreadcrumb } from '@/lib/schema'
import { absoluteUrl } from '@/lib/site'
import { formatPriceCLP, getDefaultSize } from '@/lib/products'
import { ProductPageClient } from '@/components/product/ProductPageClient'
import Link from 'next/link'

interface Props {
  params: Promise<{ categoria: string; modelo: string; medida: string }>
}

export async function generateStaticParams() {
  const products = await getProducts()
  return products.flatMap(product =>
    (product.sizes ?? []).map(size => ({
      categoria: product.category,
      modelo: product.slug,
      medida: sizeToSlug(size.medida),
    }))
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoria, modelo, medida } = await params
  const product = await getProductBySlug(modelo)
  const size = getSizeFromSlug(product, medida)
  if (!product || !size) return {}

  const canonical = absoluteUrl(
    `/neumaticos-kenda-moto/${categoria}/${modelo}/${medida}/`
  )

  return {
    title: `Neumático Kenda ${product.ref} ${product.name} ${size.medida} Chile | Kenda Moto`,
    description: `Compra neumático Kenda ${product.ref} medida ${size.medida} para moto ${product.tagline}. Distribuidor oficial Chile. Precio ${formatPriceCLP(size.priceCLP)} CLP. Envío gratis ZOFRI Iquique.`,
    alternates: { canonical },
    openGraph: {
      title: `Kenda ${product.ref} ${size.medida} — ${product.tagline}`,
      description: `Precio: ${formatPriceCLP(size.priceCLP)} CLP · Envío gratis Chile · Stock ZOFRI Iquique`,
      url: canonical,
      locale: 'es_CL',
    },
  }
}

export default async function ProductSizePage({ params }: Props) {
  const { categoria, modelo, medida } = await params
  const product = await getProductBySlug(modelo)
  const selectedSize = getSizeFromSlug(product, medida)

  if (!product || !selectedSize) notFound()

  const allSizes = product.sizes ?? []
  const categoryProducts = await getProductsByCategory(categoria)
  const relatedProducts = categoryProducts.filter(p => p.slug !== modelo)

  const productSchema = buildProductSchema(product, selectedSize, categoria)
  const breadcrumb = buildBreadcrumb([
    { name: 'Inicio', url: absoluteUrl('/') },
    { name: 'Neumáticos Kenda Moto', url: absoluteUrl('/neumaticos-kenda-moto/') },
    {
      name: categoria
        .split('-')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' '),
      url: absoluteUrl(`/neumaticos-kenda-moto/${categoria}/`),
    },
    {
      name: product.name,
      url: absoluteUrl(`/neumaticos-kenda-moto/${categoria}/${modelo}/`),
    },
    {
      name: selectedSize.medida,
      url: absoluteUrl(`/neumaticos-kenda-moto/${categoria}/${modelo}/${medida}/`),
    },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      {/* Breadcrumb nav */}
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
          <Link href="/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Inicio</Link>
          {' › '}
          <Link href="/neumaticos-kenda-moto/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>
            Neumáticos Kenda Moto
          </Link>
          {' › '}
          <Link
            href={`/neumaticos-kenda-moto/${categoria}/`}
            style={{ color: 'var(--muted)', textDecoration: 'none' }}
          >
            {categoria.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
          </Link>
          {' › '}
          <Link
            href={`/neumaticos-kenda-moto/${categoria}/${modelo}/`}
            style={{ color: 'var(--muted)', textDecoration: 'none' }}
          >
            {product.name}
          </Link>
          {' › '}
          <span style={{ color: 'var(--text)' }}>{selectedSize.medida}</span>
        </div>
      </nav>

      <ProductPageClient
        product={product}
        selectedSize={selectedSize}
        allSizes={allSizes}
        categoria={categoria}
        modelo={modelo}
        relatedProducts={relatedProducts}
      />
    </>
  )
}
