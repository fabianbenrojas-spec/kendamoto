'use client'

interface FAQItem {
  question: string
  answer: string
}

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
      {items.map((item, i) => (
        <details
          key={i}
          style={{
            background: 'var(--cream)',
            border: '1px solid var(--line)',
          }}
        >
          <summary
            style={{
              width: '100%',
              padding: '20px 24px',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '16px',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              listStyle: 'none',
              color: 'var(--text)',
              gap: '16px',
            }}
          >
            <span>{item.question}</span>
            <span
              className="faq-indicator"
              style={{
                color: 'var(--kenda)',
                flexShrink: 0,
                fontSize: '22px',
                lineHeight: 1,
                fontWeight: 300,
                transition: 'transform 0.2s',
                display: 'inline-block',
              }}
            >
              +
            </span>
          </summary>
          <div
            style={{
              padding: '0 24px 20px',
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              color: 'var(--muted)',
              lineHeight: 1.7,
            }}
          >
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  )
}

export default FAQAccordion
