export type ProductCategory =
  | 'trail-adventure'
  | 'enduro'
  | 'cross-motocross'
  | 'calle-carretera'
  | 'dual-sport'
  | 'scooter'
  | 'supermoto-pista'
  | 'custom-chopper'

export type UsageType =
  | 'trail'
  | 'adventure'
  | 'dual-sport'
  | 'enduro'
  | 'motocross'
  | 'calle'
  | 'carretera'
  | 'scooter'
  | 'supermoto'
  | 'custom'

export interface Size {
  medida: string
  position: 'delantera' | 'trasera' | 'ambas'
  type: ('TL' | 'TT')[]
  speedIndex: string
  loadIndex: string
  priceCLP: number
  originalPriceCLP?: number
  stock: 'in_stock' | 'low_stock' | 'out_of_stock'
  seoH2?: string
  seoText?: string
  compatMotos?: string[]
}

export interface UsageRating {
  carretera?: number
  trail?: number
  offroad?: number
  enduro?: number
  motocross?: number
  urbano?: number
}

export interface ProductSchemaData {
  brand: string
  manufacturer: string
  countryOfOrigin?: string
}

export interface SEOMeta {
  title: string
  description: string
  canonical?: string
}

export interface Product {
  slug: string
  ref: string
  name: string
  tagline: string
  category: ProductCategory
  uso: UsageType[]
  description: string
  features: string[]
  sizes: Size[]
  usage: UsageRating
  motos: string[]
  schema: ProductSchemaData
  seo: SEOMeta
  isNew?: boolean
  isFeatured?: boolean
  reviews?: Review[]
}

export interface TerrainCard {
  terrain: string
  icon: string
  percentage: number
  description: string
  model: string
}

export interface MotoCompat {
  make: string
  model: string
  front: string
  rear: string
  cc: string
}

export interface FAQItem {
  question: string
  answer: string
}

export interface Review {
  author: string
  location: string
  date: string
  rating: number
  text: string
}

export interface CategoryData {
  slug: string
  name: string
  h1: string
  metaTitle: string
  metaDescription: string
  eyebrow?: string
  lead?: string
  stats?: { value: string; label: string }[]
  featuredModel: string
  usageTag: string
  products: string[]
  popularSizes?: string[]
  keywords: string[]
  schemas?: string[]
  relatedCategories?: string[]
  terrainCards?: TerrainCard[]
  compatibleMotos?: MotoCompat[]
  faq?: FAQItem[]
}

export interface City {
  slug: string
  name: string
  region: string
  isSede?: boolean
  h1: string
  description: string
  deliveryDays: string
  localContent?: string
  terrain?: string
  vol?: number
  priority?: number
}
