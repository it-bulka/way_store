import { Outlet } from 'react-router-dom'
import { Header } from '@/components/business/Header/Header'
import { Footer } from '@/components/business/Footer/Footer'
import { Sidebar } from '@/components/ui/Sidebar/Sidebar'
import { ReactNode } from 'react'

interface LayoutProps {
  children?: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <main className={'flex-container container flex-grow'}>
        <Sidebar className=" col-1" />
        <div className="col-2">{children || <Outlet />}</div>
      </main>
      <Footer />
    </>
  )
}
