import type { LoaderFunctionArgs } from 'react-router-dom'
import { getDocInfo } from '@/services'
import { PAGES } from '@/models'
import type { IProduct, ProductType } from '@/models/goodsType'

export const goodsLoader = async ({ params, request }: LoaderFunctionArgs) => {
  if (!params.slug) return null
  const category = (new URL(request.url).searchParams.get('category') as ProductType) ?? 'rings'
  return getDocInfo<IProduct>(PAGES.getCollection(undefined, category), params.slug)
}
