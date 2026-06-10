import type { LoaderFunctionArgs } from 'react-router-dom'
import { getDocInfo } from '@/services'
import { PAGES, LOCALE_TO_FIRESTORE_LANG } from '@/models/pages'
import type { AppLocale } from '@/models/pages'
import type { IProduct, ProductType } from '@/models/goodsType'

export const goodsLoader = async ({ params, request }: LoaderFunctionArgs) => {
  if (!params.slug) return null
  const category = (new URL(request.url).searchParams.get('category') as ProductType) ?? 'rings'
  const locale = (localStorage.getItem('way_store_lang') as AppLocale) ?? 'uk'
  const lang = LOCALE_TO_FIRESTORE_LANG[locale] ?? 'ukr'
  return getDocInfo<IProduct>(PAGES.getCollection(lang, category), params.slug)
}
