import { type FC, KeyboardEvent, useCallback } from 'react'
import cls from './ProductCard.module.scss'
import classnames from 'classnames'

interface IProduct {
  img: string
  title: string
  price: number
  id: string
  onClick?: () => void
}

type IProd = Omit<IProduct, 'id'>

interface ProductCardProps extends IProd {
  className?: string
}

export const ProductCard: FC<ProductCardProps> = ({ className, img, title, price, onClick }) => {
  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLElement>) => {
      if (e.key === 'Enter') {
        onClick?.()
      }
    },
    [onClick]
  )
  return (
    <div
      className={classnames(cls.productCard, [className])}
      onClick={() => onClick?.()}
      role={'button'}
      onKeyDown={onKeyDown}
      tabIndex={-1}
    >
      <div>
        <img src={img} alt="product" />
      </div>
      <div className={cls.content}>
        <p>{title}</p>
        <p>Price ${price}</p>
      </div>
    </div>
  )
}
