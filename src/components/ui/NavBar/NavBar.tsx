import { type FC, useEffect, useState } from 'react'
import cls from './NavBar.module.scss'
import { AppLink } from '@/components/ui/AppLink/AppLink'
import classnames from 'classnames'
import { useLocation } from 'react-router-dom'
import { APP_ROUTES } from '@/models'

interface NavBarProps {
  className?: string
}
const links = [
  { id: '1', title: 'Головна', path: APP_ROUTES.HOME },
  { id: '2', title: 'Магазин', path: APP_ROUTES.STORE },
  { id: '3', title: 'КОЛЕКЦІЇ', path: APP_ROUTES.COLLECTIONS },
  { id: '4', title: 'КОЛАБОРАЦІЇ', path: APP_ROUTES.COLLABORATIONS },
  { id: '5', title: 'про нас', path: APP_ROUTES.ABOUT },
]
export const NavBar: FC<NavBarProps> = ({ className }) => {
  const [activePage, setActivePage] = useState('/')
  const { pathname } = useLocation()

  useEffect(() => {
    setActivePage('/' + pathname.split('/')[1])
  }, [pathname])
  return (
    <nav className={classnames(cls.navbar, [className])}>
      <ul>
        {links.map(({ id, title, path }) => (
          <AppLink title={title} key={id} path={path} isActive={activePage === path} />
        ))}
      </ul>
    </nav>
  )
}
