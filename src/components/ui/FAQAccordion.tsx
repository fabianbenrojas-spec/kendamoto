'use client'

import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
}

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
      {items.map((item, i) => (
        <div key={i} style={{ background: 'var(--cream)', border: '1px solid var(--line)' }}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
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
              background: 'none',
              border: 'none',
              textAlign: 'left',
              color: 'var(--text)',
              gap: '16px',
            }}
          >
            <span>{item.question}</span>
            <span
              style={{
                color: 'var(--kenda)',
                flexShrink: 0,
                fontSize: '22px',
                lineHeight: 1,
                fontWeight: 300,
              }}
            >
              {open === i ? '−' : '+'}
            </span>
          </button>
          <div
            style={{
              maxHeight: open === i ? '500px' : '0',
              overflow: 'hidden',
              transition: 'max-height 0.3s ease',
            }}
          >
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
          </div>
        </div>
      ))}
    </div>
  )
}
