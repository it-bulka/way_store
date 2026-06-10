import { describe, it, expect } from 'vitest'
import { productsReducer, productsAction } from './productsSlice'
import { fetchProducts } from '@/redux/async/fetchProducts'
import { syncChosen } from '@/redux/async/syncChosen'
import type { IProductsSlice } from './productsSlice'
import type { IProduct } from '@/models/goodsType'

const base: IProductsSlice = { products: [], chosen: [], loading: false, error: null }

const mockProduct: IProduct = {
  id: 'p1',
  category: 'rings',
  name: 'Gold Ring',
  prev: null,
  price: { amount: 500, currency: 'UAH' },
  metal: ['gold'],
  stones: [],
  material: 'gold',
  weight: { num: 3.5, measurement: 'г' },
  color: 'yellow',
  images: { white: [], rose: [], yellow: ['img.jpg'] },
}

const arg = { collection: 'rings' as const }

describe('productsSlice — sync reducers', () => {
  it('setProducts replaces products array', () => {
    const state = productsReducer(
      { ...base, products: [mockProduct] },
      productsAction.setProducts([])
    )
    expect(state.products).toHaveLength(0)
  })

  it('appendProducts adds to existing list', () => {
    const state = productsReducer(
      { ...base, products: [mockProduct] },
      productsAction.appendProducts([{ ...mockProduct, id: 'p2' }])
    )
    expect(state.products).toHaveLength(2)
  })

  it('addChosen appends to chosen', () => {
    const state = productsReducer(base, productsAction.addChosen(mockProduct))
    expect(state.chosen).toHaveLength(1)
    expect(state.chosen[0].id).toBe('p1')
  })

  it('deleteChosen removes by id', () => {
    const state = productsReducer(
      { ...base, chosen: [mockProduct] },
      productsAction.deleteChosen('p1')
    )
    expect(state.chosen).toHaveLength(0)
  })
})

describe('productsSlice — fetchProducts thunk states', () => {
  it('pending: sets loading true, clears error', () => {
    const state = productsReducer({ ...base, error: 'old' }, fetchProducts.pending('id', arg))
    expect(state.loading).toBe(true)
    expect(state.error).toBeNull()
  })

  it('fulfilled: sets products, clears loading', () => {
    const state = productsReducer(
      { ...base, loading: true },
      fetchProducts.fulfilled([mockProduct], 'id', arg)
    )
    expect(state.loading).toBe(false)
    expect(state.products).toEqual([mockProduct])
  })

  it('rejected: sets error, clears loading', () => {
    const state = productsReducer(
      { ...base, loading: true },
      fetchProducts.rejected(null, 'id', arg, 'Network error')
    )
    expect(state.loading).toBe(false)
    expect(state.error).toBe('Network error')
  })
})

describe('productsSlice — syncChosen thunk states', () => {
  it('fulfilled: replaces chosen', () => {
    const state = productsReducer(
      { ...base, chosen: [mockProduct] },
      syncChosen.fulfilled([], 'id', 'u1')
    )
    expect(state.chosen).toHaveLength(0)
  })
})
