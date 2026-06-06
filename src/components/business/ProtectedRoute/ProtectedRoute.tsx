import { type FC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '@/hooks/reduxHooks'
import { getIsAuthenticated } from '@/redux/selectors/getAuthSelector'

export const ProtectedRoute: FC = () => {
  const isAuthenticated = useAppSelector(getIsAuthenticated)
  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />
}
