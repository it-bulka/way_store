import { type FC, useEffect, useState } from 'react'
import cls from './NavBar.module.scss'
import { AppLink } from '@/components/ui/AppLink/AppLink'
import classnames from 'classnames'
import { useLocation } from 'react-router-dom'

interface NavBarProps {
  className?: string
}
const links = [
  { id: '1', title: 'Домой', path: '/' },
  { id: '2', title: 'Магазін', path: '/store' },
  { id: '3', title: 'КОЛЛЕКЦИИ', path: '/collections' },
  { id: '4', title: 'КОЛЛАБОРАЦИИ', path: '/collaborations' },
  { id: '5', title: 'о нас', path: '/about' },
]
export const NavBar: FC<NavBarProps> = ({ className }) => {
  const [activePage, setActivePage] = useState('/')
  const { pathname } = useLocation()
  const checkPage = () => {
    const pathName = pathname.split('/')[1]
    const path = '/' + pathName
    setActivePage(path)
  }

  useEffect(() => {
    checkPage()
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
