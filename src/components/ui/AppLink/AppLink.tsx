import { type FC, MouseEvent } from 'react'
import { NavLink } from 'react-router-dom'
import cls from './AppLink.module.scss'
import StarIcon from '@/assets/general/star.svg'
import classnames from 'classnames'

interface AppLinkProps {
  className?: string
  title: string
  withDecoration?: boolean
  isActive?: boolean
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void
  path: string
}

export const AppLink: FC<AppLinkProps> = ({
  className,
  title,
  withDecoration = true,
  isActive = false,
  onClick,
  path,
}) => {
  return (
    <li className={classnames(cls.appLink, [className], { [cls.active]: isActive })}>
      <NavLink to={path} onClick={onClick ? onClick : undefined}>
        {withDecoration && (
          <span>
            <StarIcon />
          </span>
        )}
        <span>{title}</span>
      </NavLink>
    </li>
  )
}
