import { createAsyncThunk } from '@reduxjs/toolkit'
import { getSubcollectionDocs } from '@/services/getSubcolectionDocs'
import { IProduct } from '@/models/goodsType'

export const fetchProducts = createAsyncThunk<IProduct[], string>(
  'products/fetch',
  async (collection, { rejectWithValue }) => {
    try {
      const data = await getSubcollectionDocs<IProduct>(
        'products',
        'translations',
        'ukr',
        'accessories',
        collection
      )

      console.log({ data })

      return data
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message)
      }

      return rejectWithValue('Ooops... Something is wrong')
    }
  }
)
