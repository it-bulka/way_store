import classnames from 'classnames'
import HeartIcon from '@/assets/general/heart.svg'
import { MouseEventHandler, memo } from 'react'
import cls from './LikeButton.module.scss'

interface LikeButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined
  className?: string
  isLiked?: boolean
}
export const LikeButton = memo(({ onClick, className, isLiked = false }: LikeButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={classnames(cls.likeButton, { [cls.active]: isLiked }, [className])}
    >
      <HeartIcon />
    </button>
  )
})

LikeButton.displayName = 'LikeButton'
