import { RootState } from '@/redux/store'

export const getChosenProducts = (state: RootState) => state.products.chosen
