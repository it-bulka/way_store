import { type FC, ReactNode } from 'react'
import { Header } from '@/components/business/Header/Header'
import { Footer } from '@/components/business/Footer/Footer'
import { Sidebar } from '@/components/ui/Sidebar/Sidebar'

interface LayoutProps {
  children: ReactNode
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main className={'flex-container container'}>
        <Sidebar className=" col-1" />
        <div className="col-2">{children}</div>
      </main>
      <Footer />
    </>
  )
}
