import { createAsyncThunk } from '@reduxjs/toolkit'
import { storage } from '@/utils/storage'
import type { ICartItem } from '@/redux/types/cartTypes'
import type { RootState } from '@/redux/store'

export const syncCartOnLogin = createAsyncThunk<ICartItem[], string>(
  'cart/syncOnLogin',
  (uid, { getState }) => {
    const guestItems = (getState() as RootState).cart.items
    const savedItems = storage.get<ICartItem[]>(`cart_${uid}`) ?? []

    const merged = [...savedItems]
    for (const item of guestItems) {
      const exists = merged.some(
        i => i.id === item.id && i.color === item.color && i.size === item.size
      )
      if (!exists) merged.push(item)
    }

    storage.remove('cart_guest')
    return merged
  }
)

export const restoreGuestCart = createAsyncThunk<ICartItem[]>(
  'cart/restoreGuestCart',
  () => storage.get<ICartItem[]>('cart_guest') ?? []
)
