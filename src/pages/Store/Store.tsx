import { type FC } from 'react'
import cls from './Store.module.scss'
import { Sidebar } from '@/components/ui/Sidebar/Sidebar'
import { Products } from '@/components/business/Products/Products'

interface StoreProps {
  className?: string
}
export const Store: FC<StoreProps> = ({ className = '' }) => {
  return (
    <main className={cls.store + ' flex-container container ' + className}>
      <Sidebar className=" col-1" />
      <Products className="col-2" />
    </main>
  )
}
