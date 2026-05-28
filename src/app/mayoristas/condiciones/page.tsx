import type { Metadata } from 'next'
import Link from 'next/link'
import { absoluteUrl } from '@/lib/site'
import { buildBreadcrumb } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Condiciones de Venta Mayorista Kenda Chile — Términos B2B | Kenda Moto',
  description:
    'Condiciones de venta mayorista de Carioca Chile Ltda. para distribuidores y talleres. Mínimos de compra, formas de pago, despacho y política de devoluciones B2B.',
  alternates: { canonical: absoluteUrl('/mayoristas/condiciones/') },
}

export default function CondicionesPage() {
  const breadcrumb = buildBreadcrumb([
    { name: 'Inicio', url: absoluteUrl('/') },
    { name: 'Mayoristas', url: absoluteUrl('/mayoristas/') },
    { name: 'Condiciones', url: absoluteUrl('/mayoristas/condiciones/') },
  ])

  const sectionStyle = { fontFamily: 'var(--font-display)' as const, fontWeight: 800 as const, fontSize: '20px', textTransform: 'uppercase' as const, letterSpacing: '-0.01em', marginBottom: '16px', marginTop: '40px' }
  const bodyStyle = { fontFamily: 'var(--font-body)' as const, fontSize: '15px', color: 'var(--text)' as const, lineHeight: 1.8, marginBottom: '12px' }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <section style={{ background: 'var(--ink)', color: 'white', padding: '64px 0' }}>
        <div className="wrap">
          <div className="eyebrow mb-4" style={{ color: 'var(--kenda)' }}>Mayoristas · Legal</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(32px, 6vw, 64px)', textTransform: 'uppercase', letterSpacing: '-0.01em', lineHeight: 0.95 }}>
            Condiciones de Venta Mayorista
          </h1>
        </div>
      </section>

      <nav style={{ background: 'var(--cream)', borderBottom: '1px solid var(--line)', padding: '12px 0' }}>
        <div className="wrap" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--muted)' }}>
          <Link href="/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Inicio</Link>
          {' › '}
          <Link href="/mayoristas/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Mayoristas</Link>
          {' › '}
          <span style={{ color: 'var(--text)' }}>Condiciones</span>
        </div>
      </nav>

      <section style={{ padding: '64px 0', background: 'var(--paper)' }}>
        <div className="wrap" style={{ maxWidth: '800px' }}>
          <div style={{ background: 'var(--cream)', border: '1px solid var(--line)', padding: '20px 24px', marginBottom: '40px', fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--muted)', lineHeight: 1.6 }}>
            Versión vigente: enero 2025. Aplicable a clientes con cuenta mayorista activa en Carioca Chile Ltda.
          </div>

          <h2 style={sectionStyle}>1. Acceso al portal mayorista</h2>
          <p style={bodyStyle}>El portal mayorista de Kenda Moto Chile es exclusivo para empresas constituidas (personas jurídicas) con RUT activo en el SII y actividad en el rubro de distribución o instalación de neumáticos para motocicletas, bicicletas, scooters o vehículos menores.</p>
          <p style={bodyStyle}>La aprobación de una Cuenta Pro queda a criterio exclusivo de Carioca Chile Ltda. y puede ser rechazada o suspendida sin expresión de causa si se detecta incumplimiento de estas condiciones o comportamiento contrario a los intereses del distribuidor oficial.</p>

          <h2 style={sectionStyle}>2. Mínimos de compra</h2>
          <p style={bodyStyle}>El pedido mínimo para precio mayorista es de <strong>$500.000 CLP neto</strong> por orden de compra. Pedidos inferiores a este monto se facturan a precio de lista público.</p>
          <p style={bodyStyle}>Los descuentos por volumen se calculan sobre el total de la orden de compra y se aplican en la factura. El catálogo de precios mayoristas especifica los rangos vigentes para cada periodo.</p>

          <h2 style={sectionStyle}>3. Formas de pago</h2>
          <p style={bodyStyle}>El pago por defecto para cuentas nuevas es <strong>contado contra factura</strong>: transferencia bancaria antes del despacho o en el momento del retiro en bodega.</p>
          <p style={bodyStyle}>La modalidad de pago a 30 días está disponible para distribuidores con historial de compra mínimo de 6 meses sin incidencias, previo análisis crediticio. La aprobación se notifica por escrito.</p>
          <p style={bodyStyle}>Aceptamos: transferencia bancaria, cheque a fecha (sin descuento en precio), y factura de crédito electrónica (DTE) para clientes aprobados.</p>

          <h2 style={sectionStyle}>4. Despacho y logística</h2>
          <p style={bodyStyle}>Los despachos se realizan desde nuestra bodega en la <strong>Zona Franca de Iquique (ZOFRI)</strong> hacia todo Chile. El costo de despacho se cotiza por pedido según volumen, peso y región de destino.</p>
          <p style={bodyStyle}>Los tiempos de entrega referencia son: Santiago 2-3 días hábiles, V Región 3-4 días, Bío-Bío 4-5 días, regiones extremas 5-7 días hábiles. Estos plazos son informativos y pueden variar por causas externas (fuerza mayor, clima, huelgas de transportistas).</p>
          <p style={bodyStyle}>El retiro en bodega está disponible con cita previa en días hábiles. Clientes con retiro en bodega no pagan flete.</p>

          <h2 style={sectionStyle}>5. Devoluciones y cambios</h2>
          <p style={bodyStyle}>Se aceptan devoluciones dentro de los <strong>7 días corridos</strong> desde la recepción del pedido, únicamente por error en el despacho (medida, modelo o cantidad incorrecta atribuible a Carioca Chile Ltda.) o por defecto de fabricación verificable.</p>
          <p style={bodyStyle}>No se aceptan devoluciones por cambio de decisión de compra, error en el pedido del cliente, o productos que hayan sido montados o presentado signos de uso.</p>
          <p style={bodyStyle}>Para gestionar una devolución: enviar correo a ventas@kendamoto.cl con número de factura, cantidad a devolver y motivo. El equipo responde en 48 horas hábiles con instrucciones de envío.</p>

          <h2 style={sectionStyle}>6. Garantía de productos</h2>
          <p style={bodyStyle}>Todos los neumáticos y cámaras Kenda son originales con código DOT verificable. La garantía de fabricación es de 5 años desde la fecha de fabricación indicada en el código DOT.</p>
          <p style={bodyStyle}>El proceso de garantía se gestiona directamente con Carioca Chile Ltda. como representante de Kenda para Chile. Ver la <Link href="/marca-kenda/garantia/" style={{ color: 'var(--kenda)' }}>política de garantía completa</Link>.</p>

          <h2 style={sectionStyle}>7. Exclusividad territorial</h2>
          <p style={bodyStyle}>Carioca Chile Ltda. es el único importador y distribuidor oficial autorizado por Kenda Rubber Industrial Co., Ltd. para Chile. Los distribuidores que revenden con Cuenta Pro lo hacen dentro del territorio nacional chileno únicamente.</p>
          <p style={bodyStyle}>No está permitida la exportación de productos adquiridos en el portal mayorista a otros países sin autorización escrita de Carioca Chile Ltda.</p>

          <h2 style={sectionStyle}>8. Modificaciones</h2>
          <p style={bodyStyle}>Carioca Chile Ltda. se reserva el derecho de modificar estas condiciones en cualquier momento. Las modificaciones se notifican a los distribuidores activos con un mínimo de 15 días de anticipación antes de su entrada en vigencia.</p>
          <p style={bodyStyle}>Para consultas sobre estas condiciones: <a href="mailto:mayoristas@kendamoto.cl" style={{ color: 'var(--kenda)' }}>mayoristas@kendamoto.cl</a></p>

          <div style={{ borderTop: '1px solid var(--line)', paddingTop: '32px', marginTop: '48px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/mayoristas/" className="btn-primary">Portal Mayoristas</Link>
            <Link href="/mayoristas/registro-cuenta-pro/" className="btn-outline">Solicitar Cuenta Pro</Link>
          </div>
        </div>
      </section>
    </>
  )
}
