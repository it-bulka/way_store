import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit'
import { cartItems } from '@/data/cartItems'
import type { ICart, ICartItem } from '@/redux/types/cartTypes'

const initialState: ICart = {
  items: cartItems,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setItemAmount: (state: Draft<ICart>, action: PayloadAction<{ id: string; amount: number }>) => {
      const { id, amount } = action.payload

      state.items = state.items.map(item => {
        if (item.id === id) {
          item.amount = amount
        }

        return item
      })
    },

    addItem: (state: Draft<ICart>, action: PayloadAction<ICartItem>) => {
      state.items.push(action.payload)
    },

    deleteItem: (state: Draft<ICart>, action: PayloadAction<{ id: string }>) => {
      state.items = state.items.filter(item => item.id !== action.payload.id)
    },
  },
})

export const cartActions = cartSlice.actions
export const { reducer: cartReducer } = cartSlice
