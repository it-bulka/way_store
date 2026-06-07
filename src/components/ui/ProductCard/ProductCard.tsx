import { type FC, type KeyboardEvent, type MouseEvent, useCallback } from 'react'
import cls from './ProductCard.module.scss'
import classnames from 'classnames'

interface ProductCardProps {
  img: string
  title: string
  price: number
  className?: string
  onClick?: () => void
  onAddToCart?: () => void
  onAddToFavorites?: () => void
}

export const ProductCard: FC<ProductCardProps> = ({
  className,
  img,
  title,
  price,
  onClick,
  onAddToCart,
  onAddToFavorites,
}) => {
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
      onKeyDown={onKeyDown}
      tabIndex={-1}
    >
      <div className={cls.imgWrapper}>
        <img src={img} alt="product" loading="lazy" />
      </div>

      <div className={cls.actions}>
        <button onClick={stopAndCall(onAddToCart)}>В кошик</button>
        <button onClick={stopAndCall(onAddToFavorites)}>В обране</button>
      </div>

      <div className={cls.content}>
        <p>{title}</p>
        <p>Price ${price}</p>
      </div>
    </div>
  )
}
