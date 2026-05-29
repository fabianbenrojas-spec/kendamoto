import Link from 'next/link'
import { WHATSAPP_NUMBER } from '@/lib/site'

export function NewsletterBanner() {
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hola Kenda Moto, quiero recibir novedades de stock y ofertas mayoristas.')}`

  return (
    <section style={{ background: 'var(--kenda)', padding: '64px 0' }}>
      <div className="wrap">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '32px',
            alignItems: 'center',
          }}
        >
          <div>
            <div
              className="eyebrow mb-3"
              style={{ color: 'rgba(255,255,255,0.7)' }}
            >
              Novedades y stock
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'clamp(28px, 4vw, 44px)',
                textTransform: 'uppercase',
                letterSpacing: '-0.01em',
                color: 'white',
                lineHeight: 1,
                marginBottom: '12px',
              }}
            >
              Recibe alertas de<br />stock y ofertas
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '15px',
                color: 'rgba(255,255,255,0.8)',
                lineHeight: 1.6,
              }}
            >
              Entérate primero cuando llegue stock de tu medida o cuando activemos
              descuentos mayoristas por temporada.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                background: 'white',
                color: 'var(--kenda)',
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '14px',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                padding: '14px 24px',
                textDecoration: 'none',
                border: 'none',
              }}
            >
              <span style={{ fontSize: '20px' }}>💬</span>
              Escribir por WhatsApp
            </a>
            <Link
              href="/contacto/"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '13px',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.75)',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(255,255,255,0.4)',
                paddingBottom: '2px',
              }}
            >
              O envíanos un email →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
