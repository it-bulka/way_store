import { createAsyncThunk } from '@reduxjs/toolkit'
import { getSubcollectionDocs } from '@/services/getSubcolectionDocs'
import { PAGES } from '@/models/pages'
import type { Lang } from '@/models/pages'
import type { IProduct, ProductType } from '@/models/goodsType'
import type { QueryFieldFilterConstraint } from '@firebase/firestore'

type IFetchProducts = {
  collection: ProductType
  queries?: QueryFieldFilterConstraint[]
  lang?: Lang
}

export const fetchProducts = createAsyncThunk<IProduct[], IFetchProducts>(
  'products/fetch',
  async (arg, { rejectWithValue }) => {
    try {
      const data = await getSubcollectionDocs<IProduct>({
        slugs: PAGES.getCollection(arg.lang, arg.collection).split('/'),
        queries: arg.queries,
      })
      return data
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Ooops... Something is wrong')
    }
  }
)
