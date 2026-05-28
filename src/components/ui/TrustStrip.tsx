const items = [
  {
    icon: '🚚',
    title: 'Envío Gratis',
    text: 'A todo Chile sin mínimo de compra',
  },
  {
    icon: '✓',
    title: 'Distribuidor Oficial',
    text: 'Kenda Tires® — Carioca Chile Ltda.',
  },
  {
    icon: '💳',
    title: '12 Cuotas',
    text: 'Sin interés con tarjetas seleccionadas',
  },
  {
    icon: '📦',
    title: 'Stock ZOFRI',
    text: '+200 referencias en bodega Iquique',
  },
]

export function TrustStrip() {
  return (
    <div style={{ background: 'var(--ink-2)', color: 'white' }}>
      <div
        className="wrap"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '0',
        }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            style={{
              padding: '24px 20px',
              borderRight: i < items.length - 1 ? '1px solid var(--line-dark)' : 'none',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '14px',
            }}
          >
            <span style={{ fontSize: '24px', flexShrink: 0 }}>{item.icon}</span>
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '15px',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  marginBottom: '4px',
                }}
              >
                {item.title}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  color: 'var(--dim)',
                  lineHeight: 1.4,
                }}
              >
                {item.text}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
