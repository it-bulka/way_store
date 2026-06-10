import { describe, it, expect } from 'vitest'
import { FilterCategoryReducer, FilterActions, type IFilters } from './filterCategorySlice'

const base = { filters: {} }

describe('filterCategorySlice', () => {
  describe('addCategory', () => {
    it('sets metal filter', () => {
      const filters: IFilters = { metal: ['gold'] }
      const state = FilterCategoryReducer(base, FilterActions.addCategory(filters))
      expect(state.filters.metal).toEqual(['gold'])
    })

    it('replaces previous filters entirely', () => {
      const first = FilterCategoryReducer(
        base,
        FilterActions.addCategory({ metal: ['gold'], stones: ['diamonds'] })
      )
      const second = FilterCategoryReducer(first, FilterActions.addCategory({ product: ['rings'] }))
      expect(second.filters.metal).toBeUndefined()
      expect(second.filters.product).toEqual(['rings'])
    })

    it('sets price filter', () => {
      const filters: IFilters = { price: { min: 100, max: 500 } }
      const state = FilterCategoryReducer(base, FilterActions.addCategory(filters))
      expect(state.filters.price).toEqual({ min: 100, max: 500 })
    })
  })
})
