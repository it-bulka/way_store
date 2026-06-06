import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IProduct } from '@/models/goodsType'
import { fetchProducts } from '@/redux/async/fetchProducts'
import { storage } from '@/utils/storage'
import { mockProducts } from '@/data/mockProducts'

export interface IProductsSlice {
  products: IProduct[]
  chosen: IProduct[]
  loading: boolean
  error: null | string
}

const initialState: IProductsSlice = {
  products: mockProducts,
  chosen: storage.get<IProduct[]>('chosen') ?? [],
  loading: false,
  error: null,
}

const cartSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addChosen: (state, action: PayloadAction<IProduct>) => {
      state.chosen.push(action.payload)
    },
    deleteChosen: (state, action: PayloadAction<string>) => {
      state.chosen = state.chosen.filter(item => item.id !== action.payload)
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.products = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})
export const { reducer: productsReducer, actions: productsAction } = cartSlice
