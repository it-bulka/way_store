import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { cartItems } from '@/data/cartItems'
import type { ICart, ICartItem } from '@/redux/types/cartTypes'
import type { ringsColors } from '@/models/goodsType'
import { storage } from '@/utils/storage'

const initialState: ICart = {
  items: storage.get<ICartItem[]>('cart') ?? cartItems,
}

type VariantTarget = { id: string; color?: ringsColors; size?: number }

const matchVariant = (item: ICartItem, target: VariantTarget): boolean =>
  item.id === target.id && item.color === target.color && item.size === target.size

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setItemAmount: (state, action: PayloadAction<VariantTarget & { amount: number }>) => {
      const item = state.items.find(i => matchVariant(i, action.payload))
      if (item) item.amount = action.payload.amount
    },

    addItem: (state, action: PayloadAction<ICartItem>) => {
      const existing = state.items.find(i => matchVariant(i, action.payload))
      if (existing) {
        existing.amount += action.payload.amount
      } else {
        state.items.push(action.payload)
      }
    },

    deleteItem: (state: ICart, action: PayloadAction<VariantTarget>) => {
      state.items = state.items.filter(item => !matchVariant(item, action.payload))
    },

    updateItemVariant: (
      state,
      action: PayloadAction<{
        id: string
        oldColor?: ringsColors
        oldSize?: number
        newColor?: ringsColors
        newSize?: number
        newImg?: string
      }>
    ) => {
      const { id, oldColor, oldSize, newColor, newSize, newImg } = action.payload
      const idx = state.items.findIndex(
        i => i.id === id && i.color === oldColor && i.size === oldSize
      )
      if (idx === -1) return

      const finalColor = newColor ?? oldColor
      const finalSize = newSize ?? oldSize
      const mergeIdx = state.items.findIndex(
        (i, j) => j !== idx && i.id === id && i.color === finalColor && i.size === finalSize
      )

      if (mergeIdx !== -1) {
        state.items[mergeIdx].amount += state.items[idx].amount
        state.items.splice(idx, 1)
      } else {
        if (newColor !== undefined) state.items[idx].color = newColor
        if (newSize !== undefined) state.items[idx].size = newSize
        if (newImg !== undefined) state.items[idx].img = newImg
      }
    },

    clearCart: (state: ICart) => {
      state.items = []
    },
  },
})

export const cartActions = cartSlice.actions
export const { reducer: cartReducer } = cartSlice
