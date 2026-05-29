export function HubSeoContent() {
  return (
    <section style={{ padding: '64px 0', background: 'var(--cream)' }}>
      <div className="wrap" style={{ maxWidth: '800px' }}>
        <div className="eyebrow mb-4">Guía de compra</div>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(24px, 4vw, 40px)',
            textTransform: 'uppercase',
            letterSpacing: '-0.01em',
            lineHeight: 1,
            marginBottom: '24px',
          }}
        >
          Cómo elegir el neumático Kenda correcto para tu moto
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '40px',
          }}
        >
          <div>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '15px',
                color: 'var(--muted)',
                lineHeight: 1.8,
                marginBottom: '20px',
              }}
            >
              La elección correcta del neumático depende de tres factores: el tipo de terreno donde
              circulas, el modelo de tu moto y la medida indicada por el fabricante. Kenda ofrece
              una gama especializada para cada uso: el <strong>K784 Big Block</strong> para trail
              adventure, el <strong>K778/K779 Knarly</strong> para enduro técnico, el{' '}
              <strong>K785 Millville</strong> para motocross y el <strong>K761 Dual Sport</strong>{' '}
              para uso mixto ciudad-campo.
            </p>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '15px',
                color: 'var(--muted)',
                lineHeight: 1.8,
              }}
            >
              Todos los modelos están disponibles en stock permanente en nuestra bodega de la Zona
              Franca de Iquique (ZOFRI). Al comprar a Carioca Chile Ltda. — importador oficial Kenda
              en Chile desde el año 2000 — recibes neumáticos 100% originales con documentación de
              importación, factura electrónica y envío gratis a las 16 regiones del país.
            </p>
          </div>

          <div>
            {[
              {
                label: '¿Usas más ripio y tierra? → Trail Adventure o Enduro',
                text: 'El K784 Big Block (trail) y el K778 Knarly (enduro) ofrecen tracción superior en superficies no pavimentadas. El K784 es tubeless para llantas de aleación; el K778 requiere cámara de aire.',
              },
              {
                label: '¿Principalmente asfalto con salidas ocasionales? → Dual Sport',
                text: 'El K761 Dual Sport es el equilibrio perfecto: bajo ruido en ciudad, grip suficiente en ripio compacto. Ideal para Honda CRF 300L, Kawasaki KLX 300 y Royal Enfield Himalayan.',
              },
              {
                label: '¿Competición MX o enduro federado? → Millville o Knarly',
                text: 'El K785 Millville II para motocross suelo blando/intermedio; el K778/K779 Knarly para enduro terreno duro. Ambos homologados FIM para uso en competición.',
              },
            ].map(item => (
              <div key={item.label} style={{ marginBottom: '20px' }}>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: '14px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    color: 'var(--text)',
                    marginBottom: '8px',
                  }}
                >
                  {item.label}
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    color: 'var(--muted)',
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
