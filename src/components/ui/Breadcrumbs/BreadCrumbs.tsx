import { type FC, useMemo } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import cls from './BreadCrumbs.module.scss'
import classnames from 'classnames'
import { useLocation } from 'react-router-dom'

interface BreadCrumbsProps {
  className?: string
  lastLabel?: string
}

export const BreadCrumbs: FC<BreadCrumbsProps> = ({ className, lastLabel }) => {
  const { t } = useTranslation('common')
  const locations = useLocation()

  const PAGE_LABELS = useMemo<Record<string, string>>(
    () => ({
      '/': t('breadcrumbs.home'),
      '/account': t('breadcrumbs.account'),
      '/account/profile': t('breadcrumbs.profile'),
      '/account/purchase-history': t('breadcrumbs.purchaseHistory'),
      '/account/chosen': t('breadcrumbs.chosen'),
      '/about': t('breadcrumbs.about'),
      '/checkout': t('breadcrumbs.checkout'),
      '/checkout/success': t('breadcrumbs.checkoutSuccess'),
      '/store': t('breadcrumbs.store'),
    }),
    [t]
  )

  let current = ''
  const othersCrumbs = locations.pathname
    .split('/')
    .filter(crumb => crumb !== '')
    .map(crumb => (current += '/' + crumb))
  const crumbs = ['/', ...othersCrumbs]

  return (
    <ul className={classnames(cls.breadcrumbs, [className])}>
      {crumbs.map((item, order) => {
        if (order === crumbs.length - 1) {
          return <li key={item}>{lastLabel ?? PAGE_LABELS[item] ?? item.split('/').pop()}</li>
        }

        return (
          <li key={item}>
            <NavLink to={item}>{PAGE_LABELS[item]}</NavLink>
          </li>
        )
      })}
    </ul>
  )
}
