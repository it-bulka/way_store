import { configureStore } from '@reduxjs/toolkit'
import { cartReducer } from '@/redux/reducers/cartSlice'
import { productsReducer } from '@/redux/reducers/productsSlice'
import { FilterCategoryReducer } from '@/redux/reducers/filterCategorySlice.ts'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    filterCategory: FilterCategoryReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
