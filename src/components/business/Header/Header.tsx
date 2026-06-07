import { type FC, useCallback, useEffect, useMemo, useState } from 'react'
import cls from './Header.module.scss'
import LogoIcon from '@/assets/logo/logo.svg'
import HeartIcon from '@/assets/general/heart.svg'
import CartIcon from '@/assets/general/cart.svg'
import PersonIcon from '@/assets/general/person.svg'
import { SearchBar } from '@/components/ui/SearchBar/SearchBar'
import classnames from 'classnames'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Cart } from '@/components/ui/Cart/Cart'
import { AuthModal } from '@/components/ui/AuthModal/AuthModal'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { getCartItems } from '@/redux/selectors/cartSelectors'
import { getIsAuthenticated } from '@/redux/selectors/getAuthSelector'
import { signOutUser } from '@/redux/async/signOutUser'
import { useControlModal } from '@/hooks/useControlModal'

interface HeaderProps {
  className?: string
}

export const Header: FC<HeaderProps> = ({ className }) => {
  const {
    isModalOpen: isCartOpen,
    openModal: openCart,
    closeModal: closeCart,
  } = useControlModal(false)
  const {
    isModalOpen: isAuthOpen,
    openModal: openAuth,
    closeModal: closeAuth,
  } = useControlModal(false)

  const items = useAppSelector(getCartItems)
  const isAuthenticated = useAppSelector(getIsAuthenticated)
  const dispatch = useAppDispatch()
  const navigateTo = useNavigate()
  const [searchParams] = useSearchParams()

  const urlQuery = searchParams.get('search') ?? ''
  const [localQuery, setLocalQuery] = useState(urlQuery)

  useEffect(() => {
    setLocalQuery(urlQuery)
  }, [urlQuery])

  const handleSearch = useCallback(
    (query: string) => {
      navigateTo(query.trim() ? `/store?search=${encodeURIComponent(query.trim())}` : '/store')
    },
    [navigateTo]
  )

  const totalAmount = useMemo(() => items.reduce((acc, item) => acc + item.amount, 0), [items])

  const handleSignOut = () => {
    dispatch(signOutUser())
    navigateTo('/')
  }

  return (
    <div className={classnames(cls.header, 'container ', [className])}>
      <div className={classnames(cls.logo, 'col-1')}>
        <LogoIcon />
      </div>
      <div className={classnames(cls.searchHolder, 'col-2')}>
        <SearchBar value={localQuery} onChange={setLocalQuery} onSearch={handleSearch} />
      </div>
      <div className={classnames(cls.actions, 'col-3')}>
        <button onClick={() => navigateTo('/account/chosen')}>
          <HeartIcon />
        </button>
        <button
          onClick={openCart}
          className={classnames(cls.cartBtn, { [cls.active]: !!items.length })}
          aria-label={`Кошик${totalAmount ? `, ${totalAmount} товарів` : ''}`}
        >
          <CartIcon />
          {!!items.length && (
            <p className={cls.items} aria-live="polite" aria-atomic="true">
              {totalAmount}
            </p>
          )}
        </button>
        {isAuthenticated ? (
          <>
            <button onClick={() => navigateTo('/account/profile')}>
              <PersonIcon />
            </button>
            <button className={cls.signOutBtn} onClick={handleSignOut}>
              Вийти
            </button>
          </>
        ) : (
          <button className={cls.signInBtn} onClick={openAuth}>
            Увійти
          </button>
        )}
      </div>

      {isCartOpen && <Cart onClose={closeCart} />}
      <AuthModal isOpened={isAuthOpen} close={closeAuth} overlay="on" />
    </div>
  )
}
