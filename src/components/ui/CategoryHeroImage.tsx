'use client'

import Image from 'next/image'
import { useState } from 'react'

const CATEGORY_ALT: Record<string, string> = {
  'trail-adventure':  'Moto adventure con neumáticos Kenda K784 Big Block en ripio Atacama Chile',
  'enduro':           'Moto enduro con neumáticos Kenda Knarly en terreno rocoso Chile',
  'cross-motocross':  'Moto motocross con neumáticos Kenda K785 Millville en pista de tierra Chile',
  'dual-sport':       'Moto dual sport con neumáticos Kenda K761 en carretera y ripio Chile',
  'calle-carretera':  'Moto de calle con neumáticos Kenda K787 en carretera Chile',
  'scooter':          'Scooter con neumáticos Kenda en ciudad Chile',
  'supermoto-pista':  'Moto supermoto con neumáticos Kenda en pista Chile',
  'custom-chopper':   'Moto custom con neumáticos Kenda Chile',
}

const CATEGORY_LABEL: Record<string, string> = {
  'trail-adventure':  'Trail Adventure',
  'enduro':           'Enduro',
  'cross-motocross':  'Cross / Motocross',
  'dual-sport':       'Dual Sport',
  'calle-carretera':  'Calle / Carretera',
  'scooter':          'Scooter',
  'supermoto-pista':  'Supermoto / Pista',
  'custom-chopper':   'Custom / Chopper',
}

interface CategoryHeroImageProps {
  categoria: string
  priority?: boolean
}

export function CategoryHeroImage({ categoria, priority = true }: CategoryHeroImageProps) {
  const [hasError, setHasError] = useState(false)

  const src = `/images/categories/${categoria}-hero.webp`
  const alt = CATEGORY_ALT[categoria] ?? `Neumáticos Kenda ${categoria.replace(/-/g, ' ')} Chile ZOFRI Iquique`
  const label = CATEGORY_LABEL[categoria] ?? categoria.replace(/-/g, ' ').toUpperCase()

  if (hasError) {
    return (
      <div
        style={{
          width: '100%',
          height: '280px',
          background: 'linear-gradient(135deg, #1a1a1a 0%, #0e0e0e 100%)',
          borderTop: '1px solid #2a2a2a',
          borderBottom: '1px solid #2a2a2a',
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
            fontSize: 'clamp(28px, 6vw, 52px)',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: '#222',
          }}
        >
          KENDA
        </div>
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '13px',
            textTransform: 'uppercase',
            letterSpacing: '0.16em',
            color: '#333',
          }}
        >
          {label}
        </div>
      </div>
    )
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '280px', overflow: 'hidden' }}>
      <Image
        src={src}
        alt={alt}
        fill
        style={{ objectFit: 'cover', objectPosition: 'center' }}
        sizes="100vw"
        priority={priority}
        title={`Neumáticos Kenda ${label} — Distribuidor oficial Chile ZOFRI`}
        onError={() => setHasError(true)}
      />
    </div>
  )
}
