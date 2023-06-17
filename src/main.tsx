import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router.tsx'
import { CookiesProvider } from 'react-cookie'
import '@/styles/index.scss'
import { Loader } from '@/components/ui/Loader/Loader'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <CookiesProvider>
        <Suspense fallback={<Loader />}>
          <RouterProvider router={router} />
        </Suspense>
      </CookiesProvider>
    </Provider>
  </React.StrictMode>
)
