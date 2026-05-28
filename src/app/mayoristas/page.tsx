import type { Metadata } from 'next'
import Link from 'next/link'
import { absoluteUrl } from '@/lib/site'
import { buildFAQ, buildBreadcrumb, buildLocalBusinessSchema } from '@/lib/schema'
import { B2BForm } from '@/components/mayoristas/B2BForm'
import { QuoteCalculator } from '@/components/mayoristas/QuoteCalculator'
import { FAQAccordion } from '@/components/ui/FAQAccordion'

export const metadata: Metadata = {
  title: 'Mayorista Neumáticos Moto Chile — Distribuidor Kenda ZOFRI Iquique | B2B',
  description:
    'Precios mayoristas Kenda para talleres, tiendas y distribuidores en Chile. Cuenta B2B con factura electrónica. Importación directa ZOFRI Iquique.',
  alternates: { canonical: absoluteUrl('/mayoristas/') },
}

const faqB2B = [
  {
    question: '¿Cuál es el pedido mínimo para precios mayoristas?',
    answer:
      'El pedido mínimo para acceder a precios mayoristas es de 6 unidades por referencia. Para condiciones de distribuidor o cuenta premium, consulta nuestros planes en esta página.',
  },
  {
    question: '¿Emiten factura electrónica?',
    answer:
      'Sí, Carioca Chile Ltda. emite factura electrónica con IVA para todos los pedidos mayoristas. Somos contribuyentes regulares ante el SII.',
  },
  {
    question: '¿Cómo accedo a la lista de precios mayoristas?',
    answer:
      'Completa el formulario de registro de cuenta B2B. En 24-48 horas hábiles te enviamos el catálogo completo con precios mayoristas y condiciones de pago.',
  },
  {
    question: '¿Hacen despacho a todo Chile?',
    answer:
      'Sí, despachamos a las 16 regiones de Chile. Los pedidos mayoristas se despachan en 24-72 horas hábiles desde nuestra bodega en ZOFRI Iquique.',
  },
  {
    question: '¿Qué métodos de pago aceptan para mayoristas?',
    answer:
      'Transferencia bancaria, depósito directo y tarjeta de crédito con cuotas. Para clientes con cuenta vigente, ofrecemos crédito a 30 días previa evaluación.',
  },
]

const trustItems = [
  { icon: '📦', title: '+200 referencias', text: 'Stock permanente en bodega ZOFRI' },
  { icon: '⚡', title: 'Despacho 24-72h', text: 'A todo Chile desde Iquique' },
  { icon: '🧾', title: 'Factura electrónica', text: 'Contribuyente SII Chile' },
  { icon: '🤝', title: 'Desde 1996', text: 'Carioca Chile distribuyendo Kenda' },
]

const planes = [
  {
    name: 'Básico',
    min: '≥6 unidades / pedido',
    desc: 'Para talleres y tiendas que compran ocasionalmente',
    benefits: [
      'Precios mayoristas en todas las referencias',
      'Factura electrónica',
      'Despacho 24-72h',
      'Soporte por WhatsApp',
    ],
    cta: 'Empezar',
    featured: false,
  },
  {
    name: 'Distribuidor',
    min: '≥12 unidades / mes',
    desc: 'Para talleres y tiendas con compra recurrente',
    benefits: [
      'Todo lo del plan Básico',
      'Descuento adicional 5-8%',
      'Crédito a 30 días (previa evaluación)',
      'Acceso prioritario a nuevas referencias',
      'Ejecutivo de cuenta dedicado',
    ],
    cta: 'Solicitar',
    featured: true,
  },
  {
    name: 'Premium',
    min: '≥50 unidades / mes',
    desc: 'Para distribuidores mayoristas regionales',
    benefits: [
      'Todo lo del plan Distribuidor',
      'Descuento adicional 10-15%',
      'Crédito a 60 días',
      'Reserva de stock garantizada',
      'Exclusividad regional (consultar)',
      'Visita comercial presencial',
    ],
    cta: 'Contactar',
    featured: false,
  },
]

