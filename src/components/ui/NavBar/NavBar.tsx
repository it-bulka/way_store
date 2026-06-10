import { type FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import cls from './NavBar.module.scss'
import { AppLink } from '@/components/ui/AppLink/AppLink'
import classnames from 'classnames'
import { useLocation } from 'react-router-dom'
import { APP_ROUTES } from '@/models'

interface NavBarProps {
  className?: string
}

export const NavBar: FC<NavBarProps> = ({ className }) => {
  const { t } = useTranslation('common')
  const [activePage, setActivePage] = useState('/')
  const { pathname } = useLocation()

  useEffect(() => {
    setActivePage('/' + pathname.split('/')[1])
  }, [pathname])

  const links = [
    { id: '1', title: t('nav.home'), path: APP_ROUTES.HOME },
    { id: '2', title: t('nav.store'), path: APP_ROUTES.STORE },
    { id: '3', title: t('nav.collections'), path: APP_ROUTES.COLLECTIONS },
    { id: '4', title: t('nav.collaborations'), path: APP_ROUTES.COLLABORATIONS },
    { id: '5', title: t('nav.about'), path: APP_ROUTES.ABOUT },
  ]

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
