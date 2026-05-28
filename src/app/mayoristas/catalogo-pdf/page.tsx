import type { Metadata } from 'next'
import Link from 'next/link'
import { absoluteUrl } from '@/lib/site'
import { buildBreadcrumb } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Catálogo PDF Neumáticos Kenda Moto Chile — Descarga Gratis | Kenda Moto',
  description:
    'Descarga el catálogo completo de neumáticos y cámaras Kenda para moto disponibles en Chile. Medidas, precios y compatibilidad. Actualizado 2025.',
  alternates: { canonical: absoluteUrl('/mayoristas/catalogo-pdf/') },
}

const categorias = [
  { nombre: 'Enduro / Off-Road', refs: '4 modelos, 18 medidas', highlight: true },
  { nombre: 'Trail Adventure', refs: '2 modelos, 8 medidas', highlight: false },
  { nombre: 'Motocross / MX', refs: '1 modelo, 4 medidas', highlight: false },
  { nombre: 'Dual Sport', refs: '1 modelo, 6 medidas', highlight: false },
  { nombre: 'Cámaras estándar', refs: '12 medidas', highlight: false },
  { nombre: 'Cámaras reforzadas', refs: '8 medidas', highlight: false },
  { nombre: 'Cámaras scooter', refs: '10 medidas', highlight: false },
]

export default function CatalogoPdfPage() {
  const breadcrumb = buildBreadcrumb([
    { name: 'Inicio', url: absoluteUrl('/') },
    { name: 'Mayoristas', url: absoluteUrl('/mayoristas/') },
    { name: 'Catálogo PDF', url: absoluteUrl('/mayoristas/catalogo-pdf/') },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <section style={{ background: 'var(--ink)', color: 'white', padding: '64px 0' }}>
        <div className="wrap">
          <div className="eyebrow mb-4" style={{ color: 'var(--kenda)' }}>Mayoristas · Recursos</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(32px, 6vw, 64px)', textTransform: 'uppercase', letterSpacing: '-0.01em', lineHeight: 0.95 }}>
            Catálogo Kenda Moto Chile
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'var(--dim)', maxWidth: '520px', lineHeight: 1.6, marginTop: '16px' }}>
            Catálogo completo de neumáticos y cámaras Kenda disponibles en Chile. Incluye medidas, precios de lista y compatibilidad por modelo de moto.
          </p>
        </div>
      </section>

      <nav style={{ background: 'var(--cream)', borderBottom: '1px solid var(--line)', padding: '12px 0' }}>
        <div className="wrap" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--muted)' }}>
          <Link href="/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Inicio</Link>
          {' › '}
          <Link href="/mayoristas/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Mayoristas</Link>
          {' › '}
          <span style={{ color: 'var(--text)' }}>Catálogo PDF</span>
        </div>
      </nav>

      <section style={{ padding: '64px 0', background: 'var(--paper)' }}>
        <div className="wrap" style={{ maxWidth: '800px' }}>

          <div style={{ background: 'var(--kenda-tint)', border: '2px solid var(--kenda)', padding: '40px', marginBottom: '48px', textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📄</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '28px', textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: '12px' }}>
              Catálogo General 2025
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '24px', maxWidth: '480px', margin: '0 auto 24px' }}>
              El catálogo en PDF incluye todas las referencias disponibles en nuestra bodega ZOFRI, con medidas, precios de lista y tabla de compatibilidad por modelo de moto.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '16px' }}>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP?.replace(/[^0-9]/g, '') ?? '56900000000'}?text=${encodeURIComponent('Hola, quiero recibir el catálogo PDF de neumáticos Kenda 2025.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Solicitar catálogo por WhatsApp
              </a>
              <a href="mailto:ventas@kendamoto.cl?subject=Solicitud catálogo Kenda 2025" className="btn-outline">
                Solicitar por email
              </a>
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--muted)' }}>
              El catálogo se envía por WhatsApp o email en formato PDF. Actualizado enero 2025.
            </p>
          </div>

          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '22px', textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: '16px' }}>
            Contenido del catálogo
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '48px' }}>
            {categorias.map(cat => (
              <div key={cat.nombre} style={{ background: cat.highlight ? 'var(--kenda-tint)' : 'var(--cream)', border: `1px solid ${cat.highlight ? 'var(--kenda)' : 'var(--line)'}`, padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px', textTransform: 'uppercase', letterSpacing: '-0.01em' }}>{cat.nombre}</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--muted)' }}>{cat.refs}</div>
              </div>
            ))}
          </div>

          <div style={{ background: 'var(--cream)', border: '1px solid var(--line)', padding: '32px', marginBottom: '32px' }}>
            <div className="eyebrow mb-3">¿Eres mayorista?</div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '20px' }}>
              Los distribuidores y talleres con Cuenta Pro tienen acceso a la lista de precios con descuento mayorista directamente desde su ejecutivo comercial. El catálogo público muestra precios de lista.
            </p>
            <Link href="/mayoristas/registro-cuenta-pro/" className="btn-primary">Solicitar Cuenta Pro →</Link>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/neumaticos-kenda-moto/" className="btn-outline">Ver catálogo online</Link>
            <Link href="/mayoristas/cotizacion/" className="btn-outline">Solicitar cotización</Link>
          </div>
        </div>
      </section>
    </>
  )
}
