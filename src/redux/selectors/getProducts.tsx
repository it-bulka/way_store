import { RootState } from '@/redux/store'

export const getProducts = (state: RootState) => state.products.products
