import type { Metadata } from 'next'
import Link from 'next/link'
import { absoluteUrl } from '@/lib/site'
import { buildBreadcrumb } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Historia de Kenda Tires — Desde 1962 | Kenda Moto Chile',
  description:
    'La historia de Kenda Rubber Industrial Co., Ltd. desde su fundación en 1962 en Changhua, Taiwan, hasta convertirse en una de las marcas de neumáticos más reconocidas del mundo.',
  alternates: { canonical: absoluteUrl('/marca-kenda/historia/') },
}

const hitos = [
  { year: '1962', title: 'Fundación en Taiwan', desc: 'Kenda Rubber Industrial Co., Ltd. es fundada en Changhua, Taiwan. Inicio con fabricación de neumáticos para bicicleta.' },
  { year: '1970', title: 'Expansión a moto y auto', desc: 'Kenda amplía su línea de productos a neumáticos para motocicleta y automóvil, consolidando su posición en el mercado asiático.' },
  { year: '1990', title: 'Internacionalización', desc: 'Kenda comienza su expansión internacional, estableciendo distribuidores en Europa, Latinoamérica y Norteamérica.' },
  { year: '1996', title: 'Llegada a Chile', desc: 'Carioca Chile Ltda. (RUT 78.846.500-9) es fundada en Chile y se convierte en el distribuidor oficial exclusivo de Kenda Tires para el mercado chileno, operando desde la Zona Franca de Iquique (ZOFRI).' },
  { year: '2010', title: 'Expansión productiva', desc: 'Kenda abre plantas de producción en China y Vietnam para satisfacer la demanda global creciente, manteniendo los estándares de calidad Taiwan.' },
  { year: '2024', title: 'Presencia global', desc: 'Kenda está presente en más de 50 países, con distribución activa en toda Latinoamérica y un catálogo de más de 2.000 referencias de neumáticos.' },
]

export default function HistoriaKendaPage() {
  const breadcrumb = buildBreadcrumb([
    { name: 'Inicio', url: absoluteUrl('/') },
    { name: 'Marca Kenda', url: absoluteUrl('/marca-kenda/') },
    { name: 'Historia', url: absoluteUrl('/marca-kenda/historia/') },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <section style={{ background: 'var(--ink)', color: 'white', padding: '64px 0' }}>
        <div className="wrap">
          <div className="eyebrow mb-4" style={{ color: 'var(--kenda)' }}>Historia · Kenda Tires</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(32px, 6vw, 64px)', textTransform: 'uppercase', letterSpacing: '-0.01em', lineHeight: 0.95 }}>
            Kenda Tires — 60 Años de Historia
          </h1>
        </div>
      </section>

      <nav style={{ background: 'var(--cream)', borderBottom: '1px solid var(--line)', padding: '12px 0' }}>
        <div className="wrap" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--muted)' }}>
          <Link href="/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Inicio</Link>
          {' › '}
          <Link href="/marca-kenda/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Marca Kenda</Link>
          {' › '}
          <span style={{ color: 'var(--text)' }}>Historia</span>
        </div>
      </nav>

      <section style={{ padding: '64px 0', background: 'var(--paper)' }}>
        <div className="wrap" style={{ maxWidth: '800px' }}>
          <div className="eyebrow mb-6">Línea de tiempo</div>
          <div style={{ position: 'relative' }}>
            {hitos.map((hito, i) => (
              <div key={hito.year} style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '24px', marginBottom: '40px' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '24px', color: 'var(--kenda)', lineHeight: 1 }}>{hito.year}</div>
                </div>
                <div style={{ borderLeft: '2px solid var(--line)', paddingLeft: '24px', paddingBottom: i < hitos.length - 1 ? '24px' : 0 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '18px', textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: '8px' }}>{hito.title}</div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--muted)', lineHeight: 1.7 }}>{hito.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '48px', background: 'var(--cream)', border: '1px solid var(--line)', padding: '32px' }}>
            <div className="eyebrow mb-3">Kenda en Chile hoy</div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--muted)', lineHeight: 1.8 }}>
              Carioca Chile Ltda. mantiene más de 200 referencias Kenda en stock permanente en nuestra bodega de la Zona Franca de Iquique (ZOFRI). Con casi 30 años como distribuidor exclusivo (desde 1996), somos el punto de entrada oficial de Kenda Tires al mercado chileno.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
