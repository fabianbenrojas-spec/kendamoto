import type { Metadata } from 'next'
import Link from 'next/link'
import { absoluteUrl } from '@/lib/site'
import { buildBreadcrumb } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Términos y Condiciones de Venta — Kenda Moto Chile | Carioca Chile Ltda.',
  description:
    'Términos y condiciones de venta de neumáticos y cámaras Kenda en Chile. Precios, despacho, devoluciones y garantía. Carioca Chile Ltda. — Distribuidor oficial Kenda.',
  alternates: { canonical: absoluteUrl('/terminos/') },
}

export default function TerminosPage() {
  const breadcrumb = buildBreadcrumb([
    { name: 'Inicio', url: absoluteUrl('/') },
    { name: 'Términos y Condiciones', url: absoluteUrl('/terminos/') },
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
  const liStyle: React.CSSProperties = {
    fontFamily: 'var(--font-body)',
    fontSize: '15px',
    color: 'var(--text)',
    lineHeight: 2,
    paddingLeft: '20px',
    marginBottom: '12px',
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <section style={{ background: 'var(--ink)', color: 'white', padding: '48px 0' }}>
        <div className="wrap">
          <div className="eyebrow mb-4" style={{ color: 'var(--kenda)' }}>Legal</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(28px, 5vw, 56px)', textTransform: 'uppercase', letterSpacing: '-0.01em', lineHeight: 0.95 }}>
            Términos y Condiciones
          </h1>
        </div>
      </section>

      <nav style={{ background: 'var(--cream)', borderBottom: '1px solid var(--line)', padding: '12px 0' }}>
        <div className="wrap" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--muted)' }}>
          <Link href="/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Inicio</Link>
          {' › '}
          <span style={{ color: 'var(--text)' }}>Términos y Condiciones</span>
        </div>
      </nav>

      <section style={{ padding: '64px 0', background: 'var(--paper)' }}>
        <div className="wrap" style={{ maxWidth: '800px' }}>
          <div style={{ background: 'var(--cream)', border: '1px solid var(--line)', padding: '16px 20px', fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--muted)', marginBottom: '8px' }}>
            Última actualización: enero 2025. Aplica a compras realizadas a través de kendamoto.cl y canales de venta directa de Carioca Chile Ltda.
          </div>

          <h2 style={h2Style}>1. Identificación del vendedor</h2>
          <p style={pStyle}>
            El vendedor es <strong>Carioca Chile Ltda.</strong>, RUT 78.846.500-9, Sociedad de Responsabilidad Limitada, importador y distribuidor oficial exclusivo de neumáticos y cámaras Kenda en Chile, con domicilio en Zona Franca de Iquique (ZOFRI), Iquique, Región de Tarapacá. Los presentes términos y condiciones regulan las ventas realizadas a través del sitio web kendamoto.cl y de los canales de comunicación directa (WhatsApp, email) administrados por Carioca Chile Ltda.
          </p>

          <h2 style={h2Style}>2. Productos y disponibilidad</h2>
          <p style={pStyle}>
            Todos los productos ofrecidos son neumáticos y cámaras de aire Kenda originales, importados directamente desde Kenda Rubber Industrial Co., Ltd. (Taiwan) a través de la Zona Franca de Iquique.
          </p>
          <p style={pStyle}>
            La disponibilidad de stock se indica en cada ficha de producto. Carioca Chile Ltda. se reserva el derecho de cancelar una orden si el producto no está disponible al momento de procesarla, reembolsando el 100% del monto pagado.
          </p>

          <h2 style={h2Style}>3. Precios</h2>
          <p style={pStyle}>
            Los precios publicados en el sitio están expresados en <strong>pesos chilenos (CLP) e incluyen IVA (19%)</strong>. Carioca Chile Ltda. se reserva el derecho de modificar precios en cualquier momento. El precio válido para una compra es el vigente al momento de confirmar el pedido.
          </p>
          <p style={pStyle}>
            Para clientes mayoristas con Cuenta Pro, los precios aplicables son los establecidos en la lista de precios mayorista vigente, que difiere de los precios públicos del sitio.
          </p>

          <h2 style={h2Style}>4. Formas de pago</h2>
          <p style={pStyle}>Aceptamos los siguientes medios de pago para compras al detalle:</p>
          <ul style={liStyle}>
            <li>Transferencia bancaria (confirmación antes del despacho)</li>
            <li>Depósito bancario</li>
            <li>Los medios de pago disponibles a través de plataformas integradas (si aplica) se informan durante el proceso de compra</li>
          </ul>
          <p style={pStyle}>El pedido se procesa una vez confirmada la recepción del pago.</p>

          <h2 style={h2Style}>5. Despacho y entrega</h2>
          <p style={pStyle}>
            Los despachos se realizan desde nuestra bodega en ZOFRI Iquique hacia todo Chile a través de empresas de transporte de carga. El costo de despacho se informa al momento de confirmar el pedido y depende del volumen, peso y región de destino.
          </p>
          <p style={pStyle}>Tiempos de entrega estimados desde confirmación de pago:</p>
          <ul style={liStyle}>
            <li>Región de Tarapacá (retiro en bodega): mismo día con cita previa</li>
            <li>Región Metropolitana (Santiago): 2–3 días hábiles</li>
            <li>V Región (Valparaíso) y VIII Región (Bío-Bío): 3–4 días hábiles</li>
            <li>Otras regiones: 4–6 días hábiles</li>
            <li>Regiones extremas (Aysén, Magallanes): 5–7 días hábiles</li>
          </ul>
          <p style={pStyle}>
            Los plazos indicados son estimativos y pueden variar por causas externas (fuerza mayor, condiciones climáticas, paros de transportistas). Carioca Chile Ltda. no se hace responsable por retrasos imputables al transportista.
          </p>

          <h2 style={h2Style}>6. Devoluciones y cambios</h2>
          <p style={pStyle}>
            El cliente tiene derecho a devolver el producto dentro de los <strong>7 días corridos</strong> desde la recepción, conforme a la Ley N° 19.496 sobre Protección de los Derechos de los Consumidores, en los siguientes casos:
          </p>
          <ul style={liStyle}>
            <li>Producto con defecto de fabricación</li>
            <li>Error en el producto despachado (medida, modelo o cantidad distinta a lo comprado)</li>
          </ul>
          <p style={pStyle}>
            Para ejercer el derecho de devolución, el cliente debe contactar a Carioca Chile Ltda. a través de <a href="mailto:ventas@kendamoto.cl" style={{ color: 'var(--kenda)' }}>ventas@kendamoto.cl</a> dentro del plazo indicado, adjuntando número de pedido, descripción del problema y fotografías del producto.
          </p>
          <p style={pStyle}>
            No se aceptan devoluciones de productos que hayan sido montados, utilizados o que presenten daños por manejo inadecuado.
          </p>

          <h2 style={h2Style}>7. Garantía</h2>
          <p style={pStyle}>
            Todos los neumáticos y cámaras Kenda tienen garantía de fabricación de 5 años desde la fecha indicada en el código DOT. La garantía cubre defectos de fabricación y es gestionada directamente por Carioca Chile Ltda. como distribuidor oficial.
          </p>
          <p style={pStyle}>
            Ver la <Link href="/marca-kenda/garantia/" style={{ color: 'var(--kenda)' }}>Política de Garantía completa</Link> para detalles sobre coberturas y exclusiones.
          </p>

          <h2 style={h2Style}>8. Limitación de responsabilidad</h2>
          <p style={pStyle}>
            Carioca Chile Ltda. no se hace responsable por daños indirectos, lucro cesante o perjuicios derivados del uso de los productos fuera de sus especificaciones técnicas, de un montaje incorrecto por parte de terceros, o de una conducción en condiciones para las que el neumático no está diseñado.
          </p>

          <h2 style={h2Style}>9. Legislación aplicable</h2>
          <p style={pStyle}>
            Estos términos y condiciones se rigen por la legislación chilena. Para cualquier controversia, las partes se someten a los tribunales ordinarios de justicia de la ciudad de Iquique, Chile, salvo que la normativa de protección al consumidor establezca un fuero diferente a favor del consumidor.
          </p>

          <h2 style={h2Style}>10. Contacto</h2>
          <p style={pStyle}>
            Para consultas sobre estos términos: <a href="mailto:ventas@kendamoto.cl" style={{ color: 'var(--kenda)' }}>ventas@kendamoto.cl</a> o a través de la <Link href="/contacto/" style={{ color: 'var(--kenda)' }}>página de contacto</Link>.
          </p>

          <div style={{ borderTop: '1px solid var(--line)', paddingTop: '32px', marginTop: '48px' }}>
            <Link href="/privacidad/" style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--kenda)' }}>
              Ver Política de Privacidad →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
