'use client'

import { useState } from 'react'
import Link from 'next/link'
import rawProducts from '@/data/products.json'

type Tab = 'uso' | 'moto' | 'medida'

/* ── Por Uso ─────────────────────────────────────────────────── */

const terrenos = [
  {
    id: 'trail',
    label: 'Trail Adventure',
    sublabel: 'Ripio · Tierra · Asfalto',
    bikes: 'BMW GS · Africa Twin · Ténéré 700 · KTM Adventure',
    results: [
      {
        ref: 'K784',
        name: 'Big Block',
        tag: 'Principal · 60/40',
        desc: 'El neumático más versátil para motos adventure. Bloques grandes para ripio, banda central para asfalto.',
        href: '/neumaticos-kenda-moto/trail-adventure/kenda-k784-big-block/',
        sizes: '90/90B21 · 100/90B19 · 150/70B17 · 170/60B17',
      },
      {
        ref: 'K761',
        name: 'Dual Sport',
        tag: 'Alternativa · 50/50',
        desc: 'Para motos adventure de cilindrada media que combinan ciudad y ripio suave.',
        href: '/neumaticos-kenda-moto/dual-sport/kenda-k761-dual-sport/',
        sizes: '90/90-21 · 100/90-19 · 130/90-16',
      },
    ],
    catHref: '/neumaticos-kenda-moto/trail-adventure/',
    catLabel: 'Ver toda la categoría Trail Adventure',
  },
  {
    id: 'enduro',
    label: 'Enduro',
    sublabel: 'Técnico · Competición · Off-road extremo',
    bikes: 'KTM EXC · Husqvarna TE/FE · Beta RR · GasGas EC',
    results: [
      {
        ref: 'K779',
        name: 'Knarly — Delantera',
        tag: 'Posición delantera · TT',
        desc: 'Neumático de ataque para enduro. Agarre en la dirección y confianza en descensos técnicos.',
        href: '/neumaticos-kenda-moto/enduro/kenda-k779/',
        sizes: '80/100-21 · 90/90-21',
      },
      {
        ref: 'K778',
        name: 'Knarly — Trasera',
        tag: 'Posición trasera · Hard terrain · TT',
        desc: 'Tracción en terrenos duros y pedregosos. Para el norte árido de Chile y enduro técnico.',
        href: '/neumaticos-kenda-moto/enduro/kenda-k778/',
        sizes: '120/90-18 · 140/80-18',
      },
    ],
    catHref: '/neumaticos-kenda-moto/enduro/',
    catLabel: 'Ver toda la categoría Enduro',
  },
  {
    id: 'mx',
    label: 'Motocross',
    sublabel: 'Pista MX · Arena · Barro',
    bikes: 'Honda CRF · Kawasaki KX · Yamaha YZ · KTM SX',
    results: [
      {
        ref: 'K785',
        name: 'Millville II',
        tag: 'Tierra blanda · Pista MX',
        desc: 'Bloques direccionales para máxima tracción en pistas de tierra blanda e intermedia.',
        href: '/neumaticos-kenda-moto/cross-motocross/kenda-k785-millville/',
        sizes: '80/100-21 · 110/100-18 · 120/100-18',
      },
      {
        ref: 'K782',
        name: 'Sand Mad',
        tag: 'Arena · Barro extremo · Solo trasera',
        desc: 'Diseñado para condiciones extremas de arena y barro. Paletas anchas de evacuación.',
        href: '/neumaticos-kenda-moto/cross-motocross/kenda-k782-sand-mad/',
        sizes: '100/90-19 · 110/90-19 · 110/100-18',
      },
    ],
    catHref: '/neumaticos-kenda-moto/cross-motocross/',
    catLabel: 'Ver toda la categoría Motocross',
  },
  {
    id: 'dual',
    label: 'Dual Sport',
    sublabel: 'Ciudad + trail suave · Homologado',
    bikes: 'Honda CRF 300L · KLX 300 · Suzuki DR · Royal Enfield Himalayan',
    results: [
      {
        ref: 'K761',
        name: 'Dual Sport',
        tag: 'Mixto 50/50 · Homologado vía pública',
        desc: 'Homologado para uso en calle. Bajo ruido en asfalto, agarre en tierra.',
        href: '/neumaticos-kenda-moto/dual-sport/kenda-k761-dual-sport/',
        sizes: '90/90-21 · 100/90-19 · 110/80-18 · 130/90-16',
      },
    ],
    catHref: '/neumaticos-kenda-moto/dual-sport/',
    catLabel: 'Ver toda la categoría Dual Sport',
  },
  {
    id: 'clasica',
    label: 'Clásica / Vintage',
    sublabel: 'Enduro clásico · Trail vintage · Motos antiguas',
    bikes: 'Yamaha XT 600 · Suzuki DR 650 · Honda XR 600 · BMW R 80GS',
    results: [
      {
        ref: 'K787',
        name: 'Equilibrium',
        tag: 'Clásico · Con cámara (TT) · Medidas imperiales',
        desc: 'Perfil clásico con cámara para llantas de radios. Medidas imperiales para motos de los 80–90s.',
        href: '/neumaticos-kenda-moto/calle-carretera/kenda-k787-equilibrium/',
        sizes: '2.75-21 · 4.00-18 · 4.50-18',
      },
    ],
    catHref: '/neumaticos-kenda-moto/calle-carretera/',
    catLabel: 'Ver categoría Calle / Clásico',
  },
]

