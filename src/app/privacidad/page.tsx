import type { Metadata } from 'next'
import Link from 'next/link'
import { absoluteUrl } from '@/lib/site'
import { buildBreadcrumb } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Política de Privacidad — Kenda Moto Chile | Carioca Chile Ltda.',
  description:
    'Política de privacidad y tratamiento de datos personales de Kenda Moto Chile (Carioca Chile Ltda.) conforme a la Ley 19.628 sobre Protección de la Vida Privada.',
  alternates: { canonical: absoluteUrl('/privacidad/') },
}

export default function PrivacidadPage() {
  const breadcrumb = buildBreadcrumb([
    { name: 'Inicio', url: absoluteUrl('/') },
    { name: 'Política de Privacidad', url: absoluteUrl('/privacidad/') },
  ])

  const h2Style: React.CSSProperties = {
    fontFamily: 'var(--font-display)',
    fontWeight: 800,
    fontSize: '20px',
    textTransform: 'uppercase',
    letterSpacing: '-0.01em',
    marginBottom: '14px',
    marginTop: '40px',
  }
  const pStyle: React.CSSProperties = {
    fontFamily: 'var(--font-body)',
    fontSize: '15px',
    color: 'var(--text)',
    lineHeight: 1.8,
    marginBottom: '12px',
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <section style={{ background: 'var(--ink)', color: 'white', padding: '48px 0' }}>
        <div className="wrap">
          <div className="eyebrow mb-4" style={{ color: 'var(--kenda)' }}>Legal</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(28px, 5vw, 56px)', textTransform: 'uppercase', letterSpacing: '-0.01em', lineHeight: 0.95 }}>
            Política de Privacidad
          </h1>
        </div>
      </section>

      <nav style={{ background: 'var(--cream)', borderBottom: '1px solid var(--line)', padding: '12px 0' }}>
        <div className="wrap" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--muted)' }}>
          <Link href="/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Inicio</Link>
          {' › '}
          <span style={{ color: 'var(--text)' }}>Política de Privacidad</span>
        </div>
      </nav>

      <section style={{ padding: '64px 0', background: 'var(--paper)' }}>
        <div className="wrap" style={{ maxWidth: '800px' }}>
          <div style={{ background: 'var(--cream)', border: '1px solid var(--line)', padding: '16px 20px', fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--muted)', marginBottom: '8px' }}>
            Última actualización: enero 2025. Responsable: Carioca Chile Ltda. — ventas@kendamoto.cl
          </div>

          <h2 style={h2Style}>1. Responsable del tratamiento</h2>
          <p style={pStyle}>
            El responsable del tratamiento de los datos personales recabados a través del sitio web <strong>kendamoto.cl</strong> es <strong>Carioca Chile Ltda.</strong>, RUT 78.846.500-9, con domicilio en Zona Franca de Iquique (ZOFRI), Iquique, Región de Tarapacá, Chile.
          </p>
          <p style={pStyle}>
            Para consultas sobre privacidad y tratamiento de datos, contáctenos en: <a href="mailto:ventas@kendamoto.cl" style={{ color: 'var(--kenda)' }}>ventas@kendamoto.cl</a>
          </p>

          <h2 style={h2Style}>2. Base legal</h2>
          <p style={pStyle}>
            El tratamiento de datos personales se rige por la <strong>Ley N° 19.628 sobre Protección de la Vida Privada</strong> de la República de Chile y sus modificaciones posteriores. Tratamos sus datos únicamente cuando existe una base legal para ello: consentimiento del titular, ejecución de un contrato o relación comercial, o interés legítimo en la comunicación comercial relacionada con nuestros productos.
          </p>

          <h2 style={h2Style}>3. Datos que recopilamos</h2>
          <p style={pStyle}>Recopilamos datos personales en los siguientes casos:</p>
          <ul style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--text)', lineHeight: 2, paddingLeft: '20px', marginBottom: '12px' }}>
            <li><strong>Formulario de contacto B2B:</strong> nombre, empresa, RUT, email y teléfono, para responder solicitudes de cotización o registro de cuenta mayorista.</li>
            <li><strong>Consultas por WhatsApp o email:</strong> el contenido de los mensajes enviados a través de estos canales.</li>
            <li><strong>Datos de navegación:</strong> dirección IP, tipo de navegador, páginas visitadas y duración de la visita, recopilados automáticamente a través de cookies de análisis (si están activas).</li>
          </ul>
          <p style={pStyle}>No recopilamos datos de tarjetas de crédito ni información de pago directamente en este sitio.</p>

          <h2 style={h2Style}>4. Finalidad del tratamiento</h2>
          <p style={pStyle}>Los datos personales se utilizan exclusivamente para:</p>
          <ul style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--text)', lineHeight: 2, paddingLeft: '20px', marginBottom: '12px' }}>
            <li>Responder consultas y solicitudes de cotización enviadas a través del sitio.</li>
            <li>Gestionar relaciones comerciales con distribuidores y clientes B2B.</li>
            <li>Enviar información comercial sobre productos Kenda cuando el titular ha manifestado interés explícito.</li>
            <li>Analizar el uso del sitio para mejorar la experiencia del usuario (datos de navegación agregados).</li>
          </ul>
          <p style={pStyle}>No vendemos, cedemos ni compartimos datos personales con terceros, salvo obligación legal.</p>

          <h2 style={h2Style}>5. Cookies</h2>
          <p style={pStyle}>
            Este sitio puede utilizar cookies técnicas necesarias para su funcionamiento (sesión, preferencias) y cookies de análisis anónimas para medir el tráfico. No utilizamos cookies de seguimiento publicitario de terceros.
          </p>
          <p style={pStyle}>
            Puede configurar su navegador para rechazar o eliminar cookies en cualquier momento, aunque esto puede afectar la funcionalidad del sitio.
          </p>

          <h2 style={h2Style}>6. Conservación de los datos</h2>
          <p style={pStyle}>
            Los datos de contacto se conservan durante el tiempo necesario para atender la solicitud y, en caso de relación comercial activa, durante la vigencia de dicha relación más el período de prescripción legal aplicable (5 años en materia comercial).
          </p>

          <h2 style={h2Style}>7. Derechos del titular</h2>
          <p style={pStyle}>Conforme a la Ley 19.628, usted tiene derecho a:</p>
          <ul style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--text)', lineHeight: 2, paddingLeft: '20px', marginBottom: '12px' }}>
            <li><strong>Acceso:</strong> solicitar qué datos personales suyos conservamos.</li>
            <li><strong>Rectificación:</strong> corregir datos inexactos o incompletos.</li>
            <li><strong>Cancelación:</strong> solicitar la eliminación de sus datos cuando ya no sean necesarios.</li>
            <li><strong>Oposición:</strong> oponerse al tratamiento de sus datos para fines de comunicación comercial.</li>
          </ul>
          <p style={pStyle}>
            Para ejercer cualquiera de estos derechos, envíe un correo a <a href="mailto:ventas@kendamoto.cl" style={{ color: 'var(--kenda)' }}>ventas@kendamoto.cl</a> identificándose como titular. Responderemos en un plazo máximo de 10 días hábiles.
          </p>

          <h2 style={h2Style}>8. Modificaciones</h2>
          <p style={pStyle}>
            Carioca Chile Ltda. se reserva el derecho de actualizar esta política en cualquier momento. La versión vigente siempre estará disponible en esta página con la fecha de última actualización indicada en el encabezado.
          </p>

          <div style={{ borderTop: '1px solid var(--line)', paddingTop: '32px', marginTop: '48px' }}>
            <Link href="/terminos/" style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--kenda)' }}>
              Ver Términos y Condiciones →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
