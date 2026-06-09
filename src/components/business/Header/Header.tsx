import { type FC, useMemo, useRef, useEffect } from 'react'
import cls from './Header.module.scss'
import LogoIcon from '@/assets/logo/logo.svg'
import HeartIcon from '@/assets/general/heart.svg'
import CartIcon from '@/assets/general/cart.svg'
import PersonIcon from '@/assets/general/person.svg'
import { SearchContainer } from '@/components/business/SearchContainer/SearchContainer'
import { BurgerMenu } from '@/components/ui/BurgerMenu/BurgerMenu'
import classnames from 'classnames'
import { useNavigate } from 'react-router-dom'
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

  const totalAmount = useMemo(() => items.reduce((acc, item) => acc + item.amount, 0), [items])

  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = headerRef.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => {
      document.documentElement.style.setProperty('--header-height', `${entry.contentRect.height}px`)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const handleSignOut = () => {
    dispatch(signOutUser())
    navigateTo('/')
  }

  return (
    <header className={cls.root} ref={headerRef}>
      <div className={classnames(cls.header, 'container ', [className])}>
        <div className={cls.burgerHolder}>
          <BurgerMenu />
        </div>
        <div className={classnames(cls.logo, 'col-1')}>
          <LogoIcon />
        </div>
        <SearchContainer className={classnames(cls.searchHolder, 'col-2')} />
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
    </header>
  )
}
