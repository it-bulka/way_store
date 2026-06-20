import { type FC, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import classnames from 'classnames'
import cls from './BurgerMenu.module.scss'
import { NavBar } from '@/components/ui/NavBar/NavBar'

export const BurgerMenu: FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      <button
        className={classnames(cls.burger, { [cls.open]: isOpen })}
        onClick={() => setIsOpen(v => !v)}
        aria-label={isOpen ? 'Закрити меню' : 'Відкрити меню'}
        aria-expanded={isOpen}
      >
        <span className={cls.line} />
        <span className={cls.line} />
        <span className={cls.line} />
      </button>
      <div className={classnames(cls.overlay, { [cls.open]: isOpen })} aria-hidden="true">
        <nav className={classnames(cls.burgerNav, { [cls.open]: isOpen })} aria-hidden={!isOpen}>
          <NavBar />
        </nav>
      </div>
    </>
  )
}
