import { type FC, memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
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
import { useToast } from '@/context/ToastContext'
import { NotAuthModal } from '@/components/ui/NotAuthModal/NotAuthModal'
import { buildDefaultCartItem } from '@/utils/buildDefaultCartItem'
import { useLikeProduct } from '@/components/business/LikeProductButton/model/hooks/useLikeProduct.tsx'

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

export const ProductsList: FC<ProductsListProps> = memo(
  ({
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
    const { t } = useTranslation('store')
    const { onAddToFavorites, chosenIds, isRestrictModalOpen, closeRestrictModal } =
      useLikeProduct()

    const onCardClick = useCallback(
      (product: IProduct) => () => navigateTo(`/store/${product.id}?category=${product.category}`),
      [navigateTo]
    )

    const onAddToCart = useCallback(
      (product: IProduct) => () => {
        dispatch(cartActions.addItem(buildDefaultCartItem(product)))
        addToast('Додано до кошика', 'success')
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
                  onClick={onCardClick(product)}
                  onAddToCart={onAddToCart(product)}
                  onAddToFavorites={onAddToFavorites(product)}
                  isChosen={chosenIds.has(product.id)}
                />
              ))}
        </div>
        {!loading && hasMore && (
          <div className={cls.loadMore}>
            {loadingMore ? <Loader /> : <Button title={t('showMore')} onClick={loadMore} />}
          </div>
        )}
        <NotAuthModal isOpened={isRestrictModalOpen} close={closeRestrictModal} overlay="on" />
      </div>
    )
  }
)

ProductsList.displayName = 'ProductsList'
