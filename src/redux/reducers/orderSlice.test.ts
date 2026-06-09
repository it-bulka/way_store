import { describe, it, expect } from 'vitest'
import { orderReducer, orderActions } from './orderSlice'
import { createOrder } from '@/redux/async/createOrder'
import type { IOrder } from '@/models/orderType'

const base = { orders: [], loading: false, error: null }

const mockOrder: IOrder = {
  id: 'o1',
  orderNumber: 'ORD-001',
  date: new Date('2024-01-01'),
  status: 'pending',
  items: [{ id: 'i1', title: 'Ring', amount: 1, price: 500, img: '' }],
  deliveryType: 'ДО ДВЕРЕЙ',
  paymentType: 'ОНЛАЙН',
  recipient: { name: 'Test User', phone: '+380671234567' },
  address: { city: 'Kyiv', street: 'Main', home: 1, apartment: '1' },
}

const orderArg: Omit<IOrder, 'id'> = {
  orderNumber: 'ORD-001',
  date: new Date('2024-01-01'),
  status: 'pending',
  items: [{ id: 'i1', title: 'Ring', amount: 1, price: 500, img: '' }],
  deliveryType: 'ДО ДВЕРЕЙ',
  paymentType: 'ОНЛАЙН',
  recipient: { name: 'Test User', phone: '+380671234567' },
  address: { city: 'Kyiv', street: 'Main', home: 1, apartment: '1' },
}

describe('orderSlice — sync reducers', () => {
  it('addOrder appends to orders list', () => {
    const state = orderReducer(base, orderActions.addOrder(mockOrder))
    expect(state.orders).toHaveLength(1)
    expect(state.orders[0].id).toBe('o1')
  })
})

describe('orderSlice — createOrder thunk states', () => {
  it('pending: sets loading, clears error', () => {
    const state = orderReducer({ ...base, error: 'old' }, createOrder.pending('id', orderArg))
    expect(state.loading).toBe(true)
    expect(state.error).toBeNull()
  })

  it('fulfilled: pushes order and clears loading', () => {
    const state = orderReducer(
      { ...base, loading: true },
      createOrder.fulfilled(mockOrder, 'id', orderArg)
    )
    expect(state.loading).toBe(false)
    expect(state.orders).toHaveLength(1)
    expect(state.orders[0]).toEqual(mockOrder)
  })

  it('rejected: sets error, clears loading', () => {
    const state = orderReducer(
      { ...base, loading: true },
      createOrder.rejected(null, 'id', orderArg, 'Not authorized')
    )
    expect(state.loading).toBe(false)
    expect(state.error).toBe('Not authorized')
  })
})
