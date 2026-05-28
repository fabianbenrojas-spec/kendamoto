import type { MetadataRoute } from 'next'
import { absoluteUrl } from '@/lib/site'
import { getProducts, sizeToSlug } from '@/lib/products'
import { getAllPosts } from '@/lib/blog'
import categories from '@/data/categories.json'
import cities from '@/data/cities.json'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts()
  const posts = getAllPosts()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl('/'), lastModified: new Date(), priority: 1.0 },
    { url: absoluteUrl('/neumaticos-kenda-moto/'), priority: 0.9 },
    { url: absoluteUrl('/camaras-aire-moto-kenda/'), priority: 0.8 },
    { url: absoluteUrl('/mayoristas/'), priority: 0.8 },
    { url: absoluteUrl('/mayoristas/zofri-iquique/'), priority: 0.7 },
    { url: absoluteUrl('/neumaticos-moto-chile/'), priority: 0.7 },
    { url: absoluteUrl('/marca-kenda/'), priority: 0.6 },
    { url: absoluteUrl('/blog/'), priority: 0.7 },
  ]

  const categoryRoutes: MetadataRoute.Sitemap = categories.map(cat => ({
    url: absoluteUrl(`/neumaticos-kenda-moto/${cat.slug}/`),
    priority: 0.8,
  }))

  const productRoutes: MetadataRoute.Sitemap = products.flatMap(product =>
    product.sizes.map(size => ({
      url: absoluteUrl(
        `/neumaticos-kenda-moto/${product.category}/${product.slug}/${sizeToSlug(size.medida)}/`
      ),
      priority: 0.7,
    }))
  )

  const cityRoutes: MetadataRoute.Sitemap = cities.map(city => ({
    url: absoluteUrl(`/neumaticos-moto-chile/${city.slug}/`),
    priority: 0.6,
  }))

  const blogRoutes: MetadataRoute.Sitemap = posts.map(post => ({
    url: absoluteUrl(`/blog/${post.slug}/`),
    lastModified: new Date(post.date),
    priority: 0.6,
  }))

  return [...staticRoutes, ...categoryRoutes, ...productRoutes, ...cityRoutes, ...blogRoutes]
}
