import { Outlet, ScrollRestoration } from 'react-router-dom'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/base/firebase'
import { useAppDispatch } from '@/hooks/reduxHooks'
import { setUser, clearUser, setInitialized } from '@/redux/reducers/authSlice'
import { syncCartOnLogin, restoreGuestCart } from '@/redux/async/syncCart'
import { ToastProvider } from '@/context/ToastContext'
import { ToastContainer } from '@/components/ui/ToastContainer/ToastContainer'

function AuthListener() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        dispatch(setUser({ uid: user.uid, email: user.email }))
        dispatch(syncCartOnLogin(user.uid))
      } else {
        dispatch(clearUser())
        dispatch(restoreGuestCart())
      }
      dispatch(setInitialized())
    })
    return unsubscribe
  }, [dispatch])

  return null
}

export function App() {
  return (
    <ToastProvider>
      <div className="app">
        <AuthListener />
        <ScrollRestoration />
        <Outlet />
        <ToastContainer />
      </div>
    </ToastProvider>
  )
}
