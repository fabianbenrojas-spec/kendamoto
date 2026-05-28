'use client'

import { useRouter } from 'next/navigation'
import { useTransition, useState } from 'react'
import Link from 'next/link'
import { sizeToSlug, formatPriceCLP } from '@/lib/products'
import type { Product, Size } from '@/lib/types'

interface Props {
  product: Product
  selectedSize: Size
  allSizes: Size[]
  categoria: string
  modelo: string
}

export function ProductPageClient({ product, selectedSize, allSizes, categoria, modelo }: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [localSize, setLocalSize] = useState<Size>(selectedSize)
  const [position, setPosition] = useState<'delantera' | 'trasera'>(
    selectedSize.position === 'trasera' ? 'trasera' : 'delantera'
  )

  function handleSizeSelect(size: Size) {
    setLocalSize(size)
    const medidaSlug = sizeToSlug(size.medida)
    startTransition(() => {
      router.replace(`/neumaticos-kenda-moto/${categoria}/${modelo}/${medidaSlug}/`, {
        scroll: false,
      })
    })
  }

  const delanterasSizes = allSizes.filter(
    s => s.position === 'delantera' || s.position === 'ambas'
  )
  const traserasSizes = allSizes.filter(s => s.position === 'trasera' || s.position === 'ambas')
  const availableSizes = position === 'delantera' ? delanterasSizes : traserasSizes

  const whatsappMsg = `Hola, me interesa el Kenda ${product.ref} medida ${localSize.medida}. ¿Tienen stock? ¿Cuál es el precio?`
  const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP?.replace(/[^0-9]/g, '') ?? '56900000000'}?text=${encodeURIComponent(whatsappMsg)}`

  return (
    <div style={{ opacity: isPending ? 0.92 : 1, transition: 'opacity 0.15s' }}>
      {isPending && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'var(--kenda)',
            zIndex: 999,
            animation: 'pulse 1s infinite',
          }}
        />
      )}

      {/* Product Hero */}
      <section style={{ background: 'var(--ink)', color: 'white', padding: '48px 0' }}>
        <div className="wrap">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '48px',
              alignItems: 'start',
            }}
          >
            {/* Left: Image placeholder */}
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
                {product.ref}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  color: 'var(--dim)',
                }}
              >
                {localSize.medida}
              </div>
            </div>

            {/* Right: Product info + size selector */}
            <div>
              <div className="eyebrow mb-3" style={{ color: 'var(--kenda)' }}>
                Kenda {product.ref}
              </div>
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: 'clamp(28px, 5vw, 48px)',
                  textTransform: 'uppercase',
                  letterSpacing: '-0.01em',
                  lineHeight: 0.95,
                  marginBottom: '8px',
                }}
              >
                {product.name}
              </h1>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '15px',
                  color: 'var(--dim)',
                  marginBottom: '24px',
                }}
              >
                {product.tagline}
              </p>

              {/* Price */}
              <div style={{ marginBottom: '24px' }}>
                {localSize.originalPriceCLP && (
                  <div
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      color: 'var(--dim)',
                      textDecoration: 'line-through',
                    }}
                  >
                    {formatPriceCLP(localSize.originalPriceCLP)}
                  </div>
                )}
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: '42px',
                    color: 'white',
                    letterSpacing: '-0.02em',
                    lineHeight: 1,
                  }}
                >
                  {formatPriceCLP(localSize.priceCLP)}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '12px',
                    color: 'var(--dim)',
                    marginTop: '4px',
                  }}
                >
                  CLP · IVA incluido · Envío gratis
                </div>
              </div>

              {/* Position toggle */}
              <div style={{ marginBottom: '16px' }}>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '11px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--dim)',
                    marginBottom: '8px',
                  }}
                >
                  Posición
                </div>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {delanterasSizes.length > 0 && (
                    <button
                      onClick={() => {
                        setPosition('delantera')
                        if (delanterasSizes.length > 0) handleSizeSelect(delanterasSizes[0])
                      }}
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        fontSize: '13px',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        padding: '8px 16px',
                        background: position === 'delantera' ? 'white' : 'transparent',
                        color: position === 'delantera' ? 'var(--ink)' : 'var(--dim)',
                        border:
                          position === 'delantera'
                            ? '1px solid white'
                            : '1px solid var(--line-dark)',
                        cursor: 'pointer',
                        transition: 'all 0.15s',
                      }}
                    >
                      Delantera
                    </button>
                  )}
                  {traserasSizes.length > 0 && (
                    <button
                      onClick={() => {
                        setPosition('trasera')
                        if (traserasSizes.length > 0) handleSizeSelect(traserasSizes[0])
                      }}
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        fontSize: '13px',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        padding: '8px 16px',
                        background: position === 'trasera' ? 'white' : 'transparent',
                        color: position === 'trasera' ? 'var(--ink)' : 'var(--dim)',
                        border:
                          position === 'trasera'
                            ? '1px solid white'
                            : '1px solid var(--line-dark)',
                        cursor: 'pointer',
                        transition: 'all 0.15s',
                      }}
                    >
                      Trasera
                    </button>
                  )}
                </div>
              </div>

              {/* Size selector */}
              <div style={{ marginBottom: '24px' }}>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '11px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--dim)',
                    marginBottom: '8px',
                  }}
                >
                  Medida — {localSize.medida}
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {availableSizes.map(size => (
                    <button
                      key={size.medida}
                      onClick={() => handleSizeSelect(size)}
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        fontSize: '13px',
                        padding: '8px 14px',
                        background:
                          size.medida === localSize.medida ? 'var(--kenda)' : 'transparent',
                        color: size.medida === localSize.medida ? 'white' : 'var(--dim)',
                        border:
                          size.medida === localSize.medida
                            ? '1px solid var(--kenda)'
                            : '1px solid var(--line-dark)',
                        cursor: 'pointer',
                        opacity: size.stock === 'out_of_stock' ? 0.4 : 1,
                        position: 'relative',
                      }}
                    >
                      {size.medida}
                      {size.stock === 'low_stock' && (
                        <span
                          style={{
                            position: 'absolute',
                            top: '-4px',
                            right: '-4px',
                            background: 'var(--amber)',
                            color: 'white',
                            borderRadius: '50%',
                            width: '12px',
                            height: '12px',
                            fontSize: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          !
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  Comprar por WhatsApp
                </a>
                <Link href="/mayoristas/cotizacion/" className="btn-ghost">
                  Cotizar cantidad
                </Link>
              </div>

              {/* Meta info */}
              <div
                style={{
                  marginTop: '20px',
                  display: 'flex',
                  gap: '16px',
                  flexWrap: 'wrap',
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  color: 'var(--dim)',
                }}
              >
                <span>TL/TT: {localSize.type.join('/')}</span>
                <span>Índice velocidad: {localSize.speedIndex}</span>
                <span>Carga: {localSize.loadIndex}</span>
                <span
                  style={{
                    color:
                      localSize.stock === 'in_stock'
                        ? 'var(--green)'
                        : localSize.stock === 'low_stock'
                        ? 'var(--amber)'
                        : 'var(--muted)',
                  }}
                >
                  {localSize.stock === 'in_stock'
                    ? '● En stock'
                    : localSize.stock === 'low_stock'
                    ? '● Stock limitado'
                    : '○ Sin stock'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description + Features */}
      <section style={{ padding: '64px 0', background: 'var(--paper)' }}>
        <div className="wrap">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '48px',
            }}
          >
            <div>
              <div className="eyebrow mb-4">Descripción</div>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '28px',
                  textTransform: 'uppercase',
                  letterSpacing: '-0.01em',
                  marginBottom: '16px',
                }}
              >
                {product.name} {localSize.medida}
              </h2>
              {localSize.seoText ? (
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '15px',
                    color: 'var(--muted)',
                    lineHeight: 1.7,
                  }}
                >
                  {localSize.seoText}
                </p>
              ) : (
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '15px',
                    color: 'var(--muted)',
                    lineHeight: 1.7,
                  }}
                >
                  {product.description}
                </p>
              )}
            </div>

            <div>
              <div className="eyebrow mb-4">Características</div>
              {product.features && product.features.length > 0 ? (
                <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
                  {product.features.map((feature, i) => (
                    <li
                      key={i}
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '14px',
                        color: 'var(--text)',
                        padding: '12px 0',
                        borderBottom: '1px solid var(--line)',
                        display: 'flex',
                        gap: '12px',
                        alignItems: 'flex-start',
                      }}
                    >
                      <span style={{ color: 'var(--kenda)', fontWeight: 700, flexShrink: 0 }}>
                        ✓
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              ) : null}

              {localSize.compatMotos && localSize.compatMotos.length > 0 && (
                <div style={{ marginTop: '24px' }}>
                  <div className="eyebrow mb-3">Motos compatibles</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {localSize.compatMotos.map(moto => (
                      <span
                        key={moto}
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '12px',
                          background: 'var(--cream)',
                          border: '1px solid var(--line)',
                          padding: '4px 10px',
                          color: 'var(--text)',
                        }}
                      >
                        {moto}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* All sizes table */}
      <section style={{ padding: '48px 0', background: 'var(--cream)' }}>
        <div className="wrap">
          <div className="eyebrow mb-4">Todas las medidas disponibles</div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: '28px',
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
              marginBottom: '24px',
            }}
          >
            {product.name} — Medidas
          </h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'var(--ink)', color: 'white' }}>
                  {['Medida', 'Posición', 'Tipo', 'Vel.', 'Carga', 'Precio', 'Stock', ''].map(
                    h => (
                      <th
                        key={h}
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 700,
                          fontSize: '11px',
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          padding: '12px 16px',
                          textAlign: 'left',
                        }}
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {allSizes.map(size => (
                  <tr
                    key={size.medida}
                    style={{
                      background:
                        size.medida === localSize.medida ? 'var(--kenda-tint)' : 'white',
                      borderBottom: '1px solid var(--line)',
                    }}
                  >
                    <td
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        fontSize: '14px',
                        padding: '12px 16px',
                      }}
                    >
                      {size.medida}
                    </td>
                    <td
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '13px',
                        padding: '12px 16px',
                        textTransform: 'capitalize',
                      }}
                    >
                      {size.position}
                    </td>
                    <td
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '13px',
                        padding: '12px 16px',
                      }}
                    >
                      {size.type.join('/')}
                    </td>
                    <td
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '13px',
                        padding: '12px 16px',
                      }}
                    >
                      {size.speedIndex}
                    </td>
                    <td
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '13px',
                        padding: '12px 16px',
                      }}
                    >
                      {size.loadIndex}
                    </td>
                    <td
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        fontSize: '15px',
                        padding: '12px 16px',
                      }}
                    >
                      {formatPriceCLP(size.priceCLP)}
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '12px',
                          color:
                            size.stock === 'in_stock'
                              ? 'var(--green)'
                              : size.stock === 'low_stock'
                              ? 'var(--amber)'
                              : 'var(--muted)',
                        }}
                      >
                        {size.stock === 'in_stock'
                          ? 'En stock'
                          : size.stock === 'low_stock'
                          ? 'Stock limitado'
                          : 'Sin stock'}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <button
                        onClick={() => handleSizeSelect(size)}
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 700,
                          fontSize: '11px',
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          background:
                            size.medida === localSize.medida ? 'var(--kenda)' : 'transparent',
                          color:
                            size.medida === localSize.medida ? 'white' : 'var(--kenda)',
                          border: '1px solid var(--kenda)',
                          padding: '6px 12px',
                          cursor: 'pointer',
                        }}
                      >
                        {size.medida === localSize.medida ? 'Seleccionada' : 'Seleccionar'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  )
}
