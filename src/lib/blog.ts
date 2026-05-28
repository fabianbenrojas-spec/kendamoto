import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  category: string
  author: string
  readTime: string
  keywords: string[]
  image?: string
  featured?: boolean
  content: string
  tldr?: string
  keyPoints?: string[]
  relatedProducts?: { ref: string; name: string; href: string; tagline: string }[]
  relatedPosts?: string[]
}

const contentDir = path.join(process.cwd(), 'content/blog')

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(contentDir)) return []

  const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.mdx'))

  return files
    .map(file => {
      const slug = file.replace('.mdx', '')
      const raw = fs.readFileSync(path.join(contentDir, file), 'utf-8')
      const { data, content } = matter(raw)
      return {
        slug,
        title: data.title ?? '',
        description: data.description ?? '',
        date: data.date ?? '',
        category: data.category ?? 'guias',
        author: data.author ?? 'Equipo Kenda Moto Chile',
        readTime: data.readTime ?? '5 min',
        keywords: data.keywords ?? [],
        image: data.image,
        featured: data.featured ?? false,
        content,
        tldr: data.tldr,
        keyPoints: data.keyPoints,
        relatedProducts: data.relatedProducts,
        relatedPosts: data.relatedPosts,
      } as BlogPost
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(contentDir, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  return {
    slug,
    title: data.title ?? '',
    description: data.description ?? '',
    date: data.date ?? '',
    category: data.category ?? 'guias',
    author: data.author ?? 'Equipo Kenda Moto Chile',
    readTime: data.readTime ?? '5 min',
    keywords: data.keywords ?? [],
    image: data.image,
    featured: data.featured ?? false,
    content,
    tldr: data.tldr,
    keyPoints: data.keyPoints,
    relatedProducts: data.relatedProducts,
    relatedPosts: data.relatedPosts,
  }
}

export function getFeaturedPosts(): BlogPost[] {
  return getAllPosts().filter(p => p.featured).slice(0, 3)
}
