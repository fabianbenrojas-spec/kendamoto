'use client'

import { useState } from 'react'
import Link from 'next/link'

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
        desc: 'El neumático más versátil para motos adventure. Bloques grandes para ripio, banda central para asfalto. TL exclusivo.',
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
        desc: 'Tracción en terrenos duros y pedregosos. Par el norte árido de Chile y enduro técnico.',
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
        desc: 'Bloques direccionales para máxima tracción en pistas de tierra blanda e intermedia. 9 medidas disponibles.',
        href: '/neumaticos-kenda-moto/cross-motocross/kenda-k785-millville/',
        sizes: '70/100-17 · 80/100-21 · 110/100-18 · 120/100-18',
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
    bikes: 'Honda CRF 300L · Kawasaki KLX · Suzuki DR · Royal Enfield Himalayan',
    results: [
      {
        ref: 'K761',
        name: 'Dual Sport',
        tag: 'Mixto 50/50 · Homologado vía pública',
        desc: 'Neumático homologado para uso en calle. Bajo ruido en asfalto, agarre en tierra. Para el día a día con salidas off-road.',
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
        desc: 'Perfil clásico con cámara para llantas de radios. Medidas imperiales para motos de los 80–90s. Trail suave y uso mixto.',
        href: '/neumaticos-kenda-moto/calle-carretera/kenda-k787-equilibrium/',
        sizes: '2.75-21 · 4.00-18 · 4.50-18',
      },
    ],
    catHref: '/neumaticos-kenda-moto/calle-carretera/',
    catLabel: 'Ver categoría Calle / Clásico',
  },
]

const cardBase: React.CSSProperties = {
  border: '1px solid var(--line-dark)',
  padding: '20px 16px',
  cursor: 'pointer',
  transition: 'all 0.15s',
  textAlign: 'left',
  background: 'transparent',
  width: '100%',
}

export function TireFinder() {
  const [selected, setSelected] = useState<string | null>(null)
  const terreno = terrenos.find(t => t.id === selected)

  return (
    <div>
      {/* Step 1 — terrain picker */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '8px',
          marginBottom: terreno ? '40px' : '0',
        }}
      >
        {terrenos.map(t => {
          const isActive = selected === t.id
          return (
            <button
              key={t.id}
              onClick={() => setSelected(isActive ? null : t.id)}
              style={{
                ...cardBase,
                borderColor: isActive ? 'var(--kenda)' : 'var(--line-dark)',
                background: isActive ? 'var(--kenda)' : 'transparent',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '14px',
                  textTransform: 'uppercase',
                  letterSpacing: '-0.01em',
                  color: isActive ? 'white' : 'white',
                  marginBottom: '4px',
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

      {/* Step 2 — results */}
      {terreno && (
        <div
          style={{
            background: 'var(--paper)',
            border: '1px solid var(--line)',
            padding: '32px',
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
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '16px',
              marginBottom: '24px',
            }}
          >
            {terreno.results.map(r => (
              <div
                key={r.ref}
                style={{
                  background: 'white',
                  border: '1px solid var(--line)',
                  padding: '24px',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '11px',
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
                    fontSize: '22px',
                    textTransform: 'uppercase',
                    letterSpacing: '-0.01em',
                    color: 'var(--text)',
                    marginBottom: '8px',
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
                    marginBottom: '12px',
                  }}
                >
                  {r.desc}
                </p>
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '11px',
                    color: 'var(--dim)',
                    marginBottom: '16px',
                  }}
                >
                  Medidas: {r.sizes}
                </div>
                <Link
                  href={r.href}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '12px',
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
  )
}
