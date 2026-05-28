import type { Product, Size } from './types'

export function sizeToSlug(medida: string): string {
  return medida
    .toLowerCase()
    .replace(/\//g, '-')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

export function getSizeFromSlug(product: Product | null, slug: string): Size | null {
  if (!product) return null
  return product.sizes.find(s => sizeToSlug(s.medida) === slug) ?? null
}

export function getDefaultSize(product: Product): Size {
  return (
    product.sizes.find(s => s.stock === 'in_stock' && s.position === 'delantera') ??
    product.sizes.find(s => s.stock === 'in_stock') ??
    product.sizes[0]
  )
}

export async function getProducts(): Promise<Product[]> {
  if (process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
    // Phase 2: return getShopifyProducts()
  }
  const data = (await import('@/data/products.json')).default
  return data as unknown as Product[]
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getProducts()
  return products.find(p => p.slug === slug) ?? null
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await getProducts()
  return products.filter(p => p.isFeatured)
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const products = await getProducts()
  return products.filter(p => p.category === category)
}

export function formatPriceCLP(price: number): string {
  return `$${price.toLocaleString('es-CL')}`
}
