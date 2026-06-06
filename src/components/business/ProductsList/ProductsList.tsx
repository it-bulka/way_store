import { type FC, useCallback } from 'react'
import cls from './ProductsList.module.scss'
import { ProductCard } from '@/components/ui/ProductCard/ProductCard'
import { ProductCardSkeleton } from '@/components/ui/ProductCardSkeleton/ProductCardSkeleton'
import type { IProduct } from '@/models/goodsType'
import classnames from 'classnames'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '@/hooks/reduxHooks'

interface ProductsListProps {
  className?: string
  products: Array<IProduct>
  title?: string
}

const SKELETON_COUNT = 8

export const ProductsList: FC<ProductsListProps> = ({ className, products, title }) => {
  const loading = useAppSelector(state => state.products.loading)
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
      <div className={classnames(cls.list, { [cls.dimmed]: loading && products.length > 0 })}>
        {loading && products.length === 0
          ? Array.from({ length: SKELETON_COUNT }, (_, i) => <ProductCardSkeleton key={i} />)
          : products.map(({ images, name, price, id }) => (
              <ProductCard
                img={images['white'][0]}
                title={name}
                price={price.amount}
                key={id}
                onClick={onCardClick(id)}
              />
            ))}
      </div>
    </div>
  )
}
