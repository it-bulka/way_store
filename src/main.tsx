import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router.tsx'
import { CookiesProvider } from 'react-cookie'
import '@/i18n/config'
import '@/styles/index.scss'
import { Loader } from '@/components/ui/Loader/Loader'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary/ErrorBoundary'
import { HelmetProvider } from 'react-helmet-async'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <CookiesProvider>
          <ErrorBoundary>
            <Suspense fallback={<Loader />}>
              <RouterProvider router={router} />
            </Suspense>
          </ErrorBoundary>
        </CookiesProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
)
