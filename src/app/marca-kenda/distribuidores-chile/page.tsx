import type { Metadata } from 'next'
import Link from 'next/link'
import { absoluteUrl } from '@/lib/site'
import { buildBreadcrumb, buildLocalBusinessSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Distribuidor Oficial Kenda en Chile — Carioca Chile Ltda. ZOFRI | Kenda Moto',
  description:
    'Carioca Chile Ltda. (RUT 78.846.500-9) es el distribuidor oficial exclusivo de Kenda Tires en Chile. Fundada en 2000. Bodega en Zona Franca de Iquique (ZOFRI). Envío a todo Chile.',
  alternates: { canonical: absoluteUrl('/marca-kenda/distribuidores-chile/') },
}

export default function DistribuidoresChilePage() {
  const breadcrumb = buildBreadcrumb([
    { name: 'Inicio', url: absoluteUrl('/') },
    { name: 'Marca Kenda', url: absoluteUrl('/marca-kenda/') },
    { name: 'Distribuidores Chile', url: absoluteUrl('/marca-kenda/distribuidores-chile/') },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildLocalBusinessSchema()) }} />

      <section style={{ background: 'var(--ink)', color: 'white', padding: '64px 0' }}>
        <div className="wrap">
          <div className="eyebrow mb-4" style={{ color: 'var(--kenda)' }}>Distribuidores · Chile</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(32px, 6vw, 64px)', textTransform: 'uppercase', letterSpacing: '-0.01em', lineHeight: 0.95 }}>
            Distribuidor Oficial Kenda en Chile
          </h1>
        </div>
      </section>

      <nav style={{ background: 'var(--cream)', borderBottom: '1px solid var(--line)', padding: '12px 0' }}>
        <div className="wrap" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--muted)' }}>
          <Link href="/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Inicio</Link>
          {' › '}
          <Link href="/marca-kenda/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Marca Kenda</Link>
          {' › '}
          <span style={{ color: 'var(--text)' }}>Distribuidores Chile</span>
        </div>
      </nav>

      <section style={{ padding: '64px 0', background: 'var(--paper)' }}>
        <div className="wrap" style={{ maxWidth: '800px' }}>
          <div style={{ background: 'var(--kenda-tint)', border: '2px solid var(--kenda)', padding: '32px', marginBottom: '48px' }}>
            <div className="eyebrow mb-3" style={{ color: 'var(--kenda)' }}>Distribuidor exclusivo</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '28px', textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: '16px' }}>
              Carioca Chile Ltda.
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text)', lineHeight: 1.8 }}>
              <div>
                <strong>Razón social:</strong><br />Carioca Chile Ltda.<br /><br />
                <strong>RUT:</strong><br />78.846.500-9<br /><br />
                <strong>Tipo de empresa:</strong><br />Soc. de Responsabilidad Limitada<br /><br />
                <strong>Giro SII:</strong><br />Importadora y Exportadora de Bicicletas<br /><br />
                <strong>Año de fundación:</strong><br />2000<br /><br />
                <strong>Trabajadores:</strong><br />1–10
              </div>
              <div>
                <strong>Actividad:</strong><br />Importación y distribución de neumáticos y cámaras Kenda<br /><br />
                <strong>Sede:</strong><br />Zona Franca de Iquique (ZOFRI)<br />Iquique, Región de Tarapacá<br />Chile<br /><br />
                <strong>Cobertura:</strong><br />Las 16 regiones de Chile<br /><br />
                <strong>Email:</strong><br />ventas@kendamoto.cl<br />mayoristas@kendamoto.cl
              </div>
            </div>
          </div>

          <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'var(--text)', lineHeight: 1.8, marginBottom: '24px' }}>
            Carioca Chile Ltda. (RUT 78.846.500-9) es el único importador y distribuidor oficial autorizado por Kenda Rubber Industrial Co., Ltd. (Taiwan) para el mercado chileno. Fundada en 2000, operamos desde la Zona Franca de Iquique, lo que nos permite importar directamente desde Taiwan con los beneficios arancelarios de la ZOFRI.
          </p>

          <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'var(--text)', lineHeight: 1.8, marginBottom: '40px' }}>
            Todos los neumáticos y cámaras Kenda que vendemos son 100% originales, con número de serie verificable y garantía oficial de Kenda Tires. No somos revendedores de terceros — importamos directamente y despachamos desde nuestra bodega en ZOFRI.
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/mayoristas/" className="btn-primary">Portal Mayoristas B2B</Link>
            <Link href="/neumaticos-kenda-moto/" className="btn-outline">Ver catálogo</Link>
          </div>
        </div>
      </section>
    </>
  )
}
