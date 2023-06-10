import { type FC } from 'react'
import cls from './BreadCrumbs.module.scss'
import classnames from 'classnames'

interface BreadCrumbsProps {
  className?: string
  crumbs: string[]
}

export const BreadCrumbs: FC<BreadCrumbsProps> = ({ className, crumbs }) => {
  return (
    <ul className={classnames(cls.breadcrumbs, [className])}>
      {crumbs.map((item, order) => {
        if (order === crumbs.length - 1) {
          return <li key={item}>{item}</li>
        }

        return (
          <li key={item}>
            <a href={item} onClick={e => e.preventDefault()}>
              {item}
            </a>
          </li>
        )
      })}
    </ul>
  )
}
