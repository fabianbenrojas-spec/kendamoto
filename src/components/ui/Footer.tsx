import Link from 'next/link'

export function Footer() {
  return (
    <footer style={{ background: 'var(--ink)', color: 'white', marginTop: 'auto' }}>
      <div className="wrap" style={{ padding: '64px var(--pad-x) 40px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '40px',
          }}
        >
          {/* Brand + Contact */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '22px',
                letterSpacing: '-0.01em',
                marginBottom: '8px',
              }}
            >
              <span style={{ color: 'var(--kenda)' }}>KENDA</span> MOTO CHILE
            </div>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                color: 'var(--dim)',
                marginBottom: '16px',
              }}
            >
              Carioca Chile Ltda.<br />
              Distribuidor Oficial Kenda<br />
              Zona Franca ZOFRI · Iquique
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--dim)', lineHeight: 1.8 }}>
              <div>ventas@kendamoto.cl</div>
              <div>mayoristas@kendamoto.cl</div>
            </div>
          </div>

          {/* Neumáticos */}
          <div>
            <div className="eyebrow mb-4" style={{ color: 'var(--kenda)' }}>Neumáticos</div>
            {[
              { label: 'Trail Adventure', href: '/neumaticos-kenda-moto/trail-adventure/' },
              { label: 'Enduro', href: '/neumaticos-kenda-moto/enduro/' },
              { label: 'Motocross', href: '/neumaticos-kenda-moto/cross-motocross/' },
              { label: 'Dual Sport', href: '/neumaticos-kenda-moto/dual-sport/' },
              { label: 'Calle / Carretera', href: '/neumaticos-kenda-moto/calle-carretera/' },
              { label: 'Scooter', href: '/neumaticos-kenda-moto/scooter/' },
            ].map(item => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  color: 'var(--dim)',
                  textDecoration: 'none',
                  padding: '3px 0',
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Tiendas / Villes */}
          <div>
            <div className="eyebrow mb-4" style={{ color: 'var(--kenda)' }}>Envíos a Chile</div>
            {[
              { label: 'Iquique (Sede ZOFRI)', href: '/neumaticos-moto-chile/iquique/' },
              { label: 'Santiago', href: '/neumaticos-moto-chile/santiago/' },
              { label: 'Concepción', href: '/neumaticos-moto-chile/concepcion/' },
              { label: 'Valparaíso', href: '/neumaticos-moto-chile/valparaiso/' },
              { label: 'Temuco', href: '/neumaticos-moto-chile/temuco/' },
              { label: 'Antofagasta', href: '/neumaticos-moto-chile/antofagasta/' },
            ].map(item => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  color: 'var(--dim)',
                  textDecoration: 'none',
                  padding: '3px 0',
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mayoristas */}
          <div>
            <div className="eyebrow mb-4" style={{ color: 'var(--kenda)' }}>Mayoristas</div>
            {[
              { label: 'Portal B2B', href: '/mayoristas/' },
              { label: 'ZOFRI Iquique', href: '/mayoristas/zofri-iquique/' },
              { label: 'Cotización', href: '/mayoristas/cotizacion/' },
              { label: 'Catálogo PDF', href: '/mayoristas/catalogo-pdf/' },
              { label: 'Condiciones', href: '/mayoristas/condiciones/' },
            ].map(item => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  color: 'var(--dim)',
                  textDecoration: 'none',
                  padding: '3px 0',
                }}
              >
                {item.label}
              </Link>
            ))}
            <div style={{ marginTop: '16px' }}>
              <div className="eyebrow mb-3" style={{ color: 'var(--kenda)' }}>Empresa</div>
              {[
                { label: 'Marca Kenda', href: '/marca-kenda/' },
                { label: 'Historia Kenda', href: '/marca-kenda/historia/' },
                { label: 'Blog', href: '/blog/' },
                { label: 'Contacto', href: '/contacto/' },
              ].map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    color: 'var(--dim)',
                    textDecoration: 'none',
                    padding: '3px 0',
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            borderTop: '1px solid var(--line-dark)',
            marginTop: '48px',
            paddingTop: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              color: 'var(--dim)',
            }}
          >
            © {new Date().getFullYear()} Carioca Chile Ltda. · Todos los derechos reservados ·{' '}
            <Link href="/privacidad/" style={{ color: 'var(--dim)', textDecoration: 'none' }}>Privacidad</Link>
            {' · '}
            <Link href="/terminos/" style={{ color: 'var(--dim)', textDecoration: 'none' }}>Términos</Link>
          </div>
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '11px',
              color: 'var(--line-dark)',
              textAlign: 'right',
            }}
          >
            Kenda Tires® es marca registrada de Kenda Rubber Industrial Co., Ltd.
          </div>
        </div>
      </div>
    </footer>
  )
}
