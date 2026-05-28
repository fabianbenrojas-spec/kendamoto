'use client'

import { useState } from 'react'
import { WHATSAPP_NUMBER } from '@/lib/site'

interface QuoteProduct {
  ref: string
  name: string
  size: string
  slug: string
  cat: string
  basePrice: number
}

const PRODUCTS: QuoteProduct[] = [
  {
    ref: 'K784',
    name: 'Big Block',
    size: '90/90B21',
    slug: 'kenda-k784-big-block',
    cat: 'trail-adventure',
    basePrice: 79990,
  },
  {
    ref: 'K784',
    name: 'Big Block',
    size: '150/70B17',
    slug: 'kenda-k784-big-block',
    cat: 'trail-adventure',
    basePrice: 99990,
  },
  {
    ref: 'K779',
    name: 'Knarly',
    size: '80/100-21',
    slug: 'kenda-k779',
    cat: 'enduro',
    basePrice: 69990,
  },
  {
    ref: 'K778',
    name: 'Knarly',
    size: '120/90-18',
    slug: 'kenda-k778',
    cat: 'enduro',
    basePrice: 79990,
  },
  {
    ref: 'K785',
    name: 'Millville II',
    size: '80/100-21',
    slug: 'kenda-k785-millville',
    cat: 'cross-motocross',
    basePrice: 59990,
  },
  {
    ref: 'K761',
    name: 'Dual Sport',
    size: '90/90-21',
    slug: 'kenda-k761-dual-sport',
    cat: 'dual-sport',
    basePrice: 54990,
  },
]

function getTierDiscount(qty: number): number {
  if (qty >= 50) return 0.45
  if (qty >= 12) return 0.35
  if (qty >= 6) return 0.25
  return 0
}

function getTierLabel(qty: number): string {
  if (qty >= 50) return '−45% (Plan Premium)'
  if (qty >= 12) return '−35% (Plan Distribuidor)'
  if (qty >= 6) return '−25% (Plan Básico)'
  return 'Precio público'
}

function fmt(n: number) {
  return `$${Math.round(n).toLocaleString('es-CL')}`
}

