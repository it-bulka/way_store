import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router.tsx'
import { CookiesProvider } from 'react-cookie'
import '@/styles/index.scss'
import { Loader } from '@/components/ui/Loader/Loader'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CookiesProvider>
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
      </Suspense>
    </CookiesProvider>
  </React.StrictMode>
)
