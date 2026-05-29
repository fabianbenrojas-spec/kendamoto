'use client'

import Image from 'next/image'
import { useState } from 'react'

type BrandImageVariant = 'logo' | 'bodega' | 'stock'

const BRAND_IMAGES: Record<BrandImageVariant, { src: string; alt: string; width: number; height: number; placeholder: string }> = {
  logo: {
    src: '/images/brand/kenda-logo.png',
    alt: 'Kenda Tires — distribuidor oficial Chile Carioca Chile Ltda',
    width: 200,
    height: 80,
    placeholder: 'KENDA',
  },
  bodega: {
    src: '/images/brand/bodega-zofri-iquique.webp',
    alt: 'Bodega Carioca Chile Ltda ZOFRI Iquique — stock neumáticos Kenda distribuidor oficial',
    width: 800,
    height: 500,
    placeholder: 'Bodega ZOFRI Iquique',
  },
  stock: {
    src: '/images/brand/kenda-stock-cajas.webp',
    alt: 'Stock neumáticos Kenda moto en bodega ZOFRI Iquique Chile — más de 200 referencias',
    width: 800,
    height: 500,
    placeholder: 'Stock Kenda +200 refs.',
  },
}

export function BrandImage({ variant }: { variant: BrandImageVariant }) {
  const [hasError, setHasError] = useState(false)
  const img = BRAND_IMAGES[variant]

  if (hasError) {
    if (variant === 'logo') {
      return (
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#E30613',
            color: 'white',
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            fontSize: '24px',
            letterSpacing: '0.04em',
            padding: '8px 20px',
            width: img.width,
            height: img.height,
          }}
          role="img"
          aria-label={img.alt}
        >
          KENDA
        </div>
      )
    }

    return (
      <div
        style={{
          width: '100%',
          aspectRatio: `${img.width} / ${img.height}`,
          background: '#1a1a1a',
          border: '1px solid #2a2a2a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '6px',
        }}
        role="img"
        aria-label={img.alt}
      >
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: '20px',
            letterSpacing: '0.06em',
            color: '#E30613',
            textTransform: 'uppercase',
          }}
        >
          KENDA
        </div>
        <div
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '12px',
            color: '#444',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          {img.placeholder}
        </div>
      </div>
    )
  }

  return (
    <Image
      src={img.src}
      alt={img.alt}
      width={img.width}
      height={img.height}
      style={{ maxWidth: '100%', height: 'auto' }}
      title="Carioca Chile Ltda. — Importador oficial Kenda Tires® en Chile desde 2000"
      onError={() => setHasError(true)}
    />
  )
}
