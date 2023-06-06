import { type FC } from 'react'
import cls from './AppLink.module.scss'
import StarIcon from '@/assets/general/star.svg'

interface AppLinkProps {
  className?: string
  title: string
  withDecoration?: boolean
}

export const AppLink: FC<AppLinkProps> = ({ className = '', title, withDecoration = true }) => {
  return (
    <li className={cls.appLink + ' ' + cls.active + ' ' + className}>
      {withDecoration && (
        <span>
          <StarIcon />
        </span>
      )}
      <span>{title}</span>
    </li>
  )
}
