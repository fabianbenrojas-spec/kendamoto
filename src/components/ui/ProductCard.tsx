'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { IMAGE_BLUR_MAP } from '@/data/image-blur-map'
import { formatPriceCLP } from '@/lib/products'

interface ProductCardProps {
  slug: string          // product.ref.toLowerCase() — e.g. 'k784'
  modelName: string     // e.g. 'K784 Big Block'
  categoria: string     // URL segment, e.g. 'trail-adventure'
  medidaSlug: string    // URL segment, e.g. '90-90b21'
  medidaLabel: string   // display, e.g. '90/90B21'
  posicion: string      // e.g. 'delantera'
  priceFrom: number     // lowest priceCLP across sizes
}

export function ProductCard({
  slug,
  modelName,
  categoria,
  medidaSlug,
  medidaLabel,
  posicion,
  priceFrom,
}: ProductCardProps) {
  const [hasError, setHasError] = useState(false)

  const src = `/images/products/${slug}/${slug}-principal.webp`
  const blur = IMAGE_BLUR_MAP[src]
  const alt = `Kenda ${modelName} ${medidaLabel} neumático moto ${posicion} Chile`
  const href = `/neumaticos-kenda-moto/${categoria}/${slug}/${medidaSlug}/`

  return (
    <Link
      href={href}
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--ink-2)',
        border: '1px solid var(--line-dark)',
        textDecoration: 'none',
        transition: 'border-color 0.15s',
      }}
    >
      {/* Image area */}
      <div
        style={{
          position: 'relative',
          aspectRatio: '4/3',
          overflow: 'hidden',
          background: 'var(--ink)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {hasError ? (
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: '36px',
              color: 'var(--kenda)',
              letterSpacing: '0.06em',
            }}
          >
            {slug.toUpperCase()}
          </div>
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            style={{ objectFit: 'contain', padding: '12px' }}
            sizes="(max-width: 640px) 50vw, (max-width: 1200px) 33vw, 280px"
            placeholder={blur ? 'blur' : 'empty'}
            blurDataURL={blur}
            onError={() => setHasError(true)}
          />
        )}
      </div>

      {/* Info */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: '18px',
            color: 'white',
            letterSpacing: '0.02em',
            textTransform: 'uppercase',
          }}
        >
          {modelName}
        </div>
        <div
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            color: 'var(--dim)',
            letterSpacing: '0.04em',
          }}
        >
          {medidaLabel} · {posicion}
        </div>
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '16px',
            color: 'var(--kenda)',
            marginTop: '8px',
          }}
        >
          Desde {formatPriceCLP(priceFrom)}
        </div>
      </div>
    </Link>
  )
}
