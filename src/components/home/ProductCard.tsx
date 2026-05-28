'use client'

import Link from 'next/link'
import { formatPriceCLP } from '@/lib/products'
import type { Product } from '@/lib/types'

export function ProductCard({ product }: { product: Product }) {
  const defaultSize = product.sizes?.find(s => s.stock === 'in_stock') ?? product.sizes?.[0]

  return (
    <Link
      href={`/neumaticos-kenda-moto/${product.category}/${product.slug}/`}
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
            height: '160px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: '28px',
            color: 'var(--kenda)',
            letterSpacing: '0.06em',
          }}
        >
          {product.ref}
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
