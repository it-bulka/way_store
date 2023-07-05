import { createAsyncThunk } from '@reduxjs/toolkit'
import { getSubcollectionDocs } from '@/services/getSubcolectionDocs'
import { IProduct } from '@/models/goodsType'
import { QueryFieldFilterConstraint } from '@firebase/firestore'

type IFetchProducts = {
  collection: string
  queries?: QueryFieldFilterConstraint[]
}
export const fetchProducts = createAsyncThunk<IProduct[], IFetchProducts>(
  'products/fetch',
  async (arg, { rejectWithValue }) => {
    try {
      const data = await getSubcollectionDocs<IProduct>({
        slugs: ['products', 'translations', 'ukr', 'accessories', arg.collection],
        queries: arg.queries,
      })

      return data
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message)
      }

      return rejectWithValue('Ooops... Something is wrong')
    }
  }
)
