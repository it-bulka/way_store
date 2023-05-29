import { type FC } from 'react'
import cls from './Sidebar.module.scss'
import { NavBar } from '@/components/ui/NavBar/NavBar'

interface SidebarProps {
  className?: string
}

export const Sidebar: FC<SidebarProps> = ({ className = '' }) => {
  return (
    <aside className={cls.sidebar + ' ' + className}>
      <NavBar />
    </aside>
  )
}
