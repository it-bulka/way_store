import { type FC } from 'react'
import cls from './Header.module.scss'
import Logo from '@/assets/logo/logo.svg'
import Heart from '@/assets/general/heart.svg'
import Cart from '@/assets/general/cart.svg'
import Person from '@/assets/general/person.svg'
import { SearchBar } from '@/components/ui/SearchBar/SearchBar'
import classnames from 'classnames'
import { useNavigate } from 'react-router-dom'

interface HeaderProps {
  className?: string
}
export const Header: FC<HeaderProps> = ({ className }) => {
  const navigateTo = useNavigate()

  return (
    <div className={classnames(cls.header, 'container ', [className])}>
      <div className={classnames(cls.logo, 'col-1')}>
        <Logo />
      </div>
      <div className={classnames(cls.searchHolder, 'col-2')}>
        <SearchBar />
      </div>
      <div className={classnames(cls.actions, 'col-3')}>
        <button onClick={() => navigateTo('/account/chosen')}>
          <Heart />
        </button>
        <button onClick={() => navigateTo('/')}>
          <Cart />
        </button>
        <button onClick={() => navigateTo('/account/profile')}>
          <Person />
        </button>
      </div>
    </div>
  )
}
