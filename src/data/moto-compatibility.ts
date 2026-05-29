export type MotoType = 'adventure' | 'enduro' | 'mx' | 'dualsport'

export interface MotoEntry {
  label: string
  type: MotoType
  productSlug: string
  categoria: string
  modelRef: string
  delantera: string
  trasera: string
  delanteraSlug: string
  traseraSlug: string
  priceDelantera: number
  priceTrasera: number
  constructionType: 'TL' | 'TT' | 'TL/TT'
  terrain: 'mixto' | 'offroad' | 'ciudad' | 'pista'
}

export const MOTO_COMPAT: MotoEntry[] = [

  // ─── ADVENTURE ────────────────────────────────────────────────
  {
    label: 'BMW R 1250 GS',
    type: 'adventure', productSlug: 'kenda-k784-big-block', categoria: 'trail-adventure',
    modelRef: 'K784 Big Block', delantera: '90/90B21', trasera: '170/60B17',
    delanteraSlug: '90-90b21', traseraSlug: '170-60b17',
    priceDelantera: 79990, priceTrasera: 109990, constructionType: 'TL', terrain: 'mixto',
  },
  {
    label: 'BMW R 1250 GS Adventure',
    type: 'adventure', productSlug: 'kenda-k784-big-block', categoria: 'trail-adventure',
    modelRef: 'K784 Big Block', delantera: '90/90B21', trasera: '170/60B17',
    delanteraSlug: '90-90b21', traseraSlug: '170-60b17',
    priceDelantera: 79990, priceTrasera: 109990, constructionType: 'TL', terrain: 'offroad',
  },
  {
    label: 'BMW F 850 GS',
    type: 'adventure', productSlug: 'kenda-k784-big-block', categoria: 'trail-adventure',
    modelRef: 'K784 Big Block', delantera: '90/90B21', trasera: '150/70B17',
    delanteraSlug: '90-90b21', traseraSlug: '150-70b17',
    priceDelantera: 79990, priceTrasera: 99990, constructionType: 'TL', terrain: 'mixto',
  },
  {
    label: 'Honda Africa Twin CRF1100',
    type: 'adventure', productSlug: 'kenda-k784-big-block', categoria: 'trail-adventure',
    modelRef: 'K784 Big Block', delantera: '90/90B21', trasera: '150/70B18',
    delanteraSlug: '90-90b21', traseraSlug: '150-70b18',
    priceDelantera: 79990, priceTrasera: 104990, constructionType: 'TL', terrain: 'mixto',
  },
  {
    label: 'Honda Africa Twin CRF1100L Adventure Sports',
    type: 'adventure', productSlug: 'kenda-k784-big-block', categoria: 'trail-adventure',
    modelRef: 'K784 Big Block', delantera: '110/80B19', trasera: '150/70B18',
    delanteraSlug: '110-80b19', traseraSlug: '150-70b18',
    priceDelantera: 89990, priceTrasera: 104990, constructionType: 'TL', terrain: 'offroad',
  },
  {
    label: 'Honda XL750 Transalp',
    type: 'adventure', productSlug: 'kenda-k784-big-block', categoria: 'trail-adventure',
    modelRef: 'K784 Big Block', delantera: '90/90B21', trasera: '150/70B18',
    delanteraSlug: '90-90b21', traseraSlug: '150-70b18',
    priceDelantera: 79990, priceTrasera: 104990, constructionType: 'TL', terrain: 'mixto',
  },
  {
    label: 'Honda CB500X',
    type: 'adventure', productSlug: 'kenda-k784-big-block', categoria: 'trail-adventure',
    modelRef: 'K784 Big Block', delantera: '120/70B19', trasera: '130/80B17',
    delanteraSlug: '120-70b19', traseraSlug: '130-80b17',
    priceDelantera: 87990, priceTrasera: 89990, constructionType: 'TL', terrain: 'ciudad',
  },
  {
    label: 'Yamaha Ténéré 700',
    type: 'adventure', productSlug: 'kenda-k784-big-block', categoria: 'trail-adventure',
    modelRef: 'K784 Big Block', delantera: '90/90B21', trasera: '150/70B17',
    delanteraSlug: '90-90b21', traseraSlug: '150-70b17',
    priceDelantera: 79990, priceTrasera: 99990, constructionType: 'TL', terrain: 'mixto',
  },
  {
    label: 'Yamaha Super Ténéré XT1200Z',
    type: 'adventure', productSlug: 'kenda-k784-big-block', categoria: 'trail-adventure',
    modelRef: 'K784 Big Block', delantera: '90/90B21', trasera: '150/70B17',
    delanteraSlug: '90-90b21', traseraSlug: '150-70b17',
    priceDelantera: 79990, priceTrasera: 99990, constructionType: 'TL', terrain: 'mixto',
  },
  {
    label: 'KTM 890 Adventure',
    type: 'adventure', productSlug: 'kenda-k784-big-block', categoria: 'trail-adventure',
    modelRef: 'K784 Big Block', delantera: '90/90B21', trasera: '150/70B17',
    delanteraSlug: '90-90b21', traseraSlug: '150-70b17',
    priceDelantera: 79990, priceTrasera: 99990, constructionType: 'TL', terrain: 'mixto',
  },
  {
    label: 'KTM 890 Adventure R',
    type: 'adventure', productSlug: 'kenda-k784-big-block', categoria: 'trail-adventure',
    modelRef: 'K784 Big Block', delantera: '90/90B21', trasera: '140/80B18',
    delanteraSlug: '90-90b21', traseraSlug: '140-80b18',
    priceDelantera: 79990, priceTrasera: 94990, constructionType: 'TL', terrain: 'offroad',
  },
  {
    label: 'KTM 1290 Super Adventure',
    type: 'adventure', productSlug: 'kenda-k784-big-block', categoria: 'trail-adventure',
    modelRef: 'K784 Big Block', delantera: '110/80B19', trasera: '170/60B17',
    delanteraSlug: '110-80b19', traseraSlug: '170-60b17',
    priceDelantera: 89990, priceTrasera: 109990, constructionType: 'TL', terrain: 'mixto',
  },
  {
    label: 'Triumph Tiger 900',
    type: 'adventure', productSlug: 'kenda-k784-big-block', categoria: 'trail-adventure',
    modelRef: 'K784 Big Block', delantera: '110/80B19', trasera: '150/70B17',
    delanteraSlug: '110-80b19', traseraSlug: '150-70b17',
    priceDelantera: 89990, priceTrasera: 99990, constructionType: 'TL', terrain: 'mixto',
  },
  {
    label: 'Triumph Tiger 1200',
    type: 'adventure', productSlug: 'kenda-k784-big-block', categoria: 'trail-adventure',
    modelRef: 'K784 Big Block', delantera: '110/80B19', trasera: '170/60B17',
    delanteraSlug: '110-80b19', traseraSlug: '170-60b17',
    priceDelantera: 89990, priceTrasera: 109990, constructionType: 'TL', terrain: 'mixto',
  },
  {
    label: 'Royal Enfield Himalayan 450',
    type: 'adventure', productSlug: 'kenda-k784-big-block', categoria: 'trail-adventure',
    modelRef: 'K784 Big Block', delantera: '90/90B21', trasera: '150/70B17',
    delanteraSlug: '90-90b21', traseraSlug: '150-70b17',
    priceDelantera: 79990, priceTrasera: 99990, constructionType: 'TL', terrain: 'mixto',
  },
  {
    label: 'CFMoto 700MT',
    type: 'adventure', productSlug: 'kenda-k784-big-block', categoria: 'trail-adventure',
    modelRef: 'K784 Big Block', delantera: '120/70B19', trasera: '150/70B17',
    delanteraSlug: '120-70b19', traseraSlug: '150-70b17',
    priceDelantera: 87990, priceTrasera: 99990, constructionType: 'TL', terrain: 'ciudad',
  },
  {
    label: 'CFMoto 650MT',
    type: 'adventure', productSlug: 'kenda-k784-big-block', categoria: 'trail-adventure',
    modelRef: 'K784 Big Block', delantera: '120/70B19', trasera: '130/80B17',
    delanteraSlug: '120-70b19', traseraSlug: '130-80b17',
    priceDelantera: 87990, priceTrasera: 89990, constructionType: 'TL', terrain: 'ciudad',
  },

  // ─── ENDURO ───────────────────────────────────────────────────
  {
    label: 'KTM EXC 250 (2T)',
    type: 'enduro', productSlug: 'kenda-k778', categoria: 'enduro',
    modelRef: 'K779 + K778 Knarly', delantera: '80/100-21', trasera: '120/90-18',
    delanteraSlug: '80-100-21', traseraSlug: '120-90-18',
    priceDelantera: 59990, priceTrasera: 79990, constructionType: 'TT', terrain: 'offroad',
  },
  {
    label: 'KTM EXC 300 (2T)',
    type: 'enduro', productSlug: 'kenda-k778', categoria: 'enduro',
    modelRef: 'K779 + K778 Knarly', delantera: '80/100-21', trasera: '120/90-18',
    delanteraSlug: '80-100-21', traseraSlug: '120-90-18',
    priceDelantera: 59990, priceTrasera: 79990, constructionType: 'TT', terrain: 'offroad',
  },
  {
    label: 'KTM EXC 450 (4T)',
    type: 'enduro', productSlug: 'kenda-k778', categoria: 'enduro',
    modelRef: 'K779 + K778 Knarly', delantera: '80/100-21', trasera: '140/80-18',
    delanteraSlug: '80-100-21', traseraSlug: '140-80-18',
    priceDelantera: 59990, priceTrasera: 89990, constructionType: 'TT', terrain: 'offroad',
  },
  {
    label: 'KTM EXC 500 (4T)',
    type: 'enduro', productSlug: 'kenda-k778', categoria: 'enduro',
    modelRef: 'K779 + K778 Knarly', delantera: '80/100-21', trasera: '140/80-18',
    delanteraSlug: '80-100-21', traseraSlug: '140-80-18',
    priceDelantera: 59990, priceTrasera: 89990, constructionType: 'TT', terrain: 'offroad',
  },
  {
    label: 'Husqvarna TE 250',
    type: 'enduro', productSlug: 'kenda-k778', categoria: 'enduro',
    modelRef: 'K779 + K778 Knarly', delantera: '80/100-21', trasera: '120/90-18',
    delanteraSlug: '80-100-21', traseraSlug: '120-90-18',
    priceDelantera: 59990, priceTrasera: 79990, constructionType: 'TT', terrain: 'offroad',
  },
  {
    label: 'Husqvarna TE 300',
    type: 'enduro', productSlug: 'kenda-k778', categoria: 'enduro',
    modelRef: 'K779 + K778 Knarly', delantera: '80/100-21', trasera: '120/90-18',
    delanteraSlug: '80-100-21', traseraSlug: '120-90-18',
    priceDelantera: 59990, priceTrasera: 79990, constructionType: 'TT', terrain: 'offroad',
  },
  {
    label: 'Husqvarna FE 450',
    type: 'enduro', productSlug: 'kenda-k778', categoria: 'enduro',
    modelRef: 'K779 + K778 Knarly', delantera: '80/100-21', trasera: '140/80-18',
    delanteraSlug: '80-100-21', traseraSlug: '140-80-18',
    priceDelantera: 59990, priceTrasera: 89990, constructionType: 'TT', terrain: 'offroad',
  },
  {
    label: 'Husqvarna FE 501',
    type: 'enduro', productSlug: 'kenda-k778', categoria: 'enduro',
    modelRef: 'K779 + K778 Knarly', delantera: '80/100-21', trasera: '140/80-18',
    delanteraSlug: '80-100-21', traseraSlug: '140-80-18',
    priceDelantera: 59990, priceTrasera: 89990, constructionType: 'TT', terrain: 'offroad',
  },
  {
    label: 'Beta RR 300',
    type: 'enduro', productSlug: 'kenda-k778', categoria: 'enduro',
    modelRef: 'K779 + K778 Knarly', delantera: '80/100-21', trasera: '120/90-18',
    delanteraSlug: '80-100-21', traseraSlug: '120-90-18',
    priceDelantera: 59990, priceTrasera: 79990, constructionType: 'TT', terrain: 'offroad',
  },
  {
    label: 'Beta RR 430 / 480',
    type: 'enduro', productSlug: 'kenda-k778', categoria: 'enduro',
    modelRef: 'K779 + K778 Knarly', delantera: '80/100-21', trasera: '140/80-18',
    delanteraSlug: '80-100-21', traseraSlug: '140-80-18',
    priceDelantera: 59990, priceTrasera: 89990, constructionType: 'TT', terrain: 'offroad',
  },
  {
    label: 'GasGas EC 300',
    type: 'enduro', productSlug: 'kenda-k778', categoria: 'enduro',
    modelRef: 'K779 + K778 Knarly', delantera: '80/100-21', trasera: '120/90-18',
    delanteraSlug: '80-100-21', traseraSlug: '120-90-18',
    priceDelantera: 59990, priceTrasera: 79990, constructionType: 'TT', terrain: 'offroad',
  },
  {
    label: 'GasGas EC 450F',
    type: 'enduro', productSlug: 'kenda-k778', categoria: 'enduro',
    modelRef: 'K779 + K778 Knarly', delantera: '80/100-21', trasera: '140/80-18',
    delanteraSlug: '80-100-21', traseraSlug: '140-80-18',
    priceDelantera: 59990, priceTrasera: 89990, constructionType: 'TT', terrain: 'offroad',
  },

  // ─── MOTOCROSS ────────────────────────────────────────────────
  {
    label: 'Honda CRF 250R',
    type: 'mx', productSlug: 'kenda-k785-millville', categoria: 'cross-motocross',
    modelRef: 'K785 Millville II', delantera: '80/100-21', trasera: '110/100-18',
    delanteraSlug: '80-100-21', traseraSlug: '110-100-18',
    priceDelantera: 59990, priceTrasera: 74990, constructionType: 'TT', terrain: 'pista',
  },
  {
    label: 'Honda CRF 450R',
    type: 'mx', productSlug: 'kenda-k785-millville', categoria: 'cross-motocross',
    modelRef: 'K785 Millville II', delantera: '80/100-21', trasera: '110/100-18',
    delanteraSlug: '80-100-21', traseraSlug: '110-100-18',
    priceDelantera: 59990, priceTrasera: 74990, constructionType: 'TT', terrain: 'pista',
  },
  {
    label: 'Kawasaki KX 250',
    type: 'mx', productSlug: 'kenda-k785-millville', categoria: 'cross-motocross',
    modelRef: 'K785 Millville II', delantera: '80/100-21', trasera: '110/100-18',
    delanteraSlug: '80-100-21', traseraSlug: '110-100-18',
    priceDelantera: 59990, priceTrasera: 74990, constructionType: 'TT', terrain: 'pista',
  },
  {
    label: 'Kawasaki KX 450',
    type: 'mx', productSlug: 'kenda-k785-millville', categoria: 'cross-motocross',
    modelRef: 'K785 Millville II', delantera: '80/100-21', trasera: '110/100-18',
    delanteraSlug: '80-100-21', traseraSlug: '110-100-18',
    priceDelantera: 59990, priceTrasera: 74990, constructionType: 'TT', terrain: 'pista',
  },
  {
    label: 'Yamaha YZ 250F',
    type: 'mx', productSlug: 'kenda-k785-millville', categoria: 'cross-motocross',
    modelRef: 'K785 Millville II', delantera: '80/100-21', trasera: '110/100-18',
    delanteraSlug: '80-100-21', traseraSlug: '110-100-18',
    priceDelantera: 59990, priceTrasera: 74990, constructionType: 'TT', terrain: 'pista',
  },
  {
    label: 'Yamaha YZ 450F',
    type: 'mx', productSlug: 'kenda-k785-millville', categoria: 'cross-motocross',
    modelRef: 'K785 Millville II', delantera: '80/100-21', trasera: '110/100-18',
    delanteraSlug: '80-100-21', traseraSlug: '110-100-18',
    priceDelantera: 59990, priceTrasera: 74990, constructionType: 'TT', terrain: 'pista',
  },
  {
    label: 'KTM SX 250F',
    type: 'mx', productSlug: 'kenda-k785-millville', categoria: 'cross-motocross',
    modelRef: 'K785 Millville II', delantera: '80/100-21', trasera: '110/100-18',
    delanteraSlug: '80-100-21', traseraSlug: '110-100-18',
    priceDelantera: 59990, priceTrasera: 74990, constructionType: 'TT', terrain: 'pista',
  },
  {
    label: 'KTM SX 450F',
    type: 'mx', productSlug: 'kenda-k785-millville', categoria: 'cross-motocross',
    modelRef: 'K785 Millville II', delantera: '80/100-21', trasera: '110/100-18',
    delanteraSlug: '80-100-21', traseraSlug: '110-100-18',
    priceDelantera: 59990, priceTrasera: 74990, constructionType: 'TT', terrain: 'pista',
  },
  {
    label: 'KTM SX 125',
    type: 'mx', productSlug: 'kenda-k785-millville', categoria: 'cross-motocross',
    modelRef: 'K785 Millville II', delantera: '80/100-21', trasera: '100/90-19',
    delanteraSlug: '80-100-21', traseraSlug: '100-90-19',
    priceDelantera: 59990, priceTrasera: 64990, constructionType: 'TT', terrain: 'pista',
  },
  {
    label: 'Husqvarna TC 250',
    type: 'mx', productSlug: 'kenda-k785-millville', categoria: 'cross-motocross',
    modelRef: 'K785 Millville II', delantera: '80/100-21', trasera: '110/100-18',
    delanteraSlug: '80-100-21', traseraSlug: '110-100-18',
    priceDelantera: 59990, priceTrasera: 74990, constructionType: 'TT', terrain: 'pista',
  },
  {
    label: 'Husqvarna FC 450',
    type: 'mx', productSlug: 'kenda-k785-millville', categoria: 'cross-motocross',
    modelRef: 'K785 Millville II', delantera: '80/100-21', trasera: '110/100-18',
    delanteraSlug: '80-100-21', traseraSlug: '110-100-18',
    priceDelantera: 59990, priceTrasera: 74990, constructionType: 'TT', terrain: 'pista',
  },

  // ─── DUAL SPORT ───────────────────────────────────────────────
  {
    label: 'Honda CRF 300L',
    type: 'dualsport', productSlug: 'kenda-k761-dual-sport', categoria: 'dual-sport',
    modelRef: 'K761 Dual Sport', delantera: '90/90-21', trasera: '130/90-16',
    delanteraSlug: '90-90-21', traseraSlug: '130-90-16',
    priceDelantera: 69990, priceTrasera: 82990, constructionType: 'TL', terrain: 'ciudad',
  },
  {
    label: 'Honda CRF 300L Rally',
    type: 'dualsport', productSlug: 'kenda-k761-dual-sport', categoria: 'dual-sport',
    modelRef: 'K761 Dual Sport', delantera: '110/80-18', trasera: '130/90-16',
    delanteraSlug: '110-80-18', traseraSlug: '130-90-16',
    priceDelantera: 74990, priceTrasera: 82990, constructionType: 'TL', terrain: 'mixto',
  },
  {
    label: 'Kawasaki KLX 300',
    type: 'dualsport', productSlug: 'kenda-k761-dual-sport', categoria: 'dual-sport',
    modelRef: 'K761 Dual Sport', delantera: '90/90-21', trasera: '130/90-16',
    delanteraSlug: '90-90-21', traseraSlug: '130-90-16',
    priceDelantera: 69990, priceTrasera: 82990, constructionType: 'TL', terrain: 'ciudad',
  },
  {
    label: 'Suzuki DR 650',
    type: 'dualsport', productSlug: 'kenda-k761-dual-sport', categoria: 'dual-sport',
    modelRef: 'K761 Dual Sport', delantera: '90/90-21', trasera: '130/90-16',
    delanteraSlug: '90-90-21', traseraSlug: '130-90-16',
    priceDelantera: 69990, priceTrasera: 82990, constructionType: 'TL', terrain: 'ciudad',
  },
  {
    label: 'Suzuki DRZ 400',
    type: 'dualsport', productSlug: 'kenda-k761-dual-sport', categoria: 'dual-sport',
    modelRef: 'K761 Dual Sport', delantera: '110/80-18', trasera: '130/90-16',
    delanteraSlug: '110-80-18', traseraSlug: '130-90-16',
    priceDelantera: 74990, priceTrasera: 82990, constructionType: 'TL', terrain: 'mixto',
  },
  {
    label: 'Royal Enfield Himalayan (antigua)',
    type: 'dualsport', productSlug: 'kenda-k761-dual-sport', categoria: 'dual-sport',
    modelRef: 'K761 Dual Sport', delantera: '90/90-21', trasera: '130/90-16',
    delanteraSlug: '90-90-21', traseraSlug: '130-90-16',
    priceDelantera: 69990, priceTrasera: 82990, constructionType: 'TL', terrain: 'ciudad',
  },
  {
    label: 'CFMoto 400NK Enduro',
    type: 'dualsport', productSlug: 'kenda-k761-dual-sport', categoria: 'dual-sport',
    modelRef: 'K761 Dual Sport', delantera: '100/90-19', trasera: '130/90-16',
    delanteraSlug: '100-90-19', traseraSlug: '130-90-16',
    priceDelantera: 72990, priceTrasera: 82990, constructionType: 'TL', terrain: 'mixto',
  },
  {
    label: 'Honda XR 190',
    type: 'dualsport', productSlug: 'kenda-k761-dual-sport', categoria: 'dual-sport',
    modelRef: 'K761 Dual Sport', delantera: '100/90-19', trasera: '130/90-16',
    delanteraSlug: '100-90-19', traseraSlug: '130-90-16',
    priceDelantera: 72990, priceTrasera: 82990, constructionType: 'TL', terrain: 'ciudad',
  },
]

export function getMotosByType(type: MotoType): MotoEntry[] {
  return MOTO_COMPAT.filter(m => m.type === type)
}

export function getMotoByLabel(label: string): MotoEntry | undefined {
  return MOTO_COMPAT.find(m => m.label === label)
}