/* ── Por Moto ────────────────────────────────────────────────── */

type BikeEntry = { front?: string; rear?: string }

const bikes: Record<string, Record<string, BikeEntry>> = {
  BMW: {
    'R 1250 GS / Adventure': { front: '90/90B21', rear: '170/60B17' },
    'F 850 GS': { front: '100/90B19', rear: '130/80B17' },
    'F 750 GS': { front: '100/90B19', rear: '150/70B17' },
    'R 80 GS / Clásica': { front: '90/90-21', rear: '4.00-18' },
  },
  Honda: {
    'Africa Twin CRF1100': { front: '90/90B21', rear: '150/70B17' },
    'XL750 Transalp': { front: '90/90B21', rear: '150/70B18' },
    'CRF 300L': { front: '90/90-21', rear: '130/90-16' },
    'CRF 450R (MX)': { front: '80/100-21', rear: '110/100-18' },
  },
  KTM: {
    '1290 / 890 Adventure': { front: '90/90B21', rear: '150/70B17' },
    'EXC 250 / 300': { front: '80/100-21', rear: '120/90-18' },
    'EXC 450 / 500': { front: '80/100-21', rear: '140/80-18' },
    'SX 250 / 450 (MX)': { front: '80/100-21', rear: '110/100-18' },
  },
  Yamaha: {
    'Ténéré 700': { front: '90/90B21', rear: '150/70B17' },
    'Super Ténéré XT1200Z': { front: '90/90B21', rear: '170/60B17' },
    'WR 250F / 450F (Enduro)': { front: '80/100-21', rear: '120/90-18' },
    'YZ 250 / 450F (MX)': { front: '80/100-21', rear: '110/100-18' },
  },
  Kawasaki: {
    'KLX 300': { front: '90/90-21', rear: '110/80-18' },
    'KX 250 / 450 (MX)': { front: '80/100-21', rear: '110/100-18' },
  },
  Husqvarna: {
    'TE 250 / 300': { front: '80/100-21', rear: '120/90-18' },
    'FE 350 / 450 / 501': { front: '90/90-21', rear: '140/80-18' },
    'TC 250 / 450 (MX)': { front: '80/100-21', rear: '110/100-18' },
  },
  'Royal Enfield': {
    'Himalayan 450': { front: '120/70B19', rear: '150/70B17' },
  },
  Suzuki: {
    'DR 650 / DRZ 400': { front: '90/90-21', rear: '130/90-16' },
    'RM-Z 250 / 450': { front: '80/100-21', rear: '110/100-18' },
  },
  Beta: {
    'RR 250 / 300 (Enduro)': { front: '80/100-21', rear: '120/90-18' },
    'RR 430 / 480': { front: '90/90-21', rear: '140/80-18' },
  },
  GasGas: {
    'EC 250 / 300': { front: '80/100-21', rear: '120/90-18' },
    'EC 350 / 450F': { front: '90/90-21', rear: '140/80-18' },
  },
}

/* ── Lookup helpers ──────────────────────────────────────────── */

type AnyProduct = (typeof rawProducts)[number]
type AnySize = AnyProduct['sizes'][number]

function findByMedida(medida: string): { product: AnyProduct; size: AnySize } | null {
  for (const product of rawProducts) {
    for (const size of product.sizes) {
      if (size.medida === medida) return { product, size }
    }
  }
  return null
}

function searchByMedida(
  ancho: string,
  perfil: string,
  aro: string
): Array<{ product: AnyProduct; size: AnySize }> {
  const patterns = [
    `${ancho}/${perfil}-${aro}`,
    `${ancho}/${perfil}B${aro}`,
    `${ancho}/${perfil}R${aro}`,
  ]
  const results: Array<{ product: AnyProduct; size: AnySize }> = []
  for (const product of rawProducts) {
    for (const size of product.sizes) {
      if (patterns.includes(size.medida)) results.push({ product, size })
    }
  }
  return results
}

