import { type FC, useRef, useEffect } from 'react'
import cls from './Header.module.scss'
import LogoIcon from '@/assets/logo/logo.svg'
import HeartIcon from '@/assets/general/heart.svg'
import { SearchContainer } from '@/components/business/SearchContainer/SearchContainer'
import { BurgerMenu } from '@/components/ui/BurgerMenu/BurgerMenu'
import { CartButton } from './CartButton'
import { HeaderAuthControls } from './HeaderAuthControls'
import classnames from 'classnames'
import { useNavigate } from 'react-router-dom'

interface HeaderProps {
  className?: string
}

export const Header: FC<HeaderProps> = ({ className }) => {
  const navigateTo = useNavigate()
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
          <CartButton />
          <HeaderAuthControls />
        </div>
      </div>
    </header>
  )
}
