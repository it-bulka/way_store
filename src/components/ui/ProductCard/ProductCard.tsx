import { type FC, type KeyboardEvent, type MouseEvent, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import cls from './ProductCard.module.scss'
import classnames from 'classnames'
import { LikeButton } from '@/components/ui/LikeButton/LikeButton.tsx'

interface ProductCardProps {
  img: string
  title: string
  price: number
  className?: string
  onClick?: () => void
  onAddToCart?: () => void
  onAddToFavorites?: () => void
  isChosen?: boolean
}

export const ProductCard: FC<ProductCardProps> = ({
  className,
  img,
  title,
  price,
  onClick,
  //onAddToCart,
  onAddToFavorites,
  isChosen,
}) => {
  const { t } = useTranslation('cart')

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLElement>) => {
      if (e.key === 'Enter') onClick?.()
    },
    [onClick]
  )

  const stopAndCall = (cb?: () => void) => (e: MouseEvent) => {
    e.stopPropagation()
    cb?.()
  }

  return (
    <div
      className={classnames(cls.productCard, [className])}
      onClick={() => onClick?.()}
      role="button"
      aria-label={title}
      onKeyDown={onKeyDown}
      tabIndex={0}
    >
      <LikeButton
        className={cls.favoriteBtn}
        onClick={stopAndCall(onAddToFavorites)}
        isLiked={isChosen}
      />
      <div className={cls.imageWrapper}>
        <img
          src={img}
          alt={title}
          loading="lazy"
          onError={e => {
            const el = e.currentTarget as HTMLImageElement
            el.onerror = null
            el.src =
              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%23f0f0f0'/%3E%3C/svg%3E"
          }}
        />
      </div>

      <div className={cls.content}>
        <h3>{title}</h3>
        <p className={cls.price}>
          {price} {t('currency')}
        </p>
      </div>
    </div>
  )
}
