import type { ProductType } from './goodsType'

export const PAGES = {
  getCollection: (lang: 'ukr' | 'eng' = 'ukr', type: ProductType = 'rings') =>
    `products/translations/${lang}/accessories/${type}`,
} as const
