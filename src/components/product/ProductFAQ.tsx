import { FAQAccordion } from '@/components/ui/FAQAccordion'
import { buildFAQ } from '@/lib/schema'
import { formatPriceCLP } from '@/lib/products'
import type { Product, Size } from '@/lib/types'

interface Props {
  product: Product
  selectedSize: Size
}

export function ProductFAQ({ product, selectedSize }: Props) {
  const tipoStr = selectedSize.type.join(' / ')
  const stockStr =
    selectedSize.stock === 'in_stock'
      ? 'en stock disponible'
      : selectedSize.stock === 'low_stock'
      ? 'en stock (unidades limitadas)'
      : 'sin stock actualmente'

  const items = [
    {
      question: `¿El neumático Kenda ${product.ref} ${selectedSize.medida} tiene envío gratis a todo Chile?`,
      answer: `Sí. Todos los pedidos incluyen envío gratis a las 16 regiones de Chile. Despachamos desde nuestra bodega en ZOFRI Iquique. Tiempo estimado: 2-3 días hábiles a Santiago, 3-5 días al sur.`,
    },
    {
      question: `¿El Kenda ${product.ref} ${selectedSize.medida} es ${tipoStr}?`,
      answer: `Sí, el Kenda ${product.ref} en medida ${selectedSize.medida} es de tipo ${tipoStr}. ${
        selectedSize.type.includes('TL')
          ? 'TL (Tubeless) es compatible con llantas sin cámara de aire. Es más seguro ante pinchazos lentos ya que el aire no escapa de inmediato.'
          : 'TT (Tube Type) requiere cámara de aire y es el estándar para llantas de radios y motos clásicas.'
      }`,
    },
    {
      question: `¿Cuál es el precio del Kenda ${product.ref} ${selectedSize.medida} en Chile?`,
      answer: `El precio actual del Kenda ${product.ref} medida ${selectedSize.medida} es ${formatPriceCLP(selectedSize.priceCLP)} IVA incluido. Precio de importador directo. Para compras mayoristas (desde 6 unidades) aplican descuentos del 25% al 45%.`,
    },
    {
      question: `¿El neumático Kenda ${product.ref} ${selectedSize.medida} está disponible en Chile?`,
      answer: `El Kenda ${product.ref} ${selectedSize.medida} se encuentra ${stockStr}. Importamos directamente desde Kenda Rubber Industrial Co., Ltd. (Taiwán) a través de ZOFRI Iquique con stock permanente de más de 200 referencias.`,
    },
    {
      question: `¿Los neumáticos Kenda ${product.ref} son originales?`,
      answer: `Sí. Carioca Chile Ltda. (RUT 78.846.500-9) es el importador oficial exclusivo de Kenda Tires en Chile. Importamos directamente desde Taiwan a través de ZOFRI Iquique. Todos los neumáticos son 100% originales con documentación de importación y número DOT verificable.`,
    },
    {
      question: `¿Qué motos son compatibles con el Kenda ${product.ref} ${selectedSize.medida}?`,
      answer: selectedSize.compatMotos && selectedSize.compatMotos.length > 0
        ? `El neumático Kenda ${product.ref} ${selectedSize.medida} es compatible con: ${selectedSize.compatMotos.join(', ')}. Para confirmar compatibilidad con tu modelo exacto consulta el manual de tu moto o contáctanos por WhatsApp.`
        : `La medida ${selectedSize.medida} es compatible con motos ${product.tagline}. Para confirmar la compatibilidad exacta con tu modelo consulta el manual de propietario o contáctanos por WhatsApp con el modelo de tu moto.`,
    },
  ]

  const schema = buildFAQ(items)

  return (
    <section style={{ padding: '64px 0', background: 'var(--cream)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="wrap" style={{ maxWidth: '800px' }}>
        <div className="eyebrow mb-4">Preguntas frecuentes</div>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(24px, 3vw, 36px)',
            textTransform: 'uppercase',
            letterSpacing: '-0.01em',
            lineHeight: 1,
            marginBottom: '32px',
          }}
        >
          {product.ref} {selectedSize.medida} — FAQ
        </h2>
        <FAQAccordion items={items} />
      </div>
    </section>
  )
}
