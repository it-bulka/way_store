import type { RootState } from '@/redux/store'

export const getIsAuthenticated = (state: RootState) => state.auth.isAuthenticated
export const getCurrentUser = (state: RootState) => state.auth
export const getAuthLoading = (state: RootState) => state.auth.loading
export const getAuthError = (state: RootState) => state.auth.error
export const getAuthUid = (state: RootState) => state.auth.uid
