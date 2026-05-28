import type { Metadata } from 'next'
import { Barlow_Condensed, Barlow } from 'next/font/google'
import './globals.css'
import { Topbar } from '@/components/ui/Topbar'
import { Nav } from '@/components/ui/Nav'
import { Footer } from '@/components/ui/Footer'
import { WhatsAppFloat } from '@/components/ui/WhatsAppFloat'
import { siteUrl } from '@/lib/site'
import { buildLocalBusinessSchema, buildOrganizationSchema } from '@/lib/schema'

const barlowCondensed = Barlow_Condensed({
  weight: ['600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const barlow = Barlow({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Neumáticos Kenda Moto Chile | Distribuidor Iquique ZOFRI | Envío Gratis',
    template: '%s | Kenda Moto Chile',
  },
  description:
    'Distribuidor oficial Kenda en Chile. Neumáticos y cámaras para moto enduro, trail, motocross, calle y scooter. Importación directa Zona Franca Iquique ZOFRI. Envío gratis a todo Chile.',
  alternates: {
    canonical: '/',
    languages: { 'es-CL': '/' },
  },
  openGraph: {
    locale: 'es_CL',
    siteName: 'Kenda Moto Chile',
    type: 'website',
  },
  robots:
    process.env.NEXT_PUBLIC_SITE_LIVE === 'true'
      ? { index: true, follow: true, googleBot: { index: true, follow: true } }
      : { index: false, follow: false },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const localBusiness = buildLocalBusinessSchema()
  const organization = buildOrganizationSchema()

  return (
    <html lang="es-CL" className={`${barlowCondensed.variable} ${barlow.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
        />
        <link rel="alternate" hrefLang="es-CL" href={siteUrl} />
        <link rel="alternate" hrefLang="x-default" href={siteUrl} />
      </head>
      <body style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Topbar />
        <Nav />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  )
}
