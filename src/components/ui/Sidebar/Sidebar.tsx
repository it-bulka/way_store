import { type FC } from 'react'
import cls from './Sidebar.module.scss'
import { NavBar } from '@/components/ui/NavBar/NavBar'
import classnames from 'classnames'

interface SidebarProps {
  className?: string
}

export const Sidebar: FC<SidebarProps> = ({ className }) => {
  return (
    <aside className={classnames(cls.sidebar, [className])}>
      <NavBar />
    </aside>
  )
}
