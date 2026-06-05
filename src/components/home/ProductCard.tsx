'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { formatPriceCLP, sizeToSlug, getDefaultSize } from '@/lib/products'
import { IMAGE_BLUR_MAP } from '@/data/image-blur-map'
import type { Product } from '@/lib/types'

export function ProductCard({ product }: { product: Product }) {
  const defaultSize = getDefaultSize(product)
  const defaultSizeSlug = defaultSize ? sizeToSlug(defaultSize.medida) : null
  const href = defaultSizeSlug
    ? `/neumaticos-kenda-moto/${product.category}/${product.slug}/${defaultSizeSlug}/`
    : `/neumaticos-kenda-moto/${product.category}/${product.slug}/`

  const slug = product.ref.toLowerCase()
  const src = `/images/products/${slug}/${slug}-principal.webp`
  const blur = IMAGE_BLUR_MAP[src]
  const [hasError, setHasError] = useState(false)

  return (
    <Link
      href={href}
      style={{ textDecoration: 'none', display: 'block', height: '100%' }}
    >
      <div
        className="product-card"
        style={{
          background: 'white',
          border: '1px solid var(--line)',
          padding: '24px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            background: 'var(--ink)',
            position: 'relative',
            aspectRatio: '4/3',
            marginBottom: '20px',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {hasError ? (
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '28px',
                color: 'var(--kenda)',
                letterSpacing: '0.06em',
              }}
            >
              {product.ref}
            </span>
          ) : (
            <Image
              src={src}
              alt={`Kenda ${product.ref} neumático moto Chile`}
              fill
              style={{ objectFit: 'contain', padding: '12px' }}
              sizes="(max-width: 640px) 50vw, (max-width: 1200px) 33vw, 280px"
              placeholder={blur ? 'blur' : 'empty'}
              blurDataURL={blur}
              onError={() => setHasError(true)}
            />
          )}
        </div>

        <div style={{ flex: 1 }}>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '12px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--kenda)',
              marginBottom: '4px',
            }}
          >
            Kenda {product.ref}
          </div>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: '20px',
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
              color: 'var(--text)',
              marginBottom: '4px',
            }}
          >
            {product.name}
          </div>
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              color: 'var(--muted)',
              marginBottom: '16px',
            }}
          >
            {product.tagline}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                color: 'var(--muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              Desde
            </div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '22px',
                color: 'var(--text)',
              }}
            >
              {defaultSize ? formatPriceCLP(defaultSize.priceCLP) : 'Consultar'}
            </div>
          </div>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '12px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--kenda)',
            }}
          >
            Ver →
          </div>
        </div>
      </div>
    </Link>
  )
}
