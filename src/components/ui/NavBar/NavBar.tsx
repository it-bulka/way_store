import { type FC } from 'react'
import cls from './NavBar.module.scss'
import { AppLink } from '@/components/ui/AppLink/AppLink'
import classnames from 'classnames'

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
  return (
    <nav className={classnames(cls.navbar, [className])}>
      <ul>
        {links.map(({ id, title, path }) => (
          <AppLink title={title} key={id} path={path} />
        ))}
      </ul>
    </nav>
  )
}
