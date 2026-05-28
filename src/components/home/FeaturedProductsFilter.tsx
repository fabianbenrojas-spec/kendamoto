'use client'

import { useState } from 'react'
import { ProductCard } from './ProductCard'
import type { Product } from '@/lib/types'

const FILTERS = [
  { id: 'todos', label: 'Todos' },
  { id: 'trail-adventure', label: 'Trail' },
  { id: 'enduro', label: 'Enduro' },
  { id: 'cross-motocross', label: 'Motocross' },
  { id: 'dual-sport', label: 'Dual Sport' },
  { id: 'calle-carretera', label: 'Calle' },
]

export function FeaturedProductsFilter({ products }: { products: Product[] }) {
  const [active, setActive] = useState('todos')

  const filtered =
    active === 'todos' ? products : products.filter(p => p.category === active)

  return (
    <div>
      {/* Filter pills */}
      <div
        style={{
          display: 'flex',
          gap: '6px',
          flexWrap: 'wrap',
          marginBottom: '28px',
        }}
      >
        {FILTERS.map(f => {
          const isActive = active === f.id
          return (
            <button
              key={f.id}
              onClick={() => setActive(f.id)}
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '12px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                padding: '8px 16px',
                background: isActive ? 'var(--ink)' : 'transparent',
                color: isActive ? 'white' : 'var(--muted)',
                border: isActive ? '1px solid var(--ink)' : '1px solid var(--line-2)',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {f.label}
            </button>
          )
        })}
      </div>

      {/* Products grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '16px',
        }}
      >
        {filtered.length > 0 ? (
          filtered.map(product => <ProductCard key={product.slug} product={product} />)
        ) : (
          <div
            style={{
              gridColumn: '1 / -1',
              padding: '40px',
              textAlign: 'center',
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              color: 'var(--muted)',
            }}
          >
            No hay productos destacados en esta categoría.
          </div>
        )}
      </div>
    </div>
  )
}
