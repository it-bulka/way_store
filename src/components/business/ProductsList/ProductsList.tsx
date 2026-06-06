import { type FC, useCallback } from 'react'
import cls from './ProductsList.module.scss'
import { ProductCard } from '@/components/ui/ProductCard/ProductCard'
import { ProductCardSkeleton } from '@/components/ui/ProductCardSkeleton/ProductCardSkeleton'
import type { IProduct } from '@/models/goodsType'
import classnames from 'classnames'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { cartActions } from '@/redux/reducers/cartSlice'
import { productsAction } from '@/redux/reducers/productsSlice'

interface ProductsListProps {
  className?: string
  products: Array<IProduct>
  title?: string
}

const SKELETON_COUNT = 8

export const ProductsList: FC<ProductsListProps> = ({ className, products, title }) => {
  const loading = useAppSelector(state => state.products.loading)
  const navigateTo = useNavigate()
  const dispatch = useAppDispatch()

  const onCardClick = useCallback(
    (id: string) => () => navigateTo(`/store/${id}`),
    [navigateTo]
  )

  const onAddToCart = useCallback(
    (product: IProduct) => () => {
      dispatch(cartActions.addItem({
        id: product.id,
        title: product.name,
        amount: 1,
        price: product.price.amount,
        img: product.images['white'][0],
      }))
    },
    [dispatch]
  )

  const onAddToFavorites = useCallback(
    (product: IProduct) => () => {
      dispatch(productsAction.addChosen(product))
    },
    [dispatch]
  )

  return (
    <div className={classnames(cls.productsList, [className])}>
      {title && <h3 className={cls.title}>{title}</h3>}
      <div className={classnames(cls.list, { [cls.dimmed]: loading && products.length > 0 })}>
        {loading && products.length === 0
          ? Array.from({ length: SKELETON_COUNT }, (_, i) => <ProductCardSkeleton key={i} />)
          : products.map(product => (
              <ProductCard
                key={product.id}
                img={product.images['white'][0]}
                title={product.name}
                price={product.price.amount}
                onClick={onCardClick(product.id)}
                onAddToCart={onAddToCart(product)}
                onAddToFavorites={onAddToFavorites(product)}
              />
            ))}
      </div>
    </div>
  )
}
