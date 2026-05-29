'use client'

import Image from 'next/image'
import { useState } from 'react'

type BrandImageVariant = 'logo' | 'bodega' | 'stock'

const BRAND_IMAGES: Record<BrandImageVariant, { src: string; alt: string; width: number; height: number }> = {
  logo: {
    src: '/images/brand/kenda-logo.png',
    alt: 'Kenda Tires — distribuidor oficial Chile Carioca Chile Ltda',
    width: 200,
    height: 80,
  },
  bodega: {
    src: '/images/brand/bodega-zofri-iquique.webp',
    alt: 'Bodega Carioca Chile Ltda ZOFRI Iquique — stock neumáticos Kenda distribuidor oficial',
    width: 800,
    height: 500,
  },
  stock: {
    src: '/images/brand/kenda-stock-cajas.webp',
    alt: 'Stock neumáticos Kenda moto en bodega ZOFRI Iquique Chile — más de 200 referencias',
    width: 800,
    height: 500,
  },
}

export function BrandImage({ variant }: { variant: BrandImageVariant }) {
  const [hasError, setHasError] = useState(false)
  const img = BRAND_IMAGES[variant]

  if (hasError) return null

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
