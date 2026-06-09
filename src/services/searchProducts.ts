import { getSubcollectionDocs } from '@/services'
import { PAGES } from '@/models'
import type { IProduct, ProductType } from '@/models/goodsType'
import type { Lang } from '@/models'

const ALL_CATEGORIES: ProductType[] = [
  'rings', 'necklaces', 'bracelets', 'earrings',
  'pendants', 'watches', 'cufflinks', 'chains',
]

export const fetchAllProducts = async (lang: Lang = 'ukr'): Promise<IProduct[]> => {
  const results = await Promise.all(
    ALL_CATEGORIES.map(async category => {
      const products = await getSubcollectionDocs<IProduct>({
        slugs: PAGES.getCollection(lang, category).split('/'),
      })
      return products.map(p => ({ ...p, category }))
    })
  )
  return results.flat()
}
