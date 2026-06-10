import sharp from 'sharp'
import { readdir, writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import type { WriteBatch } from 'firebase-admin/firestore'
import type { IProduct, ProductType, ringsColors } from '../src/models/goodsType'
import { PAGES } from '../src/models/pages'
import { db, bucket } from './firebase'
import { seedData, seedDataEn } from './mockData'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const ROOT = join(__dirname, '..')
const ASSETS = join(ROOT, 'src', 'assets', 'products')
const PUBLIC = join(ROOT, 'public', 'products')
const COLORS: ringsColors[] = ['white', 'rose', 'yellow']
const BATCH_LIMIT = 500

const SKIP_UPLOAD = process.argv.includes('--local-only')
const CLEAR_FIRST = process.argv.includes('--clear')

function folderNum(id: string): string {
  const m = id.match(/(\d+)$/)
  return m ? m[1].padStart(3, '0') : ''
}

async function optimizeLocally(
  category: string,
  id: string,
): Promise<Record<ringsColors, string[]>> {
  const num = folderNum(id)
  const productDir = join(ASSETS, category, num)
  const result: Record<ringsColors, string[]> = { white: [], rose: [], yellow: [] }
  if (!num || !existsSync(productDir)) return result

  for (const color of COLORS) {
    const colorDir = join(productDir, color)
    if (!existsSync(colorDir)) continue

    const files = (await readdir(colorDir))
      .filter(f => /\.(png|jpe?g)$/i.test(f))
      .sort()

    for (let i = 0; i < files.length; i++) {
      const outName = `${i + 1}.webp`
      const outPath = join(colorDir, outName)

      if (!existsSync(outPath)) {
        const buf = await sharp(join(colorDir, files[i]))
          .resize(800, 800, { fit: 'inside', withoutEnlargement: true })
          .webp({ quality: 85 })
          .toBuffer()
        await writeFile(outPath, buf)

        const publicPath = join(PUBLIC, category, num, color, outName)
        await mkdir(dirname(publicPath), { recursive: true })
        await writeFile(publicPath, buf)
      }

      result[color].push(outPath)
    }
  }

  return result
}

async function uploadToStorage(
  localPaths: Record<ringsColors, string[]>,
  category: string,
  id: string,
): Promise<Record<ringsColors, string[]>> {
  const result: Record<ringsColors, string[]> = { white: [], rose: [], yellow: [] }

  for (const color of COLORS) {
    for (let i = 0; i < localPaths[color].length; i++) {
      const outName = `${i + 1}.webp`
      const storagePath = `products/${category}/${id}/${color}/${outName}`
      const file = bucket.file(storagePath)

      const buf = await import('fs').then(m => m.promises.readFile(localPaths[color][i]))
      await file.save(buf, { contentType: 'image/webp', resumable: false })
      await file.makePublic()
      result[color].push(file.publicUrl())
    }
  }

  return result
}

const flush = async (batch: WriteBatch, n: number): Promise<[WriteBatch, number]> => {
  if (n >= BATCH_LIMIT) {
    await batch.commit()
    return [db.batch(), 0]
  }
  return [batch, n]
}

async function clearCollections() {
  console.log('Clearing existing Firestore documents...')
  for (const lang of ['ukr', 'eng'] as const) {
    for (const category of Object.keys(seedData)) {
      const colPath = PAGES.getCollection(lang, category as ProductType)
      const col = db.collection(colPath)
      const docs = await col.listDocuments()
      if (!docs.length) continue

      let delBatch = db.batch()
      let n = 0
      for (const ref of docs) {
        delBatch.delete(ref)
        n++
        if (n >= BATCH_LIMIT) {
          await delBatch.commit()
          delBatch = db.batch()
          n = 0
        }
      }
      if (n > 0) await delBatch.commit()
      console.log(`  ✓ cleared ${lang}/${category} (${docs.length} docs)`)
    }
  }
  console.log()
}

async function seed() {
  if (CLEAR_FIRST) await clearCollections()

  if (SKIP_UPLOAD) {
    console.log('Mode: local-only (optimize images, skip Firebase Storage upload)\n')
  }

  let batch = db.batch()
  let count = 0
  let total = 0
  let uploadErrors = 0

  for (const [category, products] of Object.entries(seedData)) {
    console.log(`\n${category}:`)

    for (const product of products as IProduct[]) {
      const { id, ...data } = product
      const colPath = PAGES.getCollection('ukr', category as ProductType)

      process.stdout.write(`  ${id} ... `)

      const localPaths = await optimizeLocally(category, id)
      const hasLocal = COLORS.some(c => localPaths[c].length > 0)

      let finalImages: Record<ringsColors, string[]> | null = null

      if (hasLocal && !SKIP_UPLOAD) {
        try {
          finalImages = await uploadToStorage(localPaths, category, id)
        } catch (err) {
          const msg = err instanceof Error ? err.message : String(err)
          uploadErrors++
          if (uploadErrors === 1) {
            console.error(`\n  ⚠ Storage upload failed: ${msg.split('\n')[0]}`)
            console.error('  ⚠ Falling back to placeholder images for remaining products.')
            console.error('  ⚠ To fix: enable Firebase Storage (Blaze plan) or run with --local-only\n')
          }
        }
      }

      const docData = finalImages ? { ...data, images: finalImages } : data

      const ref = db.doc(`${colPath}/${id}`)
      batch.set(ref, docData)
      count++
      total++
      ;[batch, count] = await flush(batch, count)

      if (finalImages) {
        console.log('✓ real images')
      } else if (hasLocal && !SKIP_UPLOAD) {
        console.log('⚠ upload failed, using placeholder')
      } else if (hasLocal) {
        console.log('✓ optimized locally')
      } else {
        console.log('✓ placeholder')
      }
    }
  }

  if (count > 0) await batch.commit()
  console.log(`\nSeeded ${total} ukr documents across ${Object.keys(seedData).length} categories.`)
  if (uploadErrors > 0) {
    console.log(`\n${uploadErrors} products used placeholder images due to Storage upload errors.`)
    console.log('Run again after enabling Firebase Storage billing to upload real images.')
  }

  console.log('\n--- Seeding eng (English) ---')
  batch = db.batch()
  count = 0
  let totalEn = 0

  for (const [category, products] of Object.entries(seedDataEn)) {
    console.log(`\n${category} (eng):`)

    for (const product of products as IProduct[]) {
      const { id, ...data } = product
      const colPath = PAGES.getCollection('eng', category as ProductType)

      process.stdout.write(`  ${id} ... `)

      const localPaths = await optimizeLocally(category, id)
      const hasLocal = COLORS.some(c => localPaths[c].length > 0)

      let finalImages: Record<ringsColors, string[]> | null = null

      if (hasLocal && !SKIP_UPLOAD) {
        try {
          finalImages = await uploadToStorage(localPaths, category, id)
        } catch {
          // images already uploaded during ukr pass — reuse same URLs
        }
      }

      const docData = finalImages ? { ...data, images: finalImages } : data

      const ref = db.doc(`${colPath}/${id}`)
      batch.set(ref, docData)
      count++
      totalEn++
      ;[batch, count] = await flush(batch, count)

      if (finalImages) {
        console.log('✓ real images')
      } else if (hasLocal) {
        console.log('✓ optimized locally')
      } else {
        console.log('✓ placeholder')
      }
    }
  }

  if (count > 0) await batch.commit()
  console.log(`\nSeeded ${totalEn} eng documents across ${Object.keys(seedDataEn).length} categories.`)
}

seed().catch(err => {
  console.error('Seed failed:', err)
  process.exit(1)
})
