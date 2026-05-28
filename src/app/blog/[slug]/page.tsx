import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllPosts, getPostBySlug } from '@/lib/blog'
import { absoluteUrl } from '@/lib/site'
import { buildBreadcrumb } from '@/lib/schema'
import { BlogTOC } from '@/components/blog/BlogTOC'
import { BlogRelatedProducts, BlogRelatedPosts } from '@/components/blog/BlogProductCard'

interface Props { params: Promise<{ slug: string }> }

function slugify(text: string): string {
  return String(text)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

function extractHeadings(content: string): { level: 2 | 3; text: string; id: string }[] {
  return content
    .split('\n')
    .filter(line => /^#{2,3} /.test(line))
    .map(line => {
      const level = line.startsWith('### ') ? 3 : 2
      const text = line.replace(/^#{2,3} /, '').trim()
      return { level, text, id: slugify(text) }
    })
}

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' })
  } catch { return dateStr }
}

const mdxComponents = {
  h2: ({ children, ...props }: React.ComponentProps<'h2'>) => {
    const id = slugify(String(children))
    return (
      <h2 id={id} {...props} style={{ scrollMarginTop: '80px' }}>{children}</h2>
    )
  },
  h3: ({ children, ...props }: React.ComponentProps<'h3'>) => {
    const id = slugify(String(children))
    return (
      <h3 id={id} {...props} style={{ scrollMarginTop: '80px' }}>{children}</h3>
    )
  },
  h4: ({ children, ...props }: React.ComponentProps<'h4'>) => (
    <h4 {...props}>{children}</h4>
  ),
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map(post => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: absoluteUrl(`/blog/${slug}/`) },
    openGraph: {
      title: post.title,
      description: post.description,
      url: absoluteUrl(`/blog/${slug}/`),
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const allPosts = getAllPosts()
  const relatedPostObjects = (post.relatedPosts ?? [])
    .map(s => allPosts.find(p => p.slug === s))
    .filter(Boolean) as typeof allPosts

  const headings = extractHeadings(post.content)

  const breadcrumb = buildBreadcrumb([
    { name: 'Inicio', url: absoluteUrl('/') },
    { name: 'Blog', url: absoluteUrl('/blog/') },
    { name: post.title, url: absoluteUrl(`/blog/${slug}/`) },
  ])

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { '@type': 'Organization', name: post.author },
    publisher: { '@type': 'Organization', name: 'Kenda Moto Chile' },
    url: absoluteUrl(`/blog/${slug}/`),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <article>
        {/* Hero */}
        <header style={{ background: 'var(--ink)', color: 'white', padding: '64px 0 48px' }}>
          <div className="wrap" style={{ maxWidth: '960px' }}>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--kenda)' }}>
                {post.category}
              </span>
              <span style={{ color: 'var(--line-dark)' }}>·</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--dim)' }}>{post.readTime} de lectura</span>
              <span style={{ color: 'var(--line-dark)' }}>·</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--dim)' }}>{formatDate(post.date)}</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(28px, 5vw, 56px)', textTransform: 'uppercase', letterSpacing: '-0.01em', lineHeight: 1, marginBottom: '20px' }}>
              {post.title}
            </h1>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '17px', color: 'var(--dim)', lineHeight: 1.6, maxWidth: '680px' }}>
              {post.description}
            </p>
          </div>
        </header>

        {/* Breadcrumb */}
        <nav style={{ background: 'var(--cream)', borderBottom: '1px solid var(--line)', padding: '12px 0' }}>
          <div className="wrap" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--muted)' }}>
            <Link href="/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Inicio</Link>
            {' › '}
            <Link href="/blog/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Blog</Link>
            {' › '}
            <span style={{ color: 'var(--text)' }}>{post.title}</span>
          </div>
        </nav>

        {/* Main content */}
        <div style={{ background: 'var(--paper)' }}>
          <div className="wrap" style={{ maxWidth: '1100px' }}>
            <div className="blog-layout">
              {/* Article body */}
              <div>
                {/* TLDR card */}
                {post.tldr && (
                  <div style={{ background: 'var(--ink)', borderLeft: '4px solid var(--kenda)', padding: '24px 28px', marginBottom: '24px' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--kenda)', marginBottom: '10px' }}>
                      TL;DR — Resumen en 1 minuto
                    </div>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'white', lineHeight: 1.6, margin: 0 }}>
                      {post.tldr}
                    </p>
                  </div>
                )}

                {/* Key points */}
                {post.keyPoints && post.keyPoints.length > 0 && (
                  <div style={{ background: 'var(--cream)', border: '1px solid var(--line)', padding: '24px 28px', marginBottom: '40px' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text)', marginBottom: '14px' }}>
                      Puntos clave de este artículo
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {post.keyPoints.map((pt, i) => (
                        <li key={i} style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text)', display: 'flex', gap: '10px', lineHeight: 1.5 }}>
                          <span style={{ color: 'var(--kenda)', fontWeight: 700, flexShrink: 0, marginTop: '1px' }}>✓</span>
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* MDX content */}
                <div className="prose">
                  <MDXRemote source={post.content} components={mdxComponents} />
                </div>
              </div>

              {/* Sidebar TOC */}
              <aside>
                <BlogTOC headings={headings} />
              </aside>
            </div>
          </div>
        </div>

        {/* Related products */}
        {post.relatedProducts && post.relatedProducts.length > 0 && (
          <section style={{ padding: '64px 0', background: 'var(--cream)' }}>
            <div className="wrap">
              <div className="eyebrow mb-3">Productos mencionados en este artículo</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '28px', textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: '24px' }}>
                Neumáticos Kenda disponibles
              </h2>
              <BlogRelatedProducts products={post.relatedProducts} />
            </div>
          </section>
        )}

        {/* Related posts */}
        {relatedPostObjects.length > 0 && (
          <section style={{ padding: '64px 0', background: 'var(--paper)' }}>
            <div className="wrap">
              <div className="eyebrow mb-3">Sigue leyendo</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '28px', textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: '24px' }}>
                Artículos relacionados
              </h2>
              <BlogRelatedPosts posts={relatedPostObjects.map(rp => ({ slug: rp.slug, category: rp.category, readTime: rp.readTime, title: rp.title }))} />
            </div>
          </section>
        )}

        {/* CTA band */}
        <section style={{ background: 'var(--ink)', padding: '48px 0' }}>
          <div className="wrap">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(20px, 3vw, 32px)', textTransform: 'uppercase', letterSpacing: '-0.01em', color: 'white', lineHeight: 1, marginBottom: '8px' }}>
                  ¿Listo para comprar?
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--dim)' }}>
                  Stock disponible en ZOFRI Iquique · Envío gratis a todo Chile · Entrega en 24-72h
                </p>
              </div>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link href="/neumaticos-kenda-moto/" className="btn-primary">Ver neumáticos</Link>
                <Link href="/mayoristas/" className="btn-ghost">Portal B2B</Link>
              </div>
            </div>
          </div>
        </section>
      </article>
    </>
  )
}
