import { ImageResponse } from 'next/og'
import { getProductBySlug, getSizeFromSlug, formatPriceCLP } from '@/lib/products'

export const runtime = 'nodejs'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

interface Props {
  params: Promise<{ categoria: string; modelo: string; medida: string }>
}

export default async function OGImage({ params }: Props) {
  const { categoria, modelo, medida } = await params
  const product = await getProductBySlug(modelo)
  const selectedSize = product ? getSizeFromSlug(product, medida) : null

  const productName = product?.name ?? 'Neumático Kenda'
  const medidaLabel = selectedSize?.medida ?? medida.replace(/-/g, '/')
  const categoriaLabel = categoria.replace(/-/g, ' ').toUpperCase()
  const priceLabel = selectedSize ? formatPriceCLP(selectedSize.priceCLP) : ''

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: '#141414',
          display: 'flex',
          flexDirection: 'column',
          padding: '64px',
          justifyContent: 'space-between',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div
            style={{
              background: '#E30613',
              color: 'white',
              fontSize: '30px',
              fontWeight: 900,
              padding: '8px 20px',
              letterSpacing: '-0.01em',
            }}
          >
            KENDA
          </div>
          <div
            style={{
              color: '#666',
              fontSize: '16px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            MOTO CHILE · Distribuidor Oficial
          </div>
        </div>

        {/* Central content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div
            style={{
              color: '#E30613',
              fontSize: '16px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            {categoriaLabel}
          </div>
          <div
            style={{
              color: 'white',
              fontSize: 'clamp(48px, 8vw, 72px)',
              fontWeight: 900,
              lineHeight: 0.9,
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              display: 'flex',
            }}
          >
            {productName}
          </div>
          <div
            style={{
              color: '#aaa',
              fontSize: '36px',
              fontWeight: 700,
              letterSpacing: '0.04em',
              display: 'flex',
            }}
          >
            {medidaLabel}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {priceLabel && (
              <div
                style={{
                  color: 'white',
                  fontSize: '40px',
                  fontWeight: 900,
                  display: 'flex',
                }}
              >
                {priceLabel} CLP
              </div>
            )}
            <div
              style={{
                color: '#555',
                fontSize: '14px',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                display: 'flex',
              }}
            >
              IVA incluido · Envío gratis · Stock ZOFRI Iquique
            </div>
          </div>
          <div
            style={{
              color: '#E30613',
              fontSize: '16px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              display: 'flex',
            }}
          >
            kendamoto.cl
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
