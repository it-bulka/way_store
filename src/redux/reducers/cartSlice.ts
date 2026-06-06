import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { cartItems } from '@/data/cartItems'
import type { ICart, ICartItem } from '@/redux/types/cartTypes'
import { storage } from '@/utils/storage'

const initialState: ICart = {
  items: storage.get<ICartItem[]>('cart') ?? cartItems,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setItemAmount: (state, action: PayloadAction<{ id: string; amount: number }>) => {
      const { id, amount } = action.payload

      state.items = state.items.map(item => {
        if (item.id === id) {
          item.amount = amount
        }

        return item
      })
    },

    addItem: (state, action: PayloadAction<ICartItem>) => {
      const { id, ...rest } = action.payload
      let isExisted = false

      state.items = state.items.map(item => {
        if (item.id === id) {
          isExisted = true
          return { id, ...rest, amount: item.amount + rest.amount }
        }

        return item
      })

      isExisted || state.items.push(action.payload)
    },

    deleteItem: (state: ICart, action: PayloadAction<{ id: string }>) => {
      state.items = state.items.filter(item => item.id !== action.payload.id)
    },

    clearCart: (state: ICart) => {
      state.items = []
    },
  },
})

export const cartActions = cartSlice.actions
export const { reducer: cartReducer } = cartSlice
