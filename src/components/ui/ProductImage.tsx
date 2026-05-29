'use client'

import Image from 'next/image'
import { useState } from 'react'
import { IMAGE_BLUR_MAP } from '@/data/image-blur-map'

interface ProductImageProps {
  slug: string       // product.ref.toLowerCase() — e.g. 'k784'
  modelName: string  // e.g. 'K784 Big Block'
  medida: string     // e.g. '90/90B21'
  categoria: string  // e.g. 'trail adventure' (spaces, not dashes)
  posicion: string   // e.g. 'delantera'
  variant?: 'principal' | 'tread' | 'flanco'
  priority?: boolean
}

function buildAlt({ modelName, medida, categoria, posicion }: ProductImageProps): string {
  return `Kenda ${modelName} ${medida} neumático ${categoria} ${posicion} Chile`
}

export function ProductImage({
  slug,
  modelName,
  medida,
  categoria,
  posicion,
  variant = 'principal',
  priority = false,
}: ProductImageProps) {
  const [hasError, setHasError] = useState(false)

  const src = `/images/products/${slug}/${slug}-${variant}.webp`
  const alt = buildAlt({ slug, modelName, medida, categoria, posicion, variant })
  const blur = IMAGE_BLUR_MAP[src]

  if (hasError) {
    return (
      <div
        style={{
          background: 'var(--ink-2)',
          border: '1px solid var(--line-dark)',
          aspectRatio: '4/3',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '8px',
        }}
        role="img"
        aria-label={alt}
      >
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: '48px',
            color: 'var(--kenda)',
            letterSpacing: '0.06em',
          }}
        >
          {slug.toUpperCase()}
        </div>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--dim)' }}>
          {medida}
        </div>
      </div>
    )
  }

  return (
    <div
      style={{
        position: 'relative',
        aspectRatio: '4/3',
        overflow: 'hidden',
        background: 'var(--ink-2)',
        border: '1px solid var(--line-dark)',
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        style={{ objectFit: 'contain', padding: '16px' }}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
        priority={priority}
        placeholder={blur ? 'blur' : 'empty'}
        blurDataURL={blur}
        onError={() => setHasError(true)}
        title={`${modelName} ${medida} — Kenda Moto Chile`}
      />
    </div>
  )
}
