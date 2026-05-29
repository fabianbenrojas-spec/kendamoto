'use client'

import { useState, useCallback } from 'react'
import { WHATSAPP_NUMBER } from '@/lib/site'

const PRODUCTOS = [
  { model: 'K784-90-90B21',  name: 'K784 Big Block 90/90B21',  price: 79990 },
  { model: 'K784-150-70B17', name: 'K784 Big Block 150/70B17', price: 99990 },
  { model: 'K779-80-100-21', name: 'K779 Knarly 80/100-21',    price: 69990 },
  { model: 'K778-120-90-18', name: 'K778 Knarly 120/90-18',    price: 79990 },
  { model: 'K785-80-100-21', name: 'K785 Millville 80/100-21', price: 59990 },
  { model: 'K761-90-90-21',  name: 'K761 Dual Sport 90/90-21', price: 69990 },
]

function getTier(units: number) {
  if (units >= 50) return { name: 'Plan Premium',      pct: 0.45 }
  if (units >= 12) return { name: 'Plan Distribuidor', pct: 0.35 }
  if (units >= 6)  return { name: 'Plan Básico',       pct: 0.25 }
  return             { name: 'Sin descuento',          pct: 0 }
}

function fmt(n: number) {
  return '$' + Math.round(n).toLocaleString('es-CL')
}

export function QuoteCalculator() {
  const [qtys, setQtys] = useState<Record<string, number>>(
    Object.fromEntries(PRODUCTOS.map(p => [p.model, 0]))
  )

  const update = useCallback((model: string, delta: number) => {
    setQtys(prev => ({
      ...prev,
      [model]: Math.max(0, Math.min(99, (prev[model] ?? 0) + delta)),
    }))
  }, [])

  const totalUnits = Object.values(qtys).reduce((a, b) => a + b, 0)
  const subtotal   = PRODUCTOS.reduce((s, p) => s + (qtys[p.model] ?? 0) * p.price, 0)
  const tier       = getTier(totalUnits)
  const discount   = subtotal * tier.pct
  const neto       = subtotal - discount
  const iva        = neto * 0.19
  const total      = neto + iva
  const shipping   = totalUnits >= 20 ? 'Bonificado ✓' : totalUnits > 0 ? '≈ $25.000' : '—'

  const waMessage = () => {
    const lines = PRODUCTOS
      .filter(p => (qtys[p.model] ?? 0) > 0)
      .map(p => `• ${qtys[p.model]}x ${p.name} — ${fmt((qtys[p.model] ?? 0) * p.price)}`)
    return encodeURIComponent(
      `Hola Kenda Moto, quiero cotización mayorista:\n` +
      lines.join('\n') +
      `\nPlan: ${tier.name}${tier.pct > 0 ? ` (−${tier.pct * 100}%)` : ''}` +
      `\nNeto: ${fmt(neto)} · IVA: ${fmt(iva)} · Total: ${fmt(total)}`
    )
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
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--muted)', marginBottom: '24px', lineHeight: 1.5 }}>
        Agrega cantidades. El descuento se calcula automáticamente según el total de unidades.
      </p>

      {/* Tier badges */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
        {[
          { label: '≥ 6 unid. → −25% Básico',       active: totalUnits >= 6 && totalUnits < 12 },
          { label: '≥ 12 unid. → −35% Distribuidor', active: totalUnits >= 12 && totalUnits < 50 },
          { label: '≥ 50 unid. → −45% Premium',      active: totalUnits >= 50 },
        ].map(b => (
          <div
            key={b.label}
            style={{
              padding: '6px 12px',
              background: b.active ? 'var(--kenda)' : 'var(--line)',
              color: b.active ? 'white' : 'var(--muted)',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '11px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              transition: 'all 0.2s',
            }}
          >
            {b.label}
          </div>
        ))}
      </div>

      {/* Product lines */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', marginBottom: '24px' }}>
        {PRODUCTOS.map(p => {
          const qty = qtys[p.model] ?? 0
          const lineTotal = qty * p.price
          return (
            <div
              key={p.model}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto auto',
                gap: '16px',
                alignItems: 'center',
                background: qty > 0 ? 'white' : 'var(--paper)',
                padding: '14px 16px',
                border: '1px solid',
                borderColor: qty > 0 ? 'var(--kenda)' : 'var(--line)',
                transition: 'all 0.15s',
              }}
            >
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--kenda)', marginBottom: '2px' }}>
                  {p.model.replace(/-/g, ' ')}
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px', color: 'var(--text)' }}>
                  {p.name}
                </div>
                {qty > 0 && tier.pct > 0 && (
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--muted)', marginTop: '2px' }}>
                    {fmt(p.price * (1 - tier.pct))} neto × {qty} = {fmt(lineTotal * (1 - tier.pct))}
                  </div>
                )}
              </div>

              {/* Stepper */}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <button
                  onClick={() => update(p.model, -1)}
                  style={{ width: '32px', height: '32px', border: '1px solid var(--line-2)', background: 'white', cursor: 'pointer', fontWeight: 700, fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text)' }}
                >
                  −
                </button>
                <input
                  type="number"
                  min={0}
                  max={99}
                  value={qty}
                  onChange={e =>
                    setQtys(prev => ({ ...prev, [p.model]: Math.max(0, Math.min(99, parseInt(e.target.value) || 0)) }))
                  }
                  style={{ width: '44px', height: '32px', textAlign: 'center', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px', border: 'none', borderTop: '1px solid var(--line-2)', borderBottom: '1px solid var(--line-2)', background: 'white', outline: 'none' }}
                />
                <button
                  onClick={() => update(p.model, +1)}
                  style={{ width: '32px', height: '32px', border: '1px solid var(--line-2)', background: 'white', cursor: 'pointer', fontWeight: 700, fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text)' }}
                >
                  +
                </button>
              </div>

              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '16px', color: qty > 0 ? 'var(--kenda)' : 'var(--dim)', minWidth: '90px', textAlign: 'right' }}>
                {qty > 0 ? fmt(lineTotal) : '—'}
              </div>
            </div>
          )
        })}
      </div>

      {/* Summary bar */}
      <div
        style={{
          background: 'var(--ink)',
          padding: '20px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--dim)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            {totalUnits} unidades · {tier.name}{tier.pct > 0 ? ` (−${tier.pct * 100}%)` : ''}
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '28px', color: 'white', letterSpacing: '-0.02em' }}>
            {totalUnits > 0 ? fmt(total) : '—'}
          </div>
          {totalUnits > 0 && (
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--dim)', marginTop: '2px' }}>
              Neto {fmt(neto)} · IVA 19% {fmt(iva)} · Flete: {shipping}
            </div>
          )}
        </div>

        {totalUnits > 0 && (
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${waMessage()}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Enviar cotización por WhatsApp
          </a>
        )}
      </div>

      {totalUnits === 0 && (
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--dim)', textAlign: 'center', marginTop: '16px' }}>
          Agrega cantidades para calcular tu cotización
        </p>
      )}
    </div>
  )
}

export default QuoteCalculator
