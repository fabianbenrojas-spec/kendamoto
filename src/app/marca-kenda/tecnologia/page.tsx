import type { Metadata } from 'next'
import Link from 'next/link'
import { absoluteUrl } from '@/lib/site'
import { buildBreadcrumb } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Tecnología Kenda Tires — Fabricación y Compuestos | Kenda Moto Chile',
  description:
    'Tecnología de fabricación Kenda Tires: compuestos de goma avanzados, diseño de banda de rodadura y procesos de control de calidad para neumáticos de moto.',
  alternates: { canonical: absoluteUrl('/marca-kenda/tecnologia/') },
}

const features = [
  {
    title: 'Compuesto de goma dual',
    desc: 'Los neumáticos Kenda de alto rendimiento utilizan compuestos de goma dual que combinan un núcleo duro para soporte estructural con una capa exterior blanda para máximo grip.',
    icon: '🔬',
  },
  {
    title: 'Diseño de banda por terreno',
    desc: 'Cada modelo Kenda tiene un patrón de banda específico para su terreno: bloques abiertos y espaciados para off-road blando, bloques compactos para carretera y mixto.',
    icon: '🎨',
  },
  {
    title: 'Carcasa reforzada',
    desc: 'Las carcasas Kenda incorporan capas de acero y nylon de alta resistencia para mayor durabilidad y resistencia a pinchazos, especialmente en los modelos off-road.',
    icon: '🏗️',
  },
  {
    title: 'Control de calidad',
    desc: 'Cada neumático pasa por pruebas de uniformidad, balance, presión y resistencia antes de salir de fábrica. Kenda cumple con los estándares internacionales ECE y DOT.',
    icon: '✅',
  },
]

export default function TecnologiaKendaPage() {
  const breadcrumb = buildBreadcrumb([
    { name: 'Inicio', url: absoluteUrl('/') },
    { name: 'Marca Kenda', url: absoluteUrl('/marca-kenda/') },
    { name: 'Tecnología', url: absoluteUrl('/marca-kenda/tecnologia/') },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <section style={{ background: 'var(--ink)', color: 'white', padding: '64px 0' }}>
        <div className="wrap">
          <div className="eyebrow mb-4" style={{ color: 'var(--kenda)' }}>Tecnología · Kenda</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(32px, 6vw, 64px)', textTransform: 'uppercase', letterSpacing: '-0.01em', lineHeight: 0.95 }}>
            Tecnología Kenda Tires
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'var(--dim)', maxWidth: '560px', lineHeight: 1.6, marginTop: '16px' }}>
            Más de 60 años de I+D en materiales y procesos de fabricación de neumáticos de alta performance para moto.
          </p>
        </div>
      </section>

      <nav style={{ background: 'var(--cream)', borderBottom: '1px solid var(--line)', padding: '12px 0' }}>
        <div className="wrap" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--muted)' }}>
          <Link href="/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Inicio</Link>
          {' › '}
          <Link href="/marca-kenda/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Marca Kenda</Link>
          {' › '}
          <span style={{ color: 'var(--text)' }}>Tecnología</span>
        </div>
      </nav>

      <section style={{ padding: '64px 0', background: 'var(--paper)' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {features.map(f => (
              <div key={f.title} style={{ background: 'var(--cream)', border: '1px solid var(--line)', padding: '32px' }}>
                <div style={{ fontSize: '32px', marginBottom: '16px' }}>{f.icon}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '20px', textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: '12px' }}>{f.title}</div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--muted)', lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '64px', background: 'var(--ink)', color: 'white', padding: '48px' }}>
            <div className="eyebrow mb-4" style={{ color: 'var(--kenda)' }}>Fabricado en Taiwan</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '32px', textTransform: 'uppercase', letterSpacing: '-0.01em', lineHeight: 1, marginBottom: '16px' }}>
              Importación directa a Chile
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--dim)', lineHeight: 1.8, maxWidth: '600px' }}>
              Los neumáticos Kenda disponibles en Chile son importados directamente desde Taiwan por Carioca Chile Ltda. a través de la Zona Franca de Iquique (ZOFRI). Esto garantiza la autenticidad del producto y los mejores precios del mercado nacional.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
