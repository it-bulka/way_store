import type { ProductType } from './goodsType'

export const DEFAULT_LANG = 'ukr' as const
export type FirestoreLang = 'ukr' | 'eng'
/** @deprecated Use FirestoreLang */
export type Lang = FirestoreLang

export type AppLocale = 'uk' | 'en' | 'pl'

export const LOCALE_TO_FIRESTORE_LANG: Record<AppLocale, FirestoreLang> = {
  uk: 'ukr',
  en: 'eng',
  pl: 'eng',
}

export const PAGES = {
  getCollection: (lang: FirestoreLang = DEFAULT_LANG, type: ProductType = 'rings') =>
    `products/translations/${lang}/accessories/${type}`,
} as const
