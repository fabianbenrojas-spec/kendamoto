import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllPosts, getPostBySlug } from '@/lib/blog'
import { absoluteUrl } from '@/lib/site'
import { buildBreadcrumb } from '@/lib/schema'

interface Props {
  params: Promise<{ slug: string }>
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
        <header style={{ background: 'var(--ink)', color: 'white', padding: '64px 0' }}>
          <div className="wrap" style={{ maxWidth: '800px' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--kenda)', marginBottom: '16px' }}>
              {post.category} · {post.readTime} · {post.author}
            </div>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'clamp(28px, 5vw, 56px)',
                textTransform: 'uppercase',
                letterSpacing: '-0.01em',
                lineHeight: 1,
                marginBottom: '16px',
              }}
            >
              {post.title}
            </h1>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '18px', color: 'var(--dim)', lineHeight: 1.6 }}>
              {post.description}
            </p>
          </div>
        </header>

        <nav style={{ background: 'var(--cream)', borderBottom: '1px solid var(--line)', padding: '12px 0' }}>
          <div className="wrap" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--muted)' }}>
            <Link href="/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Inicio</Link>
            {' › '}
            <Link href="/blog/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Blog</Link>
            {' › '}
            <span style={{ color: 'var(--text)' }}>{post.title}</span>
          </div>
        </nav>

        <div style={{ padding: '64px 0', background: 'var(--paper)' }}>
          <div className="wrap" style={{ maxWidth: '720px' }}>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '16px',
                lineHeight: 1.8,
                color: 'var(--text)',
              }}
              className="prose"
            >
              <MDXRemote source={post.content} />
            </div>
          </div>
        </div>
      </article>
    </>
  )
}
