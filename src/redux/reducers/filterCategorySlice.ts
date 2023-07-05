import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { MetalsType, StoneType, ProductType } from '@/models'

export type FilterPrice = Record<'min' | 'max', number>
export interface IFilters {
  metal?: MetalsType[]
  stones?: StoneType[]
  product?: ProductType[]
  price?: FilterPrice
}
interface IState {
  filters: IFilters
}
const initialState: IState = {
  filters: {},
}

const filterCategorySlice = createSlice({
  name: 'filterCategory',
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<IFilters>) => {
      state.filters = action.payload
    },
  },
})

export const { reducer: FilterCategoryReducer, actions: FilterActions } = filterCategorySlice
