import sharp from 'sharp'
import { readdirSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PRODUCTS_DIR = join(__dirname, '../public/images/products')
const OUT_FILE = join(__dirname, '../src/data/image-blur-map.ts')

const entries = {}

for (const slug of readdirSync(PRODUCTS_DIR)) {
  const dir = join(PRODUCTS_DIR, slug)
  let files
  try { files = readdirSync(dir) } catch { continue }
  for (const file of files.filter(f => f.endsWith('.webp'))) {
    const publicPath = `/images/products/${slug}/${file}`
    const buf = await sharp(join(dir, file))
      .resize(10, 8, { fit: 'cover' })
      .webp({ quality: 20 })
      .toBuffer()
    entries[publicPath] = `data:image/webp;base64,${buf.toString('base64')}`
    console.log(`  ${publicPath}`)
  }
}

const sorted = Object.fromEntries(Object.entries(entries).sort(([a], [b]) => a.localeCompare(b)))
const body = JSON.stringify(sorted, null, 2)
writeFileSync(OUT_FILE, `// Auto-generated — DO NOT EDIT\n// Regenerate after adding images: node scripts/generate-blur-placeholders.mjs\nexport const IMAGE_BLUR_MAP: Record<string, string> = ${body}\n`)
console.log(`\nWrote ${Object.keys(sorted).length} entries to ${OUT_FILE}`)
