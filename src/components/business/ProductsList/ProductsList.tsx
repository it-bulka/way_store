import { type FC, memo, useCallback } from 'react'
import cls from './ProductsList.module.scss'
import { ProductCard } from '@/components/ui/ProductCard/ProductCard'
import { ProductCardSkeleton } from '@/components/ui/ProductCardSkeleton/ProductCardSkeleton'
import { Button } from '@/components/ui/Button/Button'
import { Loader } from '@/components/ui/Loader/Loader'
import type { IProduct, ringsColors } from '@/models/goodsType'
import classnames from 'classnames'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/hooks/reduxHooks'
import { cartActions } from '@/redux/reducers/cartSlice'
import { productsAction } from '@/redux/reducers/productsSlice'
import { useToast } from '@/context/ToastContext'

interface ProductsListProps {
  className?: string
  products: Array<IProduct>
  title?: string
  loading?: boolean
  loadMore?: () => void
  hasMore?: boolean
  loadingMore?: boolean
}

const SKELETON_COUNT = 8

const firstImg = (images: IProduct['images']): string =>
  (['white', 'rose', 'yellow'] as ringsColors[]).map(c => images[c][0]).find(Boolean) ?? ''

export const ProductsList: FC<ProductsListProps> = memo(({
  className,
  products,
  title,
  loading = false,
  loadMore,
  hasMore = false,
  loadingMore = false,
}) => {
  const navigateTo = useNavigate()
  const dispatch = useAppDispatch()
  const { addToast } = useToast()

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
        img: firstImg(product.images),
      }))
      addToast('Додано до кошика', 'success')
    },
    [dispatch, addToast]
  )

  const onAddToFavorites = useCallback(
    (product: IProduct) => () => {
      dispatch(productsAction.addChosen(product))
      addToast('Додано до обраного', 'success')
    },
    [dispatch, addToast]
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
                img={firstImg(product.images)}
                title={product.name}
                price={product.price.amount}
                onClick={onCardClick(product.id)}
                onAddToCart={onAddToCart(product)}
                onAddToFavorites={onAddToFavorites(product)}
              />
            ))}
      </div>
      {!loading && hasMore && (
        <div className={cls.loadMore}>
          {loadingMore ? (
            <Loader />
          ) : (
            <Button title="Показати ще" onClick={loadMore} />
          )}
        </div>
      )}
    </div>
  )
})

ProductsList.displayName = 'ProductsList'
