import { type FC } from 'react'
import cls from './ProductCard.module.scss'

export interface IProduct {
  img: string
  title: string
  price: number
  id: string
}

type IProd = Omit<IProduct, 'id'>

interface ProductCardProps extends IProd {
  className?: string
}

export const ProductCard: FC<ProductCardProps> = ({ className = '', img, title, price }) => {
  return (
    <div className={cls.productCard + ' ' + className}>
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
