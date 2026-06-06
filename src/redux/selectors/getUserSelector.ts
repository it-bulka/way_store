import { RootState } from '@/redux/store.ts'

export const getUserSelector = (state: RootState) => state.user.user
