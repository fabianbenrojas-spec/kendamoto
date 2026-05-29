import Link from 'next/link'

const STATS = [
  { value: '16', label: 'Regiones cubiertas' },
  { value: '2-3', label: 'Días hábiles Santiago' },
  { value: '200+', label: 'Referencias en stock' },
  { value: '25+', label: 'Años en ZOFRI' },
]

const ZONAS = [
  { zona: 'Norte Grande', regiones: ['Arica y Parinacota', 'Tarapacá*', 'Antofagasta'], dias: '2-4 días' },
  { zona: 'Norte Chico', regiones: ['Atacama', 'Coquimbo'], dias: '2-3 días' },
  { zona: 'Zona Central', regiones: ['Valparaíso', 'Metropolitana', "O'Higgins", 'Maule'], dias: '2-3 días' },
  { zona: 'Zona Sur', regiones: ['Ñuble', 'Biobío', 'Araucanía', 'Los Ríos', 'Los Lagos'], dias: '3-5 días' },
  { zona: 'Zona Austral', regiones: ['Aysén', 'Magallanes'], dias: '5-7 días' },
]

export function CoberturaChile() {
  return (
    <section style={{ padding: '64px 0', background: 'var(--ink)', color: 'white' }}>
      <div className="wrap">
        <div className="eyebrow mb-3" style={{ color: 'var(--kenda)' }}>Despacho nacional</div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '48px',
            alignItems: 'start',
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'clamp(28px, 4vw, 44px)',
                textTransform: 'uppercase',
                letterSpacing: '-0.01em',
                lineHeight: 1,
                marginBottom: '16px',
              }}
            >
              Cobertura<br />Las 16 Regiones
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '15px',
                color: 'var(--dim)',
                lineHeight: 1.7,
                marginBottom: '24px',
              }}
            >
              Despachamos desde ZOFRI Iquique a todo Chile. Envío gratis en todos los pedidos.
              Stock permanente de más de 200 referencias Kenda.
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                marginBottom: '24px',
              }}
            >
              {STATS.map(s => (
                <div
                  key={s.label}
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    padding: '16px',
                    borderLeft: '3px solid var(--kenda)',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 800,
                      fontSize: '28px',
                      color: 'var(--kenda)',
                      lineHeight: 1,
                    }}
                  >
                    {s.value}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '12px',
                      color: 'var(--dim)',
                      marginTop: '4px',
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/mayoristas/zofri-iquique/"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '13px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--kenda)',
                textDecoration: 'none',
                borderBottom: '1px solid var(--kenda)',
                paddingBottom: '2px',
              }}
            >
              Conocer bodega ZOFRI →
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {ZONAS.map(z => (
              <div
                key={z.zona}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  padding: '14px 20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '16px',
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: '13px',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: 'white',
                      marginBottom: '4px',
                    }}
                  >
                    {z.zona}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '12px',
                      color: 'var(--dim)',
                      lineHeight: 1.5,
                    }}
                  >
                    {z.regiones.join(' · ')}
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '12px',
                    color: 'var(--kenda)',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                  }}
                >
                  {z.dias}
                </div>
              </div>
            ))}
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                color: 'var(--dim)',
                marginTop: '4px',
              }}
            >
              * Tarapacá: retiro en bodega el mismo día con pedido previo
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
