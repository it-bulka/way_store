import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IProduct } from '@/models/goodsType'
import { fetchProducts } from '@/redux/async/fetchProducts'
import { syncChosen } from '@/redux/async/syncChosen'
import { storage } from '@/utils/storage'

export interface IProductsSlice {
  products: IProduct[]
  chosen: IProduct[]
  loading: boolean
  error: null | string
}

const initialState: IProductsSlice = {
  products: [],
  chosen: storage.get<IProduct[]>('chosen') ?? [],
  loading: false,
  error: null,
}

const cartSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload
    },
    appendProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.products.push(...action.payload)
    },
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
      .addCase(syncChosen.fulfilled, (state, action) => {
        state.chosen = action.payload
      })
  },
})
export const { reducer: productsReducer, actions: productsAction } = cartSlice
