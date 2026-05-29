import Link from 'next/link'

const PASOS = [
  {
    num: '01',
    title: 'Registro de cuenta',
    desc: 'Completa el formulario B2B con tu RUT empresa y tipo de actividad. Validamos tu cuenta en 24 horas hábiles.',
    icon: '📋',
  },
  {
    num: '02',
    title: 'Accede al catálogo',
    desc: 'Con tu cuenta activa accedes a precios mayoristas, stock en tiempo real y fichas técnicas completas de todas las referencias Kenda.',
    icon: '📦',
  },
  {
    num: '03',
    title: 'Cotiza y confirma',
    desc: 'Usa la calculadora de pedidos B2B. El descuento mayorista se aplica automáticamente según el volumen de unidades.',
    icon: '🧮',
  },
  {
    num: '04',
    title: 'Despacho directo',
    desc: 'Despachamos desde ZOFRI Iquique. Pedidos ≥ 20 unidades con flete bonificado. Factura electrónica incluida.',
    icon: '🚚',
  },
]

export function ProcesoB2B() {
  return (
    <section style={{ padding: '80px 0', background: 'var(--cream)' }}>
      <div className="wrap">
        <div className="eyebrow mb-3">Cómo funciona</div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '40px',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(28px, 4vw, 44px)',
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
              lineHeight: 1,
            }}
          >
            Proceso B2B<br />en 4 pasos
          </h2>
          <Link href="#cotizador" className="btn-outline" style={{ flexShrink: 0 }}>
            Ir a la calculadora
          </Link>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1px',
            background: 'var(--line)',
          }}
        >
          {PASOS.map((paso, i) => (
            <div
              key={paso.num}
              style={{
                background: 'var(--paper)',
                padding: '32px 28px',
                position: 'relative',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '48px',
                  color: 'var(--line)',
                  lineHeight: 1,
                  marginBottom: '12px',
                  letterSpacing: '-0.02em',
                }}
              >
                {paso.num}
              </div>
              <div style={{ fontSize: '28px', marginBottom: '12px' }}>{paso.icon}</div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '18px',
                  textTransform: 'uppercase',
                  letterSpacing: '-0.01em',
                  color: 'var(--text)',
                  marginBottom: '10px',
                }}
              >
                {paso.title}
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  color: 'var(--muted)',
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {paso.desc}
              </p>
              {i < PASOS.length - 1 && (
                <div
                  style={{
                    position: 'absolute',
                    right: '-12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '24px',
                    height: '24px',
                    background: 'var(--kenda)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1,
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: '12px',
                    color: 'white',
                  }}
                >
                  →
                </div>
              )}
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: '32px',
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <Link href="/mayoristas/registro-cuenta-pro/" className="btn-primary">
            Registrar cuenta B2B
          </Link>
          <Link href="/mayoristas/" className="btn-outline">
            Ver planes mayoristas
          </Link>
        </div>
      </div>
    </section>
  )
}
