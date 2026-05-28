import { absoluteUrl } from './site'
import { sizeToSlug } from './products'
import type { Product, Size, FAQItem } from './types'

export function buildLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Carioca Chile Ltda. — Kenda Moto',
    legalName: 'Carioca Chile Ltda.',
    taxID: '78.846.500-9',
    foundingDate: '1996',
    numberOfEmployees: { '@type': 'QuantitativeValue', minValue: 1, maxValue: 10 },
    url: absoluteUrl('/'),
    logo: absoluteUrl('/kenda-logo.png'),
    image: absoluteUrl('/og-default.jpg'),
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Zona Franca de Iquique ZOFRI',
      addressLocality: 'Iquique',
      addressRegion: 'Tarapacá',
      postalCode: '1100000',
      addressCountry: 'CL',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -20.2693,
      longitude: -70.1479,
    },
    telephone: '+56572000000',
    email: 'ventas@kendamoto.cl',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    areaServed: { '@type': 'Country', name: 'Chile' },
    priceRange: '$$',
    sameAs: ['https://kendamoto.cl'],
  }
}

export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Kenda Moto Chile',
    legalName: 'Carioca Chile Ltda.',
    taxID: '78.846.500-9',
    url: absoluteUrl('/'),
    logo: absoluteUrl('/kenda-logo.png'),
    foundingDate: '1996',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'ventas@kendamoto.cl',
      areaServed: 'CL',
      availableLanguage: 'Spanish',
    },
  }
}

export function buildProductSchema(product: Product, size: Size, categoria: string) {
  const url = absoluteUrl(
    `/neumaticos-kenda-moto/${categoria}/${product.slug}/${sizeToSlug(size.medida)}/`
  )
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${product.name} ${size.medida}`,
    description: `Neumático Kenda ${product.ref} medida ${size.medida} para moto ${product.tagline}. Distribuidor oficial Chile.`,
    sku: `${product.ref}-${sizeToSlug(size.medida).toUpperCase()}`,
    mpn: product.ref,
    brand: { '@type': 'Brand', name: 'Kenda' },
    manufacturer: {
      '@type': 'Organization',
      name: 'Kenda Rubber Industrial Co., Ltd.',
      foundingDate: '1962',
    },
    seller: {
      '@type': 'Organization',
      name: 'Carioca Chile Ltda.',
      foundingDate: '1996',
    },
    url,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'CLP',
      price: size.priceCLP,
      availability:
        size.stock === 'in_stock'
          ? 'https://schema.org/InStock'
          : size.stock === 'low_stock'
          ? 'https://schema.org/LimitedAvailability'
          : 'https://schema.org/OutOfStock',
      priceValidUntil: '2025-12-31',
      url,
      seller: { '@type': 'Organization', name: 'Carioca Chile Ltda.' },
    },
  }
}

export function buildBreadcrumb(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function buildFAQ(items: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

export function buildCollectionPage(
  name: string,
  url: string,
  products: { slug: string; name: string; categoria: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    url,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: products.length,
      itemListElement: products.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: absoluteUrl(`/neumaticos-kenda-moto/${p.categoria}/${p.slug}/`),
        name: p.name,
      })),
    },
  }
}