export default function MayoristasPage() {
  const breadcrumb = buildBreadcrumb([
    { name: 'Inicio', url: absoluteUrl('/') },
    { name: 'Mayoristas B2B', url: absoluteUrl('/mayoristas/') },
  ])
  const faqSchema = buildFAQ(faqB2B)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero B2B */}
      <section style={{ background: 'var(--ink)', color: 'white', padding: '64px 0' }}>
        <div className="wrap">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '48px',
              alignItems: 'start',
            }}
          >
            <div>
              <div className="eyebrow mb-4" style={{ color: 'var(--kenda)' }}>
                Portal Mayoristas · B2B
              </div>
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: 'clamp(36px, 6vw, 72px)',
                  textTransform: 'uppercase',
                  letterSpacing: '-0.01em',
                  lineHeight: 0.95,
                  marginBottom: '16px',
                }}
              >
                Mayorista Neumáticos Moto Chile — Distribuidor Kenda ZOFRI Iquique
              </h1>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '16px',
                  color: 'var(--dim)',
                  lineHeight: 1.6,
                  marginBottom: '24px',
                  maxWidth: '500px',
                }}
              >
                Precios mayoristas directos desde ZOFRI Iquique. Catálogo completo Kenda, despacho
                en 24-72h a todo Chile, factura electrónica y cuenta B2B personalizada.
              </p>
              <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                {[
                  { value: '+200', label: 'Referencias' },
                  { value: '24-72h', label: 'Despacho' },
                  { value: '16', label: 'Regiones' },
                  { value: '25+', label: 'Años distribución' },
                ].map(s => (
                  <div key={s.label}>
                    <div
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 800,
                        fontSize: '28px',
                        color: 'var(--kenda)',
                      }}
                    >
                      {s.value}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '11px',
                        color: 'var(--dim)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                      }}
                    >
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* B2B Form */}
            <B2BForm />
          </div>
        </div>
      </section>

      {/* Trust Strip B2B */}
      <div style={{ background: 'var(--ink-2)' }}>
        <div
          className="wrap"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          }}
        >
          {trustItems.map((item, i) => (
            <div
              key={i}
              style={{
                padding: '24px 20px',
                borderRight: i < trustItems.length - 1 ? '1px solid var(--line-dark)' : 'none',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px',
                color: 'white',
              }}
            >
              <span style={{ fontSize: '24px' }}>{item.icon}</span>
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
                  }}
                >
                  {item.text}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ZOFRI Ventaja */}
      <section style={{ padding: '80px 0', background: 'var(--paper)' }}>
        <div className="wrap">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '64px',
              alignItems: 'center',
            }}
          >
            <div>
              <div className="eyebrow mb-4">Ventaja ZOFRI</div>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: 'clamp(28px, 4vw, 48px)',
                  textTransform: 'uppercase',
                  letterSpacing: '-0.01em',
                  lineHeight: 1,
                  marginBottom: '20px',
                }}
              >
                Carioca Chile Ltda. — Distribuidor oficial Kenda desde 1996
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '15px',
                  color: 'var(--muted)',
                  lineHeight: 1.7,
                }}
              >
                Somos el importador oficial de Kenda Tires® en Chile. Operamos desde la Zona
                Franca de Iquique (ZOFRI), lo que nos permite ofrecer precios de importación
                directa, stock permanente y tiempos de entrega imbatibles a todo Chile.
              </p>
              <Link
                href="/mayoristas/zofri-iquique/"
                className="btn-outline"
                style={{ marginTop: '24px', display: 'inline-flex' }}
              >
                Ver más sobre ZOFRI →
              </Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                {
                  icon: '🏭',
                  title: 'Importación directa',
                  text: 'Sin intermediarios — de Kenda Taiwan a tu bodega',
                },
                {
                  icon: '💰',
                  title: 'Precios ZOFRI',
                  text: 'Beneficios de la Zona Franca se trasladan al distribuidor',
                },
                {
                  icon: '📊',
                  title: 'Stock garantizado',
                  text: '+200 referencias disponibles en todo momento',
                },
                {
                  icon: '🤝',
                  title: 'Relación directa',
                  text: 'Ejecutivo de cuenta, no call center',
                },
                {
                  icon: '📄',
                  title: 'Documentación completa',
                  text: 'Factura electrónica, guía de despacho y certificados',
                },
              ].map((v, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    gap: '16px',
                    alignItems: 'flex-start',
                    padding: '16px',
                    background: 'var(--cream)',
                    border: '1px solid var(--line)',
                  }}
                >
                  <span style={{ fontSize: '20px', flexShrink: 0 }}>{v.icon}</span>
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        fontSize: '14px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {v.title}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '13px',
                        color: 'var(--muted)',
                      }}
                    >
                      {v.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Planes */}
      <section style={{ padding: '80px 0', background: 'var(--cream)' }}>
        <div className="wrap">
          <div className="eyebrow mb-4" style={{ textAlign: 'center' }}>
            Planes Mayoristas
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(28px, 4vw, 48px)',
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
              lineHeight: 1,
              marginBottom: '48px',
              textAlign: 'center',
            }}
          >
            Elige tu plan B2B
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '16px',
              alignItems: 'start',
            }}
          >
            {planes.map(plan => (
              <div
                key={plan.name}
                style={{
                  background: plan.featured ? 'var(--ink)' : 'white',
                  color: plan.featured ? 'white' : 'var(--text)',
                  border: plan.featured ? '2px solid var(--kenda)' : '1px solid var(--line)',
                  padding: '32px',
                }}
              >
                {plan.featured && (
                  <div
                    style={{
                      background: 'var(--kenda)',
                      color: 'white',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: '11px',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      padding: '4px 10px',
                      display: 'inline-block',
                      marginBottom: '12px',
                    }}
                  >
                    Más popular
                  </div>
                )}
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: '28px',
                    textTransform: 'uppercase',
                    letterSpacing: '-0.01em',
                    marginBottom: '4px',
                  }}
                >
                  {plan.name}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '13px',
                    color: 'var(--kenda)',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    marginBottom: '8px',
                  }}
                >
                  {plan.min}
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    color: plan.featured ? 'var(--dim)' : 'var(--muted)',
                    marginBottom: '24px',
                  }}
                >
                  {plan.desc}
                </p>
                <ul style={{ padding: 0, margin: '0 0 24px', listStyle: 'none' }}>
                  {plan.benefits.map((b, i) => (
                    <li
                      key={i}
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '13px',
                        color: plan.featured ? 'rgba(255,255,255,0.85)' : 'var(--text)',
                        padding: '8px 0',
                        borderBottom: '1px solid',
                        borderColor: plan.featured ? 'var(--line-dark)' : 'var(--line)',
                        display: 'flex',
                        gap: '8px',
                      }}
                    >
                      <span style={{ color: 'var(--green)', flexShrink: 0 }}>✓</span>
                      {b}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/mayoristas/registro-cuenta-pro/"
                  className={plan.featured ? 'btn-primary' : 'btn-outline'}
                  style={{ display: 'block', textAlign: 'center' }}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Calculator */}
      <section style={{ padding: '80px 0', background: 'var(--paper)' }}>
        <div className="wrap" style={{ maxWidth: '800px' }}>
          <QuoteCalculator />
        </div>
      </section>

      {/* FAQ B2B */}
      <section style={{ padding: '64px 0', background: 'var(--cream)' }}>
        <div className="wrap" style={{ maxWidth: '800px' }}>
          <div className="eyebrow mb-4">FAQ Mayoristas</div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(24px, 4vw, 40px)',
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
              lineHeight: 1,
              marginBottom: '32px',
            }}
          >
            Preguntas frecuentes B2B
          </h2>
          <FAQAccordion items={faqB2B} />

          <div
            style={{
              marginTop: '40px',
              background: 'var(--ink)',
              padding: '32px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '18px',
                  color: 'white',
                  textTransform: 'uppercase',
                }}
              >
                ¿Tienes más preguntas?
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--dim)' }}>
                Escríbenos directamente por WhatsApp
              </div>
            </div>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP?.replace(/[^0-9]/g, '') ?? '56900000000'}?text=${encodeURIComponent('Hola, soy distribuidor y me interesa conocer las condiciones B2B de Kenda Moto Chile.')}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'var(--whatsapp)',
                color: 'white',
                padding: '12px 24px',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '14px',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                textDecoration: 'none',
              }}
            >
              WhatsApp B2B
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
