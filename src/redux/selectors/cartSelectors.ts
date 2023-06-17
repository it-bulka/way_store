import { RootState } from '@/redux/store'
import { ICartItem } from '@/redux/types/cartTypes'

export const getCartItems = (state: RootState): ICartItem[] => state.cart.items
