import type { Metadata } from 'next'
import Link from 'next/link'
import { absoluteUrl } from '@/lib/site'
import { buildBreadcrumb } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Marca Kenda Tires — Historia, Tecnología y Distribución en Chile | Kenda Moto',
  description:
    'Conoce la marca Kenda Tires: 60 años fabricando neumáticos de alto rendimiento. Distribuidor oficial en Chile desde 2000 — Carioca Chile Ltda. ZOFRI Iquique.',
  alternates: { canonical: absoluteUrl('/marca-kenda/') },
}

const sections = [
  {
    slug: 'historia',
    title: 'Historia Kenda',
    desc: 'Desde Changhua, Taiwan, hasta el mundo. La historia de 60 años de Kenda Rubber Industrial Co.',
    icon: '📅',
  },
  {
    slug: 'tecnologia',
    title: 'Tecnología Kenda',
    desc: 'Procesos de fabricación, compuestos de goma avanzados y pruebas de rendimiento internacionales.',
    icon: '⚙️',
  },
  {
    slug: 'distribuidores-chile',
    title: 'Distribuidores en Chile',
    desc: 'Carioca Chile Ltda. — distribuidor oficial exclusivo desde 2000 desde ZOFRI Iquique.',
    icon: '🇨🇱',
  },
  {
    slug: 'garantia',
    title: 'Garantía Kenda',
    desc: 'Política de garantía de neumáticos y cámaras Kenda para el mercado chileno.',
    icon: '✓',
  },
]

export default function MarcaKendaPage() {
  const breadcrumb = buildBreadcrumb([
    { name: 'Inicio', url: absoluteUrl('/') },
    { name: 'Marca Kenda', url: absoluteUrl('/marca-kenda/') },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <section style={{ background: 'var(--ink)', color: 'white', padding: '64px 0' }}>
        <div className="wrap">
          <div className="eyebrow mb-4" style={{ color: 'var(--kenda)' }}>Marca Kenda</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(36px, 6vw, 72px)', textTransform: 'uppercase', letterSpacing: '-0.01em', lineHeight: 0.95, marginBottom: '16px' }}>
            Kenda Tires — Desde 1962
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'var(--dim)', maxWidth: '560px', lineHeight: 1.6 }}>
            60 años fabricando neumáticos de alta performance en Taiwan. Presente en más de 50 países.
            Distribuidor oficial en Chile desde 2000 a través de Carioca Chile Ltda. (RUT 78.846.500-9), ZOFRI Iquique.
          </p>
        </div>
      </section>

      <nav style={{ background: 'var(--cream)', borderBottom: '1px solid var(--line)', padding: '12px 0' }}>
        <div className="wrap" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--muted)' }}>
          <Link href="/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Inicio</Link>
          {' › '}
          <span style={{ color: 'var(--text)' }}>Marca Kenda</span>
        </div>
      </nav>

      {/* Brand statement */}
      <section style={{ padding: '80px 0', background: 'var(--paper)' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '48px', alignItems: 'center', marginBottom: '80px' }}>
            <div>
              <div className="eyebrow mb-4">Quiénes somos</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 48px)', textTransform: 'uppercase', letterSpacing: '-0.01em', lineHeight: 1, marginBottom: '20px' }}>
                Kenda Rubber Industrial Co., Ltd.
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--muted)', lineHeight: 1.8, marginBottom: '16px' }}>
                Fundada en 1962 en Changhua, Taiwan, Kenda Rubber Industrial Co., Ltd. es uno de los fabricantes de neumáticos más importantes del mundo. Con plantas de producción en Taiwan, China, Vietnam e Indonesia, produce más de 100 millones de neumáticos al año para bicicleta, moto, auto y maquinaria industrial.
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--muted)', lineHeight: 1.8 }}>
                En el segmento de motos, Kenda es reconocida especialmente por sus neumáticos de enduro, trail adventure y motocross, utilizados por motociclistas en más de 50 países.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {[
                { value: '1962', label: 'Año de fundación' },
                { value: '60+', label: 'Años de experiencia' },
                { value: '50+', label: 'Países de distribución' },
                { value: '100M+', label: 'Neumáticos / año' },
              ].map(s => (
                <div key={s.label} style={{ background: 'var(--cream)', border: '1px solid var(--line)', padding: '24px 20px' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '32px', color: 'var(--kenda)', letterSpacing: '-0.02em' }}>{s.value}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--muted)', marginTop: '4px' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Sub-sections */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            {sections.map(s => (
              <Link key={s.slug} href={`/marca-kenda/${s.slug}/`} style={{ textDecoration: 'none' }}>
                <div style={{ background: 'var(--cream)', border: '1px solid var(--line)', padding: '32px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: '28px', marginBottom: '16px' }}>{s.icon}</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '22px', textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: '8px' }}>{s.title}</div>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--muted)', lineHeight: 1.5 }}>{s.desc}</p>
                  </div>
                  <div style={{ marginTop: '20px', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--kenda)' }}>
                    Leer más →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
