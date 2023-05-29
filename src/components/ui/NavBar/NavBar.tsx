import { type FC } from 'react'
import cls from './NavBar.module.scss'
import { AppLink } from '@/components/ui/AppLink/AppLink'

interface NavBarProps {
  className?: string
}
const links = [
  { id: '1', title: 'Домой' },
  { id: '2', title: 'Магазін' },
  { id: '3', title: 'КОЛЛЕКЦИИ' },
  { id: '4', title: 'КОЛЛАБОРАЦИИ' },
  { id: '5', title: 'о нас' },
]
export const NavBar: FC<NavBarProps> = ({ className = '' }) => {
  return (
    <nav className={cls.navbar + ' ' + className}>
      <ul>
        {links.map(({ id, title }) => (
          <AppLink title={title} key={id} />
        ))}
      </ul>
    </nav>
  )
}
