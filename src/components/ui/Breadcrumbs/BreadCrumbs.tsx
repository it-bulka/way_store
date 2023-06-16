import { type FC } from 'react'
import { NavLink } from 'react-router-dom'
import cls from './BreadCrumbs.module.scss'
import classnames from 'classnames'
import { useLocation } from 'react-router-dom'
import { PAGES } from '@/data/pages'

interface BreadCrumbsProps {
  className?: string
}

export const BreadCrumbs: FC<BreadCrumbsProps> = ({ className }) => {
  const locations = useLocation()
  console.log({ locations })
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
          return <li key={item}>{PAGES[item]}</li>
        }

        return (
          <li key={item}>
            <NavLink to={item}>{PAGES[item]}</NavLink>
          </li>
        )
      })}
    </ul>
  )
}
