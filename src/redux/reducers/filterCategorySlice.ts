import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { MetalsType, StoneType, ProductType } from '@/models'

export interface IFilters {
  metal?: MetalsType[]
  stones?: StoneType[]
  product?: ProductType[]
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