export function QuoteCalculator() {
  const [qtys, setQtys] = useState<number[]>(PRODUCTS.map(() => 0))

  const setQty = (i: number, v: number) => {
    const next = [...qtys]
    next[i] = Math.max(0, Math.min(99, v))
    setQtys(next)
  }

  const totalUnits = qtys.reduce((a, b) => a + b, 0)
  const discount = getTierDiscount(totalUnits)

  const lines = PRODUCTS.map((p, i) => {
    const qty = qtys[i]
    const unitPrice = p.basePrice * (1 - discount)
    return { ...p, qty, unitPrice, lineTotal: qty * unitPrice }
  }).filter(l => l.qty > 0)

  const grandTotal = lines.reduce((a, l) => a + l.lineTotal, 0)

  const buildWAMessage = () => {
    const linesText = lines
      .map(l => `${l.qty}x Kenda ${l.ref} ${l.name} ${l.size} → ${fmt(l.lineTotal)}`)
      .join(' | ')
    return [
      `Cotización mayorista Kenda Moto:`,
      linesText,
      `Total: ${fmt(grandTotal)} (${totalUnits} unid., descuento ${(discount * 100).toFixed(0)}%)`,
    ].join(' ')
  }

  return (
    <div
      style={{
        background: 'var(--cream)',
        border: '1px solid var(--line)',
        padding: '32px',
      }}
    >
      <div className="eyebrow mb-3">Calculadora de cotización</div>
      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: '24px',
          textTransform: 'uppercase',
          letterSpacing: '-0.01em',
          marginBottom: '8px',
        }}
      >
        Cotiza tu pedido B2B
      </h3>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '13px',
          color: 'var(--muted)',
          marginBottom: '24px',
          lineHeight: 1.5,
        }}
      >
        Agrega cantidades. El descuento se calcula automáticamente según el total de unidades.
      </p>

      {/* Tier badges */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap',
          marginBottom: '24px',
        }}
      >
        {[
          { min: 6, label: '≥ 6 unid.', discount: '−25%', plan: 'Básico' },
          { min: 12, label: '≥ 12 unid.', discount: '−35%', plan: 'Distribuidor' },
          { min: 50, label: '≥ 50 unid.', discount: '−45%', plan: 'Premium' },
        ].map(tier => {
          const active = totalUnits >= tier.min
          return (
            <div
              key={tier.min}
              style={{
                padding: '6px 12px',
                background: active ? 'var(--kenda)' : 'var(--line)',
                color: active ? 'white' : 'var(--muted)',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '11px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                transition: 'all 0.2s',
              }}
            >
              {tier.label} → {tier.discount} {tier.plan}
            </div>
          )
        })}
      </div>

      {/* Product lines */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', marginBottom: '24px' }}>
        {PRODUCTS.map((p, i) => {
          const qty = qtys[i]
          const unitPrice = p.basePrice * (1 - discount)
          const lineTotal = qty * unitPrice
          return (
            <div
              key={`${p.ref}-${p.size}`}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto auto',
                gap: '16px',
                alignItems: 'center',
                background: qty > 0 ? 'white' : 'var(--paper)',
                padding: '14px 16px',
                border: '1px solid var(--line)',
                borderColor: qty > 0 ? 'var(--kenda)' : 'var(--line)',
                transition: 'all 0.15s',
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '11px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--kenda)',
                    marginBottom: '2px',
                  }}
                >
                  Kenda {p.ref} · {p.size}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '14px',
                    color: 'var(--text)',
                  }}
                >
                  {p.name}
                </div>
                {qty > 0 && (
                  <div
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '12px',
                      color: 'var(--muted)',
                      marginTop: '2px',
                    }}
                  >
                    {fmt(unitPrice)} × {qty} = {fmt(lineTotal)}
                  </div>
                )}
              </div>

              {/* Qty stepper */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
                <button
                  onClick={() => setQty(i, qty - 1)}
                  style={{
                    width: '32px',
                    height: '32px',
                    border: '1px solid var(--line-2)',
                    background: 'white',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text)',
                  }}
                >
                  −
                </button>
                <input
                  type="number"
                  min={0}
                  max={99}
                  value={qty}
                  onChange={e => setQty(i, parseInt(e.target.value) || 0)}
                  style={{
                    width: '44px',
                    height: '32px',
                    border: '1px solid var(--line-2)',
                    borderLeft: 'none',
                    borderRight: 'none',
                    textAlign: 'center',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '14px',
                    background: 'white',
                    outline: 'none',
                  }}
                />
                <button
                  onClick={() => setQty(i, qty + 1)}
                  style={{
                    width: '32px',
                    height: '32px',
                    border: '1px solid var(--line-2)',
                    background: 'white',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text)',
                  }}
                >
                  +
                </button>
              </div>

              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '16px',
                  color: qty > 0 ? 'var(--kenda)' : 'var(--dim)',
                  minWidth: '80px',
                  textAlign: 'right',
                }}
              >
                {qty > 0 ? fmt(lineTotal) : '—'}
              </div>
            </div>
          )
        })}
      </div>

      {/* Total + CTA */}
      <div
        style={{
          background: 'var(--ink)',
          padding: '20px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: totalUnits > 0 ? '16px' : '0',
        }}
      >
        <div>
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              color: 'var(--dim)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}
          >
            {totalUnits} unidades · {getTierLabel(totalUnits)}
          </div>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: '28px',
              color: 'white',
              letterSpacing: '-0.02em',
            }}
          >
            {totalUnits > 0 ? fmt(grandTotal) : '—'}
          </div>
          {totalUnits > 0 && (
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                color: 'var(--dim)',
                marginTop: '2px',
              }}
            >
              Precio estimado · IVA no incluido
            </div>
          )}
        </div>

        {totalUnits > 0 && (
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(buildWAMessage())}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Enviar cotización por WhatsApp
          </a>
        )}
      </div>

      {totalUnits === 0 && (
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            color: 'var(--dim)',
            textAlign: 'center',
          }}
        >
          Agrega cantidades para calcular tu cotización
        </p>
      )}
    </div>
  )
}
