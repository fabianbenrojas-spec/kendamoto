interface CategorySeoBlockProps {
  content: string
}

export function CategorySeoBlock({ content }: CategorySeoBlockProps) {
  return (
    <section style={{ padding: '64px 0', background: 'var(--paper)' }}>
      <div className="wrap" style={{ maxWidth: '800px' }}>
        <div
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '15px',
            color: 'var(--muted)',
            lineHeight: 1.8,
          }}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </section>
  )
}