function sizeToSlug(medida: string) {
  return medida.toLowerCase().replace(/\//g, '-').replace(/[^a-z0-9-]/g, '')
}

/* ── Shared styles ───────────────────────────────────────────── */

const tabBtn = (active: boolean): React.CSSProperties => ({
  fontFamily: 'var(--font-display)',
  fontWeight: 700,
  fontSize: '13px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  padding: '10px 20px',
  background: active ? 'var(--kenda)' : 'transparent',
  color: active ? 'white' : 'var(--dim)',
  border: active ? '1px solid var(--kenda)' : '1px solid var(--line-dark)',
  cursor: 'pointer',
  transition: 'all 0.15s',
})

/* ── Component ───────────────────────────────────────────────── */

export function TireFinder() {
  const [tab, setTab] = useState<Tab>('uso')

  /* Por Uso state */
  const [selectedTerreno, setSelectedTerreno] = useState<string | null>(null)
  const terreno = terrenos.find(t => t.id === selectedTerreno)

  /* Por Moto state */
  const [marca, setMarca] = useState('')
  const [modelo, setModelo] = useState('')
  const modelos = marca ? Object.keys(bikes[marca] ?? {}) : []
  const bikeEntry = marca && modelo ? bikes[marca]?.[modelo] : null

  /* Por Medida state */
  const [ancho, setAncho] = useState('')
  const [perfil, setPerfil] = useState('')
  const [aro, setAro] = useState('')
  const [medidaResults, setMedidaResults] = useState<
    Array<{ product: AnyProduct; size: AnySize }> | null
  >(null)

  const handleMedidaSearch = () => {
    if (!ancho || !perfil || !aro) return
    setMedidaResults(searchByMedida(ancho, perfil, aro))
  }

  return (
    <div>
      {/* Tab selector */}
      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '24px' }}>
        <button style={tabBtn(tab === 'uso')} onClick={() => setTab('uso')}>
          Por uso
        </button>
        <button style={tabBtn(tab === 'moto')} onClick={() => setTab('moto')}>
          Por moto
        </button>
        <button style={tabBtn(tab === 'medida')} onClick={() => setTab('medida')}>
          Por medida
        </button>
      </div>

      {/* ── TAB: Por Uso ──────────────────────────────────────── */}
      {tab === 'uso' && (
        <div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: '6px',
              marginBottom: terreno ? '32px' : '0',
            }}
          >
            {terrenos.map(t => {
              const isActive = selectedTerreno === t.id
              return (
                <button
                  key={t.id}
                  onClick={() => setSelectedTerreno(isActive ? null : t.id)}
                  style={{
                    border: isActive ? '1px solid var(--kenda)' : '1px solid var(--line-dark)',
                    background: isActive ? 'var(--kenda)' : 'transparent',
                    padding: '16px 12px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.15s',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 800,
                      fontSize: '13px',
                      textTransform: 'uppercase',
                      color: 'white',
                      marginBottom: '3px',
                    }}
                  >
                    {t.label}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '11px',
                      color: isActive ? 'rgba(255,255,255,0.75)' : 'var(--dim)',
                      lineHeight: 1.4,
                    }}
                  >
                    {t.sublabel}
                  </div>
                </button>
              )
            })}
          </div>

          {terreno && (
            <div
              style={{
                background: 'var(--paper)',
                border: '1px solid var(--line)',
                padding: '28px',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  color: 'var(--muted)',
                  marginBottom: '20px',
                }}
              >
                <strong style={{ color: 'var(--text)' }}>Motos compatibles:</strong>{' '}
                {terreno.bikes}
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: '12px',
                  marginBottom: '20px',
                }}
              >
                {terreno.results.map(r => (
                  <div
                    key={r.ref}
                    style={{
                      background: 'white',
                      border: '1px solid var(--line)',
                      padding: '20px',
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        fontSize: '10px',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: 'var(--kenda)',
                        marginBottom: '4px',
                      }}
                    >
                      Kenda {r.ref} · {r.tag}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 800,
                        fontSize: '20px',
                        textTransform: 'uppercase',
                        letterSpacing: '-0.01em',
                        color: 'var(--text)',
                        marginBottom: '6px',
                      }}
                    >
                      {r.name}
                    </div>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '13px',
                        color: 'var(--muted)',
                        lineHeight: 1.6,
                        marginBottom: '10px',
                      }}
                    >
                      {r.desc}
                    </p>
                    <div
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '11px',
                        color: 'var(--dim)',
                        marginBottom: '12px',
                      }}
                    >
                      Medidas: {r.sizes}
                    </div>
                    <Link
                      href={r.href}
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        fontSize: '11px',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: 'var(--kenda)',
                        textDecoration: 'none',
                      }}
                    >
                      Ver modelo y precios →
                    </Link>
                  </div>
                ))}
              </div>
              <Link
                href={terreno.catHref}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  color: 'var(--muted)',
                  textDecoration: 'none',
                  borderBottom: '1px solid var(--line)',
                  paddingBottom: '2px',
                }}
              >
                {terreno.catLabel} →
              </Link>
            </div>
          )}
        </div>
      )}

      {/* ── TAB: Por Moto ─────────────────────────────────────── */}
      {tab === 'moto' && (
        <div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '12px',
              marginBottom: '24px',
            }}
          >
            <div>
              <label
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--dim)',
                  display: 'block',
                  marginBottom: '8px',
                }}
              >
                Marca
              </label>
              <select
                value={marca}
                onChange={e => {
                  setMarca(e.target.value)
                  setModelo('')
                }}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid var(--line-dark)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  background: 'var(--ink-2)',
                  color: 'white',
                  cursor: 'pointer',
                }}
              >
                <option value="">Seleccionar marca...</option>
                {Object.keys(bikes).map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <div>
              <label
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--dim)',
                  display: 'block',
                  marginBottom: '8px',
                }}
              >
                Modelo
              </label>
              <select
                value={modelo}
                onChange={e => setModelo(e.target.value)}
                disabled={!marca}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid var(--line-dark)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  background: marca ? 'var(--ink-2)' : 'var(--ink-3)',
                  color: marca ? 'white' : 'var(--dim)',
                  cursor: marca ? 'pointer' : 'not-allowed',
                  opacity: marca ? 1 : 0.5,
                }}
              >
                <option value="">
                  {marca ? 'Seleccionar modelo...' : 'Selecciona una marca primero'}
                </option>
                {modelos.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
          </div>

          {bikeEntry && (
            <div
              style={{
                background: 'var(--paper)',
                border: '1px solid var(--line)',
                padding: '24px',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '11px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--kenda)',
                  marginBottom: '12px',
                }}
              >
                Neumáticos recomendados — {marca} {modelo}
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '12px',
                }}
              >
                {(['front', 'rear'] as const).map(pos => {
                  const medida = bikeEntry[pos]
                  if (!medida) return null
                  const found = findByMedida(medida)
                  if (!found) return null
                  const { product, size } = found
                  const slug = sizeToSlug(size.medida)
                  return (
                    <Link
                      key={pos}
                      href={`/neumaticos-kenda-moto/${product.category}/${product.slug}/${slug}/`}
                      style={{ textDecoration: 'none' }}
                    >
                      <div
                        style={{
                          background: 'white',
                          border: '1px solid var(--line)',
                          padding: '20px',
                          height: '100%',
                          transition: 'border-color 0.15s',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--kenda)')}
                        onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--line)')}
                      >
                        <div
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '10px',
                            fontWeight: 700,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            color: 'var(--kenda)',
                            marginBottom: '4px',
                          }}
                        >
                          {pos === 'front' ? 'Delantera' : 'Trasera'} · Kenda {product.ref}
                        </div>
                        <div
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 800,
                            fontSize: '18px',
                            textTransform: 'uppercase',
                            color: 'var(--text)',
                            marginBottom: '4px',
                          }}
                        >
                          {product.name.replace('Kenda K784 ', '').replace('Kenda K', 'K')}
                        </div>
                        <div
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '14px',
                            fontWeight: 700,
                            color: 'var(--text)',
                            marginBottom: '4px',
                          }}
                        >
                          {size.medida}
                        </div>
                        <div
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '12px',
                            color: 'var(--muted)',
                          }}
                        >
                          Ver precio y stock →
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  color: 'var(--dim)',
                  marginTop: '16px',
                  lineHeight: 1.5,
                }}
              >
                * Medidas según especificaciones de fábrica. Verifica siempre el manual de tu moto.
              </p>
            </div>
          )}

          {marca && modelo && !bikeEntry && (
            <div
              style={{
                background: 'var(--paper)',
                border: '1px solid var(--line)',
                padding: '24px',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                color: 'var(--muted)',
              }}
            >
              No encontramos medida para ese modelo. Escríbenos por WhatsApp y te ayudamos.
            </div>
          )}
        </div>
      )}

      {/* ── TAB: Por Medida ───────────────────────────────────── */}
      {tab === 'medida' && (
        <div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '8px',
              marginBottom: '12px',
              maxWidth: '480px',
            }}
          >
            {[
              { label: 'Ancho (mm)', value: ancho, set: setAncho, placeholder: 'ej. 90' },
              { label: 'Perfil (%)', value: perfil, set: setPerfil, placeholder: 'ej. 90' },
              { label: 'Aro (in)', value: aro, set: setAro, placeholder: 'ej. 21' },
            ].map(({ label, value, set, placeholder }) => (
              <div key={label}>
                <label
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '11px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--dim)',
                    display: 'block',
                    marginBottom: '6px',
                  }}
                >
                  {label}
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder={placeholder}
                  value={value}
                  onChange={e => {
                    set(e.target.value)
                    setMedidaResults(null)
                  }}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid var(--line-dark)',
                    fontFamily: 'var(--font-display)',
                    fontSize: '16px',
                    fontWeight: 700,
                    background: 'var(--ink-2)',
                    color: 'white',
                    outline: 'none',
                  }}
                />
              </div>
            ))}
          </div>

          <button
            onClick={handleMedidaSearch}
            disabled={!ancho || !perfil || !aro}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '13px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              padding: '10px 24px',
              background: ancho && perfil && aro ? 'var(--kenda)' : 'var(--ink-3)',
              color: 'white',
              border: 'none',
              cursor: ancho && perfil && aro ? 'pointer' : 'not-allowed',
              marginBottom: '24px',
            }}
          >
            Buscar neumáticos
          </button>

          {medidaResults !== null && (
            <div>
              {medidaResults.length === 0 ? (
                <div
                  style={{
                    background: 'var(--paper)',
                    border: '1px solid var(--line)',
                    padding: '24px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    color: 'var(--muted)',
                  }}
                >
                  No encontramos esa medida en el catálogo. Puedes buscar en{' '}
                  <Link
                    href="/neumaticos-kenda-moto/medida/"
                    style={{ color: 'var(--kenda)', textDecoration: 'none' }}
                  >
                    todas las medidas →
                  </Link>
                </div>
              ) : (
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: '11px',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--kenda)',
                      marginBottom: '12px',
                    }}
                  >
                    {medidaResults.length} resultado{medidaResults.length !== 1 ? 's' : ''} para{' '}
                    {ancho}/{perfil}-{aro} / {ancho}/{perfil}B{aro}
                  </div>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                      gap: '12px',
                    }}
                  >
                    {medidaResults.map(({ product, size }) => {
                      const slug = sizeToSlug(size.medida)
                      return (
                        <Link
                          key={`${product.slug}-${size.medida}`}
                          href={`/neumaticos-kenda-moto/${product.category}/${product.slug}/${slug}/`}
                          style={{ textDecoration: 'none' }}
                        >
                          <div
                            style={{
                              background: 'white',
                              border: '1px solid var(--line)',
                              padding: '20px',
                              transition: 'border-color 0.15s',
                            }}
                            onMouseEnter={e =>
                              (e.currentTarget.style.borderColor = 'var(--kenda)')
                            }
                            onMouseLeave={e =>
                              (e.currentTarget.style.borderColor = 'var(--line)')
                            }
                          >
                            <div
                              style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: '10px',
                                fontWeight: 700,
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase',
                                color: 'var(--kenda)',
                                marginBottom: '4px',
                              }}
                            >
                              Kenda {product.ref} · {size.position}
                            </div>
                            <div
                              style={{
                                fontFamily: 'var(--font-display)',
                                fontWeight: 800,
                                fontSize: '18px',
                                textTransform: 'uppercase',
                                color: 'var(--text)',
                                marginBottom: '4px',
                              }}
                            >
                              {product.name.replace(/^Kenda K\d+ /, '')}
                            </div>
                            <div
                              style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: '15px',
                                fontWeight: 700,
                                color: 'var(--text)',
                                marginBottom: '4px',
                              }}
                            >
                              {size.medida}
                            </div>
                            <div
                              style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: '12px',
                                color: 'var(--dim)',
                              }}
                            >
                              Ver precio →
                            </div>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              color: 'var(--dim)',
              marginTop: '16px',
              lineHeight: 1.5,
            }}
          >
            Buscamos en medidas métricas (ej. 90/90-21, 90/90B21). Para medidas imperiales (2.75-21,
            4.00-18) visita la{' '}
            <Link
              href="/neumaticos-kenda-moto/calle-carretera/"
              style={{ color: 'var(--kenda)', textDecoration: 'none' }}
            >
              categoría Calle / Clásico →
            </Link>
          </p>
        </div>
      )}
    </div>
  )
}
