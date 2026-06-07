import type { ProductType } from './goodsType'

export const DEFAULT_LANG = 'ukr' as const
export type Lang = 'ukr' | 'eng'

export const PAGES = {
  getCollection: (lang: Lang = DEFAULT_LANG, type: ProductType = 'rings') =>
    `products/translations/${lang}/accessories/${type}`,
} as const
