import { createListenerMiddleware } from '@reduxjs/toolkit'
import { storage } from '@/utils/storage'
import { signIn } from '@/redux/async/signIn'
import { signUp } from '@/redux/async/signUp'
import { syncChosen } from '@/redux/async/syncChosen'
import type { RootState, AppDispatch } from '@/redux/store'

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

localStorageMiddleware.startListening({
  actionCreator: signIn.fulfilled,
  effect: async (action, { dispatch }) => {
    if (action.payload.uid) {
      ;(dispatch as AppDispatch)(syncChosen(action.payload.uid))
    }
  },
})

localStorageMiddleware.startListening({
  actionCreator: signUp.fulfilled,
  effect: async (action, { dispatch }) => {
    if (action.payload.uid) {
      ;(dispatch as AppDispatch)(syncChosen(action.payload.uid))
    }
  },
})
