'use client'

import { useState } from 'react'
import { formatPriceCLP } from '@/lib/products'
import type { Product, Size } from '@/lib/types'

interface ProductTabsProps {
  product: Product
  selectedSize: Size
  allSizes: Size[]
  onSizeSelect: (size: Size) => void
}

export function ProductTabs({ product, selectedSize, allSizes, onSizeSelect }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<'descripcion' | 'specs' | 'medidas' | 'garantia'>('descripcion')

  const tabs = [
    { id: 'descripcion' as const, label: 'Descripción' },
    { id: 'specs' as const,       label: 'Especificaciones' },
    { id: 'medidas' as const,     label: 'Tabla Medidas' },
    { id: 'garantia' as const,    label: 'Garantía' },
  ]

  const tabStyle = (id: string): React.CSSProperties => ({
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    fontSize: '12px',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    padding: '12px 20px',
    background: activeTab === id ? 'var(--ink)' : 'transparent',
    color: activeTab === id ? 'white' : 'var(--muted)',
    border: 'none',
    borderBottom: activeTab === id ? '2px solid var(--kenda)' : '2px solid transparent',
    cursor: 'pointer',
    transition: 'all 0.15s',
    whiteSpace: 'nowrap' as const,
  })

  return (
    <section style={{ background: 'var(--paper)' }}>
      {/* Tab nav */}
      <div style={{ borderBottom: '1px solid var(--line)', overflowX: 'auto' }}>
        <div className="wrap" style={{ display: 'flex', gap: 0, padding: '0 48px' }}>
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={tabStyle(tab.id)}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="wrap" style={{ padding: '48px 48px' }}>

        {/* DESCRIPCIÓN */}
        {activeTab === 'descripcion' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px' }}>
            <div>
              <div className="eyebrow mb-4">Descripción</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '24px', textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: '16px' }}>
                {product.name} {selectedSize.medida}
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--muted)', lineHeight: 1.7 }}>
                {selectedSize.seoText || product.description}
              </p>
            </div>
            <div>
              <div className="eyebrow mb-4">Características</div>
              {product.features && product.features.length > 0 && (
                <ul style={{ padding: 0, margin: '0 0 24px', listStyle: 'none' }}>
                  {product.features.map((feature, i) => (
                    <li
                      key={i}
                      style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text)', padding: '12px 0', borderBottom: '1px solid var(--line)', display: 'flex', gap: '12px', alignItems: 'flex-start' }}
                    >
                      <span style={{ color: 'var(--kenda)', fontWeight: 700, flexShrink: 0 }}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              )}
              {selectedSize.compatMotos && selectedSize.compatMotos.length > 0 && (
                <div>
                  <div className="eyebrow mb-3">Motos compatibles</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {selectedSize.compatMotos.map(moto => (
                      <span
                        key={moto}
                        style={{ fontFamily: 'var(--font-body)', fontSize: '12px', background: 'var(--cream)', border: '1px solid var(--line)', padding: '4px 10px', color: 'var(--text)' }}
                      >
                        {moto}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ESPECIFICACIONES */}
        {activeTab === 'specs' && (
          <div style={{ maxWidth: '600px' }}>
            <div className="eyebrow mb-4">Especificaciones técnicas</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '24px', textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: '24px' }}>
              {selectedSize.medida}
            </h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                {[
                  { label: 'Referencia',           value: `Kenda ${product.ref}` },
                  { label: 'Modelo',               value: product.name },
                  { label: 'Medida',               value: selectedSize.medida },
                  { label: 'Posición',             value: selectedSize.position.charAt(0).toUpperCase() + selectedSize.position.slice(1) },
                  { label: 'Tipo',                 value: selectedSize.type.join(' / ') },
                  { label: 'Índice de velocidad',  value: selectedSize.speedIndex },
                  { label: 'Índice de carga',      value: selectedSize.loadIndex },
                  { label: 'Stock',                value: selectedSize.stock === 'in_stock' ? 'En stock' : selectedSize.stock === 'low_stock' ? 'Stock limitado' : 'Sin stock' },
                  { label: 'Fabricante',           value: 'Kenda Rubber Industrial Co., Ltd.' },
                  { label: 'País de origen',       value: 'Taiwán' },
                  { label: 'Importador Chile',     value: 'Carioca Chile Ltda. (RUT 78.846.500-9)' },
                  { label: 'Bodega',               value: 'ZOFRI Iquique' },
                ].map((row, i) => (
                  <tr key={row.label} style={{ background: i % 2 === 0 ? 'var(--cream)' : 'white', borderBottom: '1px solid var(--line)' }}>
                    <td style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '12px', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--muted)', padding: '12px 16px', width: '40%' }}>
                      {row.label}
                    </td>
                    <td style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text)', padding: '12px 16px' }}>
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TABLA MEDIDAS */}
        {activeTab === 'medidas' && (
          <div>
            <div className="eyebrow mb-4">Todas las medidas disponibles</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '24px', textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: '24px' }}>
              {product.name} — Medidas
            </h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'var(--ink)', color: 'white' }}>
                    {['Medida', 'Posición', 'Tipo', 'Vel.', 'Carga', 'Precio', 'Stock', ''].map(h => (
                      <th key={h} style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '12px 16px', textAlign: 'left' }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {allSizes.map((size, idx) => {
                    const isSelected = size.medida === selectedSize.medida
                    return (
                      <tr
                        key={size.medida}
                        style={{
                          background: isSelected ? 'var(--kenda-tint)' : (idx % 2 === 0 ? 'white' : 'var(--paper)'),
                          borderBottom: '1px solid var(--line)',
                          transition: 'background 0.1s',
                        }}
                        onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = 'var(--cream)' }}
                        onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = idx % 2 === 0 ? 'white' : 'var(--paper)' }}
                      >
                        <td style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px', padding: '12px 16px', color: isSelected ? 'var(--kenda)' : 'var(--text)' }}>
                          {size.medida}
                        </td>
                        <td style={{ fontFamily: 'var(--font-body)', fontSize: '13px', padding: '12px 16px', textTransform: 'capitalize', color: 'var(--muted)' }}>
                          {size.position}
                        </td>
                        <td style={{ fontFamily: 'var(--font-body)', fontSize: '13px', padding: '12px 16px', color: 'var(--muted)' }}>
                          {size.type.join('/')}
                        </td>
                        <td style={{ fontFamily: 'var(--font-body)', fontSize: '13px', padding: '12px 16px', color: 'var(--muted)' }}>
                          {size.speedIndex}
                        </td>
                        <td style={{ fontFamily: 'var(--font-body)', fontSize: '13px', padding: '12px 16px', color: 'var(--muted)' }}>
                          {size.loadIndex}
                        </td>
                        <td style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px', padding: '12px 16px' }}>
                          {formatPriceCLP(size.priceCLP)}
                        </td>
                        <td style={{ padding: '12px 16px' }}>
                          <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: size.stock === 'in_stock' ? 'var(--green)' : size.stock === 'low_stock' ? 'var(--amber)' : 'var(--muted)' }}>
                            {size.stock === 'in_stock' ? 'En stock' : size.stock === 'low_stock' ? 'Stock limitado' : 'Sin stock'}
                          </span>
                        </td>
                        <td style={{ padding: '12px 16px' }}>
                          <button
                            onClick={() => onSizeSelect(size)}
                            style={{
                              fontFamily: 'var(--font-display)',
                              fontWeight: 700,
                              fontSize: '11px',
                              letterSpacing: '0.08em',
                              textTransform: 'uppercase',
                              padding: '6px 14px',
                              background: isSelected ? 'var(--kenda)' : 'white',
                              color: isSelected ? 'white' : 'var(--text)',
                              border: isSelected ? '1px solid var(--kenda)' : '1px solid var(--line-2)',
                              cursor: 'pointer',
                            }}
                          >
                            {isSelected ? '✓ Seleccionada' : 'Seleccionar'}
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* GARANTÍA */}
        {activeTab === 'garantia' && (
          <div style={{ maxWidth: '640px' }}>
            <div className="eyebrow mb-4">Garantía y devoluciones</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '24px', textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: '24px' }}>
              Kenda Tires — Garantía oficial
            </h2>
            {[
              {
                title: 'Garantía de fabricación',
                text: 'Todos los neumáticos Kenda vendidos por Carioca Chile Ltda. son 100% originales e incluyen la garantía de fábrica de Kenda Rubber Industrial Co., Ltd. (Taiwán) contra defectos de fabricación.',
              },
              {
                title: 'Plazo de garantía',
                text: 'La garantía cubre defectos de fabricación durante la vida útil del neumático, siempre que se use dentro de las especificaciones de carga, velocidad y presión indicadas por Kenda. No cubre desgaste normal, pinchazos, daños por impacto o uso incorrecto.',
              },
              {
                title: 'Política de devolución',
                text: 'Aceptamos devoluciones de neumáticos sin montar en su embalaje original dentro de los 10 días hábiles siguientes a la recepción. Contáctanos por WhatsApp para iniciar el proceso.',
              },
              {
                title: 'Importación directa',
                text: 'Al importar directamente desde Kenda (Taiwán) a través de ZOFRI Iquique, garantizamos la autenticidad y trazabilidad de cada neumático. Todos los productos cuentan con documentación de importación.',
              },
            ].map((item, i) => (
              <div key={i} style={{ marginBottom: '24px', paddingBottom: '24px', borderBottom: i < 3 ? '1px solid var(--line)' : 'none' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '16px', textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: '8px', color: 'var(--text)' }}>
                  {item.title}
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--muted)', lineHeight: 1.7 }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
