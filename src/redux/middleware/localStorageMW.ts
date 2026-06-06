import { createListenerMiddleware } from '@reduxjs/toolkit'
import { storage } from '@/utils/storage'
import type { RootState } from '@/redux/store'

export const localStorageMiddleware = createListenerMiddleware()

localStorageMiddleware.startListening({
  predicate: action => (action.type as string).startsWith('cart/'),
  effect: (_, { getState }) => {
    const state = getState() as RootState
    storage.set('cart', state.cart.items)
  },
})

localStorageMiddleware.startListening({
  predicate: action =>
    (action.type as string).startsWith('products/') &&
    !(action.type as string).includes('fetchProducts'),
  effect: (_, { getState }) => {
    const state = getState() as RootState
    storage.set('chosen', state.products.chosen)
  },
})
