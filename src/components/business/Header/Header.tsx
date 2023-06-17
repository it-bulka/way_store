import { type FC, useMemo, useState } from 'react'
import cls from './Header.module.scss'
import LogoIcon from '@/assets/logo/logo.svg'
import HeartIcon from '@/assets/general/heart.svg'
import CartIcon from '@/assets/general/cart.svg'
import PersonIcon from '@/assets/general/person.svg'
import { SearchBar } from '@/components/ui/SearchBar/SearchBar'
import classnames from 'classnames'
import { useNavigate } from 'react-router-dom'
import { Cart } from '@/components/ui/Cart/Cart'
import { useAppSelector } from '@/hooks/reduxHooks'
import { getCartItems } from '@/redux/selectors/cartSelectors'

interface HeaderProps {
  className?: string
}
export const Header: FC<HeaderProps> = ({ className }) => {
  const [isCartShown, setCartShown] = useState(false)
  const items = useAppSelector(getCartItems)
  const navigateTo = useNavigate()

  const totalAmount = useMemo(() => {
    return items.reduce((accum, item) => {
      return accum + item.amount
    }, 0)
  }, [items])

  return (
    <div className={classnames(cls.header, 'container ', [className])}>
      <div className={classnames(cls.logo, 'col-1')}>
        <LogoIcon />
      </div>
      <div className={classnames(cls.searchHolder, 'col-2')}>
        <SearchBar />
      </div>
      <div className={classnames(cls.actions, 'col-3')}>
        <button onClick={() => navigateTo('/account/chosen')}>
          <HeartIcon />
        </button>
        <button
          onClick={() => setCartShown(true)}
          className={classnames(cls.cartBtn, { [cls.active]: !!items.length })}
        >
          <CartIcon />
          {!!items.length && <p className={cls.items}>{totalAmount}</p>}
        </button>
        <button onClick={() => navigateTo('/account/profile')}>
          <PersonIcon />
        </button>
      </div>

      {isCartShown && <Cart onClose={() => setCartShown(false)} />}
    </div>
  )
}
