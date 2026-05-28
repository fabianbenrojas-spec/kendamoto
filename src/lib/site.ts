export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '')
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  return 'http://localhost:3000'
}

export function absoluteUrl(path: string): string {
  const base = getSiteUrl()
  const clean = path.startsWith('/') ? path : `/${path}`
  return `${base}${clean}`
}

export const siteUrl = getSiteUrl()

export const SITE_NAME = 'Kenda Moto Chile'
export const SITE_LEGAL_NAME = 'Carioca Chile Ltda.'
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP ?? '+56900000000'
export const CONTACT_EMAIL = 'ventas@kendamoto.cl'
export const B2B_EMAIL = 'mayoristas@kendamoto.cl'
