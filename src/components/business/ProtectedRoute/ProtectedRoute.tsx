import { type FC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '@/hooks/reduxHooks'
import { getIsAuthenticated, getAuthInitializing } from '@/redux/selectors/getAuthSelector'

export const ProtectedRoute: FC = () => {
  const isAuthenticated = useAppSelector(getIsAuthenticated)
  const initializing = useAppSelector(getAuthInitializing)
  if (initializing) return null
  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />
}
