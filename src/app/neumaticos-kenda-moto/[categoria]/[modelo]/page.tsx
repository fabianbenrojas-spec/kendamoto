import { redirect, notFound } from 'next/navigation'
import { getProductBySlug, getDefaultSize, sizeToSlug } from '@/lib/products'

interface Props {
  params: Promise<{ categoria: string; modelo: string }>
}

export default async function ProductRootPage({ params }: Props) {
  const { categoria, modelo } = await params
  const product = await getProductBySlug(modelo)

  if (!product) notFound()

  if (!product.sizes || product.sizes.length === 0) {
    return (
      <div className="wrap" style={{ padding: '80px 0', textAlign: 'center' }}>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: '40px',
            textTransform: 'uppercase',
          }}
        >
          {product.name}
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', color: 'var(--muted)', marginTop: '16px' }}>
          Próximamente — consulta disponibilidad por WhatsApp.
        </p>
      </div>
    )
  }

  const defaultSize = getDefaultSize(product)
  const medidaSlug = sizeToSlug(defaultSize.medida)

  redirect(`/neumaticos-kenda-moto/${categoria}/${modelo}/${medidaSlug}/`)
}
