import { RootState } from '@/redux/store.ts'

export const getFilterCategories = (state: RootState) => state.filterCategory?.filters
