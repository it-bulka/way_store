import type { WriteBatch } from 'firebase-admin/firestore'
import type { ProductType } from '../src/models/goodsType'
import { PAGES } from '../src/models/pages'
import { db } from './firebase'
import { seedData } from './mockData'

const BATCH_LIMIT = 500

const flush = async (batch: WriteBatch, count: number): Promise<[WriteBatch, number]> => {
  if (count >= BATCH_LIMIT) {
    await batch.commit()
    return [db.batch(), 0]
  }
  return [batch, count]
}

async function seed() {
  let batch = db.batch()
  let count = 0
  let total = 0

  for (const [category, products] of Object.entries(seedData)) {
    const colPath = PAGES.getCollection('ukr', category as ProductType)

    for (const { id, ...data } of products) {
      const ref = db.doc(`${colPath}/${id}`)
      batch.set(ref, data)
      count++
      total++
      ;[batch, count] = await flush(batch, count)
    }

    console.log(`  ✓ ${category}: ${products.length} docs`)
  }

  if (count > 0) await batch.commit()
  console.log(`\nSeeded ${total} documents across ${Object.keys(seedData).length} categories.`)
}

seed().catch(err => {
  console.error('Seed failed:', err)
  process.exit(1)
})
