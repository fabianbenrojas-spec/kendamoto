const messages = [
  '🚚 Envío gratis a todo Chile',
  'Distribuidor Oficial Kenda · Iquique ZOFRI',
  '12 cuotas sin interés',
  '+200 referencias en stock',
  '🚚 Envío gratis a todo Chile',
  'Distribuidor Oficial Kenda · Iquique ZOFRI',
  '12 cuotas sin interés',
  '+200 referencias en stock',
]

export function Topbar() {
  return (
    <div
      style={{ background: 'var(--kenda)', color: 'white' }}
      className="h-8 overflow-hidden relative"
      aria-hidden="true"
    >
      <div className="marquee-track flex whitespace-nowrap h-full items-center">
        {messages.map((msg, i) => (
          <span
            key={i}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
            className="mx-8"
          >
            {msg}
          </span>
        ))}
      </div>
    </div>
  )
}
