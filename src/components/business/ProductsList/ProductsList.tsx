import { type FC, useCallback } from 'react'
import cls from './ProductsList.module.scss'
import { ProductCard } from '@/components/ui/ProductCard/ProductCard'
import type { IProduct } from '@/models/goodsType'
import classnames from 'classnames'
import { useNavigate } from 'react-router-dom'

interface ProductsListProps {
  className?: string
  products: Array<IProduct>
  title?: string
}
export const ProductsList: FC<ProductsListProps> = ({ className, products, title }) => {
  const navigateTo = useNavigate()

  const onCardClick = useCallback(
    (id: string) => () => {
      navigateTo(`/store/${id}`)
    },
    [navigateTo]
  )
  return (
    <div className={classnames(cls.productsList, [className])}>
      {title && <h3 className={cls.title}>{title}</h3>}
      <div className={cls.list}>
        {products.map(({ images, name, price, id }) => {
          return (
            <ProductCard
              img={images['white'][0]}
              title={name}
              price={price.amount}
              key={id}
              onClick={onCardClick(id)}
            />
          )
        })}
      </div>
    </div>
  )
}
