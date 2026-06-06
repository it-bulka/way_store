import { configureStore } from '@reduxjs/toolkit'
import { cartReducer } from '@/redux/reducers/cartSlice'
import { productsReducer } from '@/redux/reducers/productsSlice'
import { FilterCategoryReducer } from '@/redux/reducers/filterCategorySlice.ts'
import { userReducer } from '@/redux/reducers/userSlice.ts'
import { authReducer } from '@/redux/reducers/authSlice'
import { localStorageMiddleware } from '@/redux/middleware/localStorageMW'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    filterCategory: FilterCategoryReducer,
    user: userReducer,
    auth: authReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().prepend(localStorageMiddleware.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
