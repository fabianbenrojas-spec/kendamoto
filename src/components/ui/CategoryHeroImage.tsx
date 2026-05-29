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

interface CategoryHeroImageProps {
  categoria: string
  priority?: boolean
}

export function CategoryHeroImage({ categoria, priority = true }: CategoryHeroImageProps) {
  const [hasError, setHasError] = useState(false)

  if (hasError) return null

  const src = `/images/categories/${categoria}-hero.webp`
  const alt = CATEGORY_ALT[categoria] ?? `Neumáticos Kenda ${categoria.replace(/-/g, ' ')} Chile ZOFRI Iquique`

  return (
    <div style={{ position: 'relative', width: '100%', height: '280px', overflow: 'hidden' }}>
      <Image
        src={src}
        alt={alt}
        fill
        style={{ objectFit: 'cover', objectPosition: 'center' }}
        sizes="100vw"
        priority={priority}
        title={`Neumáticos Kenda ${categoria.replace(/-/g, ' ')} — Distribuidor oficial Chile ZOFRI`}
        onError={() => setHasError(true)}
      />
    </div>
  )
}
