import { describe, it, expect } from 'vitest'
import { cartReducer, cartActions } from './cartSlice'
import type { ICart, ICartItem } from '@/redux/types/cartTypes'

const base: ICart = { items: [] }

const item1: ICartItem = { id: '1', title: 'Ring', amount: 1, price: 500, img: 'ring.jpg' }
const item2: ICartItem = { id: '2', title: 'Necklace', amount: 2, price: 800, img: 'neck.jpg' }

describe('cartSlice', () => {
  describe('addItem', () => {
    it('adds new item to empty cart', () => {
      const state = cartReducer(base, cartActions.addItem(item1))
      expect(state.items).toHaveLength(1)
      expect(state.items[0]).toEqual(item1)
    })

    it('adds new item to existing cart', () => {
      const state = cartReducer({ items: [item1] }, cartActions.addItem(item2))
      expect(state.items).toHaveLength(2)
    })

    it('increments amount when item already exists', () => {
      const state = cartReducer({ items: [item1] }, cartActions.addItem({ ...item1, amount: 2 }))
      expect(state.items).toHaveLength(1)
      expect(state.items[0].amount).toBe(3)
    })
  })

  describe('setItemAmount', () => {
    it('updates amount for matching item', () => {
      const state = cartReducer(
        { items: [item1] },
        cartActions.setItemAmount({ id: '1', amount: 5 })
      )
      expect(state.items[0].amount).toBe(5)
    })

    it('does not affect other items', () => {
      const state = cartReducer(
        { items: [item1, item2] },
        cartActions.setItemAmount({ id: '1', amount: 10 })
      )
      expect(state.items[1].amount).toBe(item2.amount)
    })
  })

  describe('deleteItem', () => {
    it('removes item by id', () => {
      const state = cartReducer({ items: [item1, item2] }, cartActions.deleteItem({ id: '1' }))
      expect(state.items).toHaveLength(1)
      expect(state.items[0].id).toBe('2')
    })

    it('is a no-op when id not found', () => {
      const state = cartReducer({ items: [item1] }, cartActions.deleteItem({ id: 'unknown' }))
      expect(state.items).toHaveLength(1)
    })
  })

  describe('clearCart', () => {
    it('empties items array', () => {
      const state = cartReducer({ items: [item1, item2] }, cartActions.clearCart())
      expect(state.items).toHaveLength(0)
    })
  })
})
