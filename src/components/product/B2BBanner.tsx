import Link from 'next/link'
import { WHATSAPP_NUMBER } from '@/lib/site'

export function B2BBanner() {
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hola Kenda Moto, quiero información sobre precios mayoristas para mi taller/tienda.')}`

  return (
    <section style={{ background: 'var(--ink)', padding: '40px 0' }}>
      <div className="wrap">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '24px',
          }}
        >
          <div>
            <div
              className="eyebrow mb-2"
              style={{ color: 'var(--kenda)' }}
            >
              Precios mayoristas
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'clamp(22px, 3vw, 32px)',
                textTransform: 'uppercase',
                letterSpacing: '-0.01em',
                color: 'white',
                lineHeight: 1,
              }}
            >
              ¿Compras para tu taller o tienda?
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                color: 'var(--dim)',
                marginTop: '6px',
              }}
            >
              Descuentos del 25% al 45% según volumen. Factura electrónica. Cuenta B2B sin costo.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <Link href="/mayoristas/" className="btn-primary">
              Ver planes mayoristas
            </Link>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
