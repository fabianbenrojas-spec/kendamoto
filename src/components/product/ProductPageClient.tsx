'use client'

import { useRouter } from 'next/navigation'
import { useTransition, useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { sizeToSlug, formatPriceCLP } from '@/lib/products'
import type { Product, Size } from '@/lib/types'

interface Props {
  product: Product
  selectedSize: Size
  allSizes: Size[]
  categoria: string
  modelo: string
  relatedProducts: Product[]
}

/* ── Usage Mixer data ──────────────────────────────────────── */

const SCENARIOS = [
  {
    id: 'mixto',
    label: 'Uso mixto',
    desc: 'Carretera y off-road',
    bars: { traccion: 75, durabilidad: 80, confort: 70, peso: 65 },
  },
  {
    id: 'offroad',
    label: 'Off-road',
    desc: 'Tierra, ripio, sendero',
    bars: { traccion: 95, durabilidad: 70, confort: 50, peso: 60 },
  },
  {
    id: 'largo',
    label: 'Largo recorrido',
    desc: 'Rutas pavimentadas',
    bars: { traccion: 60, durabilidad: 90, confort: 85, peso: 70 },
  },
]

const BAR_LABELS: Record<string, string> = {
  traccion: 'Tracción',
  durabilidad: 'Durabilidad',
  confort: 'Confort',
  peso: 'Peso',
}

/* ── Static reviews (3 per product) ───────────────────────── */

const REVIEWS: Record<string, Array<{ name: string; loc: string; rating: number; text: string; date: string }>> = {
  default: [
    {
      name: 'Carlos M.',
      loc: 'Santiago',
      rating: 5,
      text: 'Excelente neumático. Agarre en tierra y confort en asfalto. Llegó rápido desde Iquique, todo bien empacado.',
      date: 'Marzo 2025',
    },
    {
      name: 'Jorge P.',
      loc: 'Concepción',
      rating: 5,
      text: 'Originales, mismo precio que en la marca. Atención por WhatsApp muy rápida. Los recomiendo.',
      date: 'Febrero 2025',
    },
    {
      name: 'Sebastián R.',
      loc: 'Puerto Montt',
      rating: 4,
      text: 'Buena calidad Kenda, cumple lo prometido. Despacho en 3 días hasta el sur, correcto.',
      date: 'Enero 2025',
    },
  ],
}

function Stars({ rating }: { rating: number }) {
  return (
    <span style={{ color: '#f59e0b', fontSize: '14px', letterSpacing: '1px' }}>
      {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
    </span>
  )
}

/* ── Main component ────────────────────────────────────────── */

export function ProductPageClient({ product, selectedSize, allSizes, categoria, modelo, relatedProducts }: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [localSize, setLocalSize] = useState<Size>(selectedSize)
  const [position, setPosition] = useState<'delantera' | 'trasera'>(
    selectedSize.position === 'trasera' ? 'trasera' : 'delantera'
  )
  const [qty, setQty] = useState(1)
  const [activeTab, setActiveTab] = useState<'descripcion' | 'specs' | 'medidas' | 'garantia'>('descripcion')
  const [activeScenario, setActiveScenario] = useState('mixto')
  const [stickyVisible, setStickyVisible] = useState(false)

  /* Scroll listener for sticky bar */
  useEffect(() => {
    const handleScroll = () => setStickyVisible(window.scrollY > 600)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function handleSizeSelect(size: Size) {
    setLocalSize(size)
    const medidaSlug = sizeToSlug(size.medida)
    startTransition(() => {
      router.replace(`/neumaticos-kenda-moto/${categoria}/${modelo}/${medidaSlug}/`, {
        scroll: false,
      })
    })
  }

  const delanterasSizes = allSizes.filter(s => s.position === 'delantera' || s.position === 'ambas')
  const traserasSizes = allSizes.filter(s => s.position === 'trasera' || s.position === 'ambas')
  const availableSizes = position === 'delantera' ? delanterasSizes : traserasSizes

  const totalPrice = qty * localSize.priceCLP
  const cuotasPrice = Math.round(totalPrice / 12)

  const whatsappMsg =
    qty > 1
      ? `Hola, quiero comprar ${qty} unidades del Kenda ${product.ref} ${product.name} medida ${localSize.medida}. ¿Tienen stock y precio por cantidad?`
      : `Hola, me interesa el Kenda ${product.ref} ${product.name} medida ${localSize.medida}. ¿Tienen stock? ¿Cuál es el precio?`
  const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP?.replace(/[^0-9]/g, '') ?? '56900000000'}?text=${encodeURIComponent(whatsappMsg)}`

  const scenario = SCENARIOS.find(s => s.id === activeScenario) ?? SCENARIOS[0]
  const reviews = REVIEWS[product.ref] ?? REVIEWS.default

  const tabStyle = (id: string): React.CSSProperties => ({
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    fontSize: '12px',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    padding: '12px 20px',
    background: activeTab === id ? 'var(--ink)' : 'transparent',
    color: activeTab === id ? 'white' : 'var(--muted)',
    border: 'none',
    borderBottom: activeTab === id ? '2px solid var(--kenda)' : '2px solid transparent',
    cursor: 'pointer',
    transition: 'all 0.15s',
    whiteSpace: 'nowrap' as const,
  })

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

      {/* ── Sticky Product Bar ─────────────────────────────── */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: 'var(--ink)',
          borderBottom: '1px solid var(--line-dark)',
          padding: '12px 0',
          transform: stickyVisible ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 0.25s ease',
          boxShadow: '0 2px 16px rgba(0,0,0,0.3)',
        }}
      >
        <div
          className="wrap"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '16px',
                textTransform: 'uppercase',
                color: 'white',
                whiteSpace: 'nowrap',
              }}
            >
              Kenda {product.ref} — {localSize.medida}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '18px',
                color: 'var(--kenda)',
              }}
            >
              {formatPriceCLP(localSize.priceCLP)}
            </div>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ flexShrink: 0 }}
          >
            Comprar por WhatsApp
          </a>
        </div>
      </div>

      {/* ── Product Hero ───────────────────────────────────── */}
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
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--dim)' }}>
                {localSize.medida}
              </div>
            </div>

            {/* Right: Product info */}
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
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--dim)', marginBottom: '24px' }}>
                {product.tagline}
              </p>

              {/* Price display */}
              <div style={{ marginBottom: '20px' }}>
                {localSize.originalPriceCLP && (
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--dim)', textDecoration: 'line-through' }}>
                    {formatPriceCLP(localSize.originalPriceCLP)}
                  </div>
                )}
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: qty > 1 ? '28px' : '42px',
                    color: 'white',
                    letterSpacing: '-0.02em',
                    lineHeight: 1,
                  }}
                >
                  {formatPriceCLP(localSize.priceCLP)}
                  <span style={{ fontSize: '14px', color: 'var(--dim)', fontWeight: 400, marginLeft: '8px' }}>/ unidad</span>
                </div>
                {qty > 1 && (
                  <div style={{ marginTop: '4px' }}>
                    <div
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 800,
                        fontSize: '36px',
                        color: 'var(--kenda)',
                        letterSpacing: '-0.02em',
                        lineHeight: 1,
                      }}
                    >
                      {formatPriceCLP(totalPrice)}
                    </div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--dim)', marginTop: '2px' }}>
                      Total {qty} unidades · {qty} × {formatPriceCLP(localSize.priceCLP)}
                    </div>
                  </div>
                )}
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--dim)', marginTop: '6px' }}>
                  CLP · IVA incluido · Envío gratis ·{' '}
                  <span style={{ color: 'var(--green)' }}>
                    12 cuotas ≈ {formatPriceCLP(cuotasPrice)} /mes
                  </span>
                </div>
              </div>

              {/* Position toggle */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--dim)', marginBottom: '8px' }}>
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
                        fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '13px', letterSpacing: '0.06em', textTransform: 'uppercase',
                        padding: '8px 16px',
                        background: position === 'delantera' ? 'white' : 'transparent',
                        color: position === 'delantera' ? 'var(--ink)' : 'var(--dim)',
                        border: position === 'delantera' ? '1px solid white' : '1px solid var(--line-dark)',
                        cursor: 'pointer', transition: 'all 0.15s',
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
                        fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '13px', letterSpacing: '0.06em', textTransform: 'uppercase',
                        padding: '8px 16px',
                        background: position === 'trasera' ? 'white' : 'transparent',
                        color: position === 'trasera' ? 'var(--ink)' : 'var(--dim)',
                        border: position === 'trasera' ? '1px solid white' : '1px solid var(--line-dark)',
                        cursor: 'pointer', transition: 'all 0.15s',
                      }}
                    >
                      Trasera
                    </button>
                  )}
                </div>
              </div>

              {/* Size selector */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--dim)', marginBottom: '8px' }}>
                  Medida — {localSize.medida}
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {availableSizes.map(size => (
                    <button
                      key={size.medida}
                      onClick={() => handleSizeSelect(size)}
                      style={{
                        fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '13px',
                        padding: '8px 14px',
                        background: size.medida === localSize.medida ? 'var(--kenda)' : 'transparent',
                        color: size.medida === localSize.medida ? 'white' : 'var(--dim)',
                        border: size.medida === localSize.medida ? '1px solid var(--kenda)' : '1px solid var(--line-dark)',
                        cursor: 'pointer',
                        opacity: size.stock === 'out_of_stock' ? 0.4 : 1,
                        position: 'relative',
                      }}
                    >
                      {size.medida}
                      {size.stock === 'low_stock' && (
                        <span style={{ position: 'absolute', top: '-4px', right: '-4px', background: 'var(--amber)', color: 'white', borderRadius: '50%', width: '12px', height: '12px', fontSize: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          !
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Qty stepper */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--dim)', marginBottom: '8px' }}>
                  Cantidad
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0', width: 'fit-content' }}>
                  <button
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                    style={{
                      width: '40px', height: '40px', border: '1px solid var(--line-dark)', background: 'transparent', color: 'white', cursor: 'pointer', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min={1}
                    max={99}
                    value={qty}
                    onChange={e => setQty(Math.max(1, Math.min(99, parseInt(e.target.value) || 1)))}
                    style={{
                      width: '56px', height: '40px', border: '1px solid var(--line-dark)', borderLeft: 'none', borderRight: 'none',
                      textAlign: 'center', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '16px', background: 'transparent', color: 'white', outline: 'none',
                    }}
                  />
                  <button
                    onClick={() => setQty(q => Math.min(99, q + 1))}
                    style={{
                      width: '40px', height: '40px', border: '1px solid var(--line-dark)', background: 'transparent', color: 'white', cursor: 'pointer', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    +
                  </button>
                </div>

                {/* B2B hints */}
                {qty >= 6 && (
                  <div style={{ marginTop: '8px', fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--green)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    ✓ Plan Básico B2B activo ·{' '}
                    <Link href="/mayoristas/" style={{ color: 'var(--green)', textDecoration: 'underline' }}>Ver condiciones</Link>
                  </div>
                )}
                {qty >= 3 && qty < 6 && (
                  <div style={{ marginTop: '8px', fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--amber)' }}>
                    → Precio mayorista disponible a partir de 6 unidades.{' '}
                    <Link href="/mayoristas/" style={{ color: 'var(--amber)', textDecoration: 'underline' }}>Ver portal B2B</Link>
                  </div>
                )}
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
                style={{ marginTop: '20px', display: 'flex', gap: '16px', flexWrap: 'wrap', fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--dim)' }}
              >
                <span>TL/TT: {localSize.type.join('/')}</span>
                <span>Índice velocidad: {localSize.speedIndex}</span>
                <span>Carga: {localSize.loadIndex}</span>
                <span
                  style={{
                    color: localSize.stock === 'in_stock' ? 'var(--green)' : localSize.stock === 'low_stock' ? 'var(--amber)' : 'var(--muted)',
                  }}
                >
                  {localSize.stock === 'in_stock' ? '● En stock' : localSize.stock === 'low_stock' ? '● Stock limitado' : '○ Sin stock'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Usage Mixer ────────────────────────────────────── */}
      <section style={{ padding: '48px 0', background: 'var(--cream)' }}>
        <div className="wrap">
          <div className="eyebrow mb-3">Perfil de uso</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '24px', textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: '24px' }}>
            ¿Cómo usas tu moto?
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '32px',
              alignItems: 'start',
            }}
          >
            {/* Scenario selector */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {SCENARIOS.map(s => (
                <button
                  key={s.id}
                  onClick={() => setActiveScenario(s.id)}
                  style={{
                    padding: '16px 20px',
                    border: activeScenario === s.id ? '2px solid var(--kenda)' : '1px solid var(--line-2)',
                    background: activeScenario === s.id ? 'white' : 'transparent',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.15s',
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '16px', textTransform: 'uppercase', color: 'var(--text)', marginBottom: '2px' }}>
                    {s.label}
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--muted)' }}>
                    {s.desc}
                  </div>
                </button>
              ))}
            </div>

            {/* Bars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {Object.entries(scenario.bars).map(([key, value]) => (
                <div key={key}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text)' }}>
                      {BAR_LABELS[key]}
                    </span>
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '14px', color: 'var(--kenda)' }}>
                      {value}%
                    </span>
                  </div>
                  <div style={{ background: 'var(--line-2)', height: '6px', borderRadius: '0' }}>
                    <div
                      style={{
                        width: `${value}%`,
                        height: '100%',
                        background: value >= 80 ? 'var(--kenda)' : value >= 60 ? 'var(--amber)' : 'var(--muted)',
                        transition: 'width 0.4s ease',
                      }}
                    />
                  </div>
                </div>
              ))}
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--dim)', lineHeight: 1.5, marginTop: '8px' }}>
                Perfil de rendimiento orientativo. Los valores reales pueden variar según terreno, presión de inflado y estilo de conducción.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Product Tabs ───────────────────────────────────── */}
      <section style={{ background: 'var(--paper)' }}>
        {/* Tab nav */}
        <div style={{ borderBottom: '1px solid var(--line)', overflowX: 'auto' }}>
          <div className="wrap" style={{ display: 'flex', gap: '0', padding: '0 48px' }}>
            {(['descripcion', 'specs', 'medidas', 'garantia'] as const).map(t => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                style={tabStyle(t)}
              >
                {t === 'descripcion' && 'Descripción'}
                {t === 'specs' && 'Especificaciones'}
                {t === 'medidas' && 'Tabla Medidas'}
                {t === 'garantia' && 'Garantía'}
              </button>
            ))}
          </div>
        </div>

        <div className="wrap" style={{ padding: '48px 48px' }}>
          {/* Tab: Descripción */}
          {activeTab === 'descripcion' && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '48px',
              }}
            >
              <div>
                <div className="eyebrow mb-4">Descripción</div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '24px', textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: '16px' }}>
                  {product.name} {localSize.medida}
                </h2>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--muted)', lineHeight: 1.7 }}>
                  {localSize.seoText || product.description}
                </p>
              </div>

              <div>
                <div className="eyebrow mb-4">Características</div>
                {product.features && product.features.length > 0 && (
                  <ul style={{ padding: 0, margin: '0 0 24px', listStyle: 'none' }}>
                    {product.features.map((feature, i) => (
                      <li
                        key={i}
                        style={{
                          fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text)',
                          padding: '12px 0', borderBottom: '1px solid var(--line)',
                          display: 'flex', gap: '12px', alignItems: 'flex-start',
                        }}
                      >
                        <span style={{ color: 'var(--kenda)', fontWeight: 700, flexShrink: 0 }}>✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}

                {localSize.compatMotos && localSize.compatMotos.length > 0 && (
                  <div>
                    <div className="eyebrow mb-3">Motos compatibles</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {localSize.compatMotos.map(moto => (
                        <span
                          key={moto}
                          style={{
                            fontFamily: 'var(--font-body)', fontSize: '12px',
                            background: 'var(--cream)', border: '1px solid var(--line)',
                            padding: '4px 10px', color: 'var(--text)',
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
          )}

          {/* Tab: Especificaciones */}
          {activeTab === 'specs' && (
            <div style={{ maxWidth: '600px' }}>
              <div className="eyebrow mb-4">Especificaciones técnicas</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '24px', textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: '24px' }}>
                {localSize.medida}
              </h2>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  {[
                    { label: 'Referencia', value: `Kenda ${product.ref}` },
                    { label: 'Modelo', value: product.name },
                    { label: 'Medida', value: localSize.medida },
                    { label: 'Posición', value: localSize.position.charAt(0).toUpperCase() + localSize.position.slice(1) },
                    { label: 'Tipo', value: localSize.type.join(' / ') },
                    { label: 'Índice de velocidad', value: localSize.speedIndex },
                    { label: 'Índice de carga', value: localSize.loadIndex },
                    { label: 'Stock', value: localSize.stock === 'in_stock' ? 'En stock' : localSize.stock === 'low_stock' ? 'Stock limitado' : 'Sin stock' },
                    { label: 'Fabricante', value: 'Kenda Rubber Industrial Co., Ltd.' },
                    { label: 'País de origen', value: 'Taiwán' },
                    { label: 'Importador Chile', value: 'Carioca Chile Ltda. (RUT 78.846.500-9)' },
                    { label: 'Bodega', value: 'ZOFRI Iquique' },
                  ].map((row, i) => (
                    <tr
                      key={row.label}
                      style={{ background: i % 2 === 0 ? 'var(--cream)' : 'white', borderBottom: '1px solid var(--line)' }}
                    >
                      <td style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '12px', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--muted)', padding: '12px 16px', width: '40%' }}>
                        {row.label}
                      </td>
                      <td style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text)', padding: '12px 16px' }}>
                        {row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Tab: Tabla Medidas */}
          {activeTab === 'medidas' && (
            <div>
              <div className="eyebrow mb-4">Todas las medidas disponibles</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '24px', textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: '24px' }}>
                {product.name} — Medidas
              </h2>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: 'var(--ink)', color: 'white' }}>
                      {['Medida', 'Posición', 'Tipo', 'Vel.', 'Carga', 'Precio', 'Stock', ''].map(h => (
                        <th
                          key={h}
                          style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '12px 16px', textAlign: 'left' }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {allSizes.map(size => (
                      <tr
                        key={size.medida}
                        onClick={() => handleSizeSelect(size)}
                        style={{
                          background: size.medida === localSize.medida ? 'var(--kenda-tint)' : 'white',
                          borderBottom: '1px solid var(--line)',
                          cursor: 'pointer',
                          transition: 'background 0.1s',
                        }}
                        onMouseEnter={e => { if (size.medida !== localSize.medida) e.currentTarget.style.background = 'var(--cream)' }}
                        onMouseLeave={e => { if (size.medida !== localSize.medida) e.currentTarget.style.background = 'white' }}
                      >
                        <td style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px', padding: '12px 16px' }}>{size.medida}</td>
                        <td style={{ fontFamily: 'var(--font-body)', fontSize: '13px', padding: '12px 16px', textTransform: 'capitalize' }}>{size.position}</td>
                        <td style={{ fontFamily: 'var(--font-body)', fontSize: '13px', padding: '12px 16px' }}>{size.type.join('/')}</td>
                        <td style={{ fontFamily: 'var(--font-body)', fontSize: '13px', padding: '12px 16px' }}>{size.speedIndex}</td>
                        <td style={{ fontFamily: 'var(--font-body)', fontSize: '13px', padding: '12px 16px' }}>{size.loadIndex}</td>
                        <td style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px', padding: '12px 16px' }}>{formatPriceCLP(size.priceCLP)}</td>
                        <td style={{ padding: '12px 16px' }}>
                          <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: size.stock === 'in_stock' ? 'var(--green)' : size.stock === 'low_stock' ? 'var(--amber)' : 'var(--muted)' }}>
                            {size.stock === 'in_stock' ? 'En stock' : size.stock === 'low_stock' ? 'Stock limitado' : 'Sin stock'}
                          </span>
                        </td>
                        <td style={{ padding: '12px 16px' }}>
                          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: size.medida === localSize.medida ? 'var(--kenda)' : 'var(--muted)' }}>
                            {size.medida === localSize.medida ? '✓ Seleccionada' : 'Seleccionar'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab: Garantía */}
          {activeTab === 'garantia' && (
            <div style={{ maxWidth: '640px' }}>
              <div className="eyebrow mb-4">Garantía y devoluciones</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '24px', textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: '24px' }}>
                Kenda Tires — Garantía oficial
              </h2>
              {[
                {
                  title: 'Garantía de fabricación',
                  text: 'Todos los neumáticos Kenda vendidos por Carioca Chile Ltda. son 100% originales e incluyen la garantía de fábrica de Kenda Rubber Industrial Co., Ltd. (Taiwán) contra defectos de fabricación.',
                },
                {
                  title: 'Plazo de garantía',
                  text: 'La garantía cubre defectos de fabricación durante la vida útil del neumático, siempre que se use dentro de las especificaciones de carga, velocidad y presión indicadas por Kenda. No cubre desgaste normal, pinchazos, daños por impacto o uso incorrecto.',
                },
                {
                  title: 'Política de devolución',
                  text: 'Aceptamos devoluciones de neumáticos sin montar en su embalaje original dentro de los 10 días hábiles siguientes a la recepción. Contáctanos por WhatsApp para iniciar el proceso.',
                },
                {
                  title: 'Importación directa',
                  text: 'Al importar directamente desde Kenda (Taiwán) a través de ZOFRI Iquique, garantizamos la autenticidad y trazabilidad de cada neumático. Todos los productos cuentan con documentación de importación.',
                },
              ].map((item, i) => (
                <div key={i} style={{ marginBottom: '24px', paddingBottom: '24px', borderBottom: i < 3 ? '1px solid var(--line)' : 'none' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '16px', textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: '8px', color: 'var(--text)' }}>
                    {item.title}
                  </div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--muted)', lineHeight: 1.7 }}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Reviews ────────────────────────────────────────── */}
      <section style={{ padding: '64px 0', background: 'var(--cream)' }}>
        <div className="wrap">
          <div className="eyebrow mb-3">Opiniones de clientes</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '32px', flexWrap: 'wrap', gap: '12px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '28px', textTransform: 'uppercase', letterSpacing: '-0.01em' }}>
              Kenda {product.ref} — Reseñas
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#f59e0b', fontSize: '18px' }}>★★★★★</span>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '20px' }}>4.8</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--muted)' }}>({reviews.length} reseñas)</span>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
            {reviews.map((r, i) => (
              <div key={i} style={{ background: 'white', border: '1px solid var(--line)', padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <Stars rating={r.rating} />
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--dim)' }}>{r.date}</span>
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text)', lineHeight: 1.6, marginBottom: '12px' }}>
                  &ldquo;{r.text}&rdquo;
                </p>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '12px', letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--muted)' }}>
                  {r.name} · {r.loc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Related products ───────────────────────────────── */}
      {relatedProducts.length > 0 && (
        <section style={{ padding: '64px 0', background: 'var(--paper)' }}>
          <div className="wrap">
            <div className="eyebrow mb-4">Misma categoría</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '28px', textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: '24px' }}>
              Otros modelos {categoria.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px', marginBottom: '24px' }}>
              {relatedProducts.map(p => {
                const defSize = p.sizes?.[0]
                const defSlug = defSize
                  ? defSize.medida.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
                  : null
                return (
                  <Link
                    key={p.slug}
                    href={defSlug ? `/neumaticos-kenda-moto/${categoria}/${p.slug}/${defSlug}/` : `/neumaticos-kenda-moto/${categoria}/${p.slug}/`}
                    style={{ textDecoration: 'none' }}
                  >
                    <div style={{ background: 'white', border: '1px solid var(--line)', padding: '24px', display: 'flex', flexDirection: 'column', gap: '8px', height: '100%' }}>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--kenda)' }}>
                        Kenda {p.ref}
                      </div>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '20px', textTransform: 'uppercase', letterSpacing: '-0.01em', color: 'var(--text)' }}>
                        {p.name}
                      </div>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--muted)', flex: 1 }}>
                        {p.tagline}
                      </div>
                      {p.sizes && (
                        <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--dim)' }}>
                          {p.sizes.length} medida{p.sizes.length !== 1 ? 's' : ''}
                        </div>
                      )}
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--kenda)', marginTop: '8px' }}>
                        Ver modelo →
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
            <Link
              href={`/neumaticos-kenda-moto/${categoria}/`}
              style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--kenda)', textDecoration: 'none', borderBottom: '1px solid var(--kenda)', paddingBottom: '2px' }}
            >
              ← Ver todos los neumáticos {categoria.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
            </Link>
          </div>
        </section>
      )}
    </div>
  )
}
