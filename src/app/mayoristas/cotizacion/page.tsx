import type { Metadata } from 'next'
import Link from 'next/link'
import { absoluteUrl } from '@/lib/site'
import { buildBreadcrumb } from '@/lib/schema'
import CotizacionForm from '@/components/mayoristas/CotizacionForm'

export const metadata: Metadata = {
  title: 'Cotización Mayorista Kenda Chile — Precios Distribuidor | Kenda Moto',
  description:
    'Solicita una cotización mayorista de neumáticos y cámaras Kenda para tu taller o negocio. Precios de distribuidor, mínimos de compra flexibles, envío a todo Chile.',
  alternates: { canonical: absoluteUrl('/mayoristas/cotizacion/') },
}

export default function CotizacionPage() {
  const breadcrumb = buildBreadcrumb([
    { name: 'Inicio', url: absoluteUrl('/') },
    { name: 'Mayoristas', url: absoluteUrl('/mayoristas/') },
    { name: 'Cotización', url: absoluteUrl('/mayoristas/cotizacion/') },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <section style={{ background: 'var(--ink)', color: 'white', padding: '64px 0' }}>
        <div className="wrap">
          <div className="eyebrow mb-4" style={{ color: 'var(--kenda)' }}>B2B · Mayoristas</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(32px, 6vw, 64px)', textTransform: 'uppercase', letterSpacing: '-0.01em', lineHeight: 0.95 }}>
            Solicitar Cotización Mayorista
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'var(--dim)', maxWidth: '520px', lineHeight: 1.6, marginTop: '16px' }}>
            Completa el formulario y recibe una cotización con precios de distribuidor en menos de 24 horas hábiles.
          </p>
        </div>
      </section>

      <nav style={{ background: 'var(--cream)', borderBottom: '1px solid var(--line)', padding: '12px 0' }}>
        <div className="wrap" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--muted)' }}>
          <Link href="/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Inicio</Link>
          {' › '}
          <Link href="/mayoristas/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Mayoristas</Link>
          {' › '}
          <span style={{ color: 'var(--text)' }}>Cotización</span>
        </div>
      </nav>

      <CotizacionForm />
    </>
  )
}
