import sharp from 'sharp'
import { writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_DIR = join(__dirname, '../public/images/products')

const TIRES = [
  {
    slug: 'k784',
    images: [
      { url: 'https://powersports.kendatire.com/media/541618/k784r.jpg', variant: 'principal' },
      { url: 'https://powersports.kendatire.com/media/541619/k784f.jpg', variant: 'tread' },
    ],
  },
  {
    slug: 'k778',
    images: [
      { url: 'https://powersports.kendatire.com/media/655748/k778_knarly_angle.jpg', variant: 'principal' },
    ],
  },
  {
    slug: 'k779',
    images: [
      { url: 'https://powersports.kendatire.com/media/655513/k777f-knarly.jpg', variant: 'principal' },
    ],
  },
  {
    slug: 'k785',
    images: [
      { url: 'https://powersports.kendatire.com/media/466029/k785r.jpg', variant: 'principal' },
      { url: 'https://powersports.kendatire.com/media/1193/k785f.jpg', variant: 'tread' },
    ],
  },
  {
    slug: 'k782',
    images: [
      { url: 'https://powersports.kendatire.com/media/465992/k782.jpg', variant: 'principal' },
      { url: 'https://powersports.kendatire.com/media/735636/mcck782a.jpg', variant: 'tread' },
    ],
  },
  {
    slug: 'k761',
    images: [
      { url: 'https://powersports.kendatire.com/media/466002/k761.jpg', variant: 'principal' },
      { url: 'https://powersports.kendatire.com/media/1190/k761f.jpg', variant: 'tread' },
    ],
  },
  {
    slug: 'k787',
    images: [
      { url: 'https://powersports.kendatire.com/media/466010/k787.jpg', variant: 'principal' },
    ],
  },
]

async function downloadAndConvert(url, destPath) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`)
  const buf = Buffer.from(await res.arrayBuffer())
  await sharp(buf)
    .resize({ width: 600, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(destPath)
  const kb = Math.round((await sharp(destPath).metadata()).size / 1024)
  console.log(`  ✓ ${destPath.split('/public/')[1]} (${kb} KB)`)
}

for (const tire of TIRES) {
  console.log(`\n${tire.slug.toUpperCase()}`)
  for (const img of tire.images) {
    const dest = join(OUT_DIR, tire.slug, `${tire.slug}-${img.variant}.webp`)
    try {
      await downloadAndConvert(img.url, dest)
    } catch (err) {
      console.error(`  ✗ ${img.variant}: ${err.message}`)
    }
  }
}
console.log('\nDone.')
