import { type FC } from 'react'
import cls from './Header.module.scss'
import Logo from '@/assets/logo/logo.svg'
import Heart from '@/assets/general/heart.svg'
import Cart from '@/assets/general/cart.svg'
import Person from '@/assets/general/person.svg'
import { SearchBar } from '@/components/ui/SearchBar/SearchBar'

interface HeaderProps {
  className?: string
}
export const Header: FC<HeaderProps> = ({ className = '' }) => {
  return (
    <div className={cls.header + ' container ' + className}>
      <div className={`${cls.logo} col-1`}>
        <Logo />
      </div>
      <div className={`${cls.searchHolder} col-2`}>
        <SearchBar />
      </div>
      <div className={`${cls.actions} col-3`}>
        <span>
          <Heart />
        </span>
        <span>
          <Cart />
        </span>
        <span>
          <Person />
        </span>
      </div>
    </div>
  )
}
