import { type FC, MouseEvent } from 'react'
import cls from './AppLink.module.scss'
import StarIcon from '@/assets/general/star.svg'
import classnames from 'classnames'

interface AppLinkProps {
  className?: string
  title: string
  withDecoration?: boolean
  isActive?: boolean
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void
}

export const AppLink: FC<AppLinkProps> = ({
  className,
  title,
  withDecoration = true,
  isActive = false,
  onClick,
}) => {
  return (
    <li className={classnames(cls.appLink, [className], { [cls.active]: isActive })}>
      <a
        onClick={e => {
          e.preventDefault()
          onClick?.(e)
        }}
        href={'@'}
      >
        {withDecoration && (
          <span>
            <StarIcon />
          </span>
        )}
        <span>{title}</span>
      </a>
    </li>
  )
}
