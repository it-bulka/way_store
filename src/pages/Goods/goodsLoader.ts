import type { LoaderFunctionArgs } from 'react-router-dom'
import { getDocInfo } from '@/services'
import { PAGES } from '@/models'
import type { IProduct } from '@/models/goodsType'

export const goodsLoader = async ({ params }: LoaderFunctionArgs) => {
  if (params.slug) return await getDocInfo<IProduct>(PAGES.getCollection('ukr'), params.slug)
  return null
}
