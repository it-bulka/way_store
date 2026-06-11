import { type FC, memo, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import cls from './ProductsList.module.scss'
import { ProductCard } from '@/components/ui/ProductCard/ProductCard'
import { ProductCardSkeleton } from '@/components/ui/ProductCardSkeleton/ProductCardSkeleton'
import { Button } from '@/components/ui/Button/Button'
import { Loader } from '@/components/ui/Loader/Loader'
import type { IProduct, ringsColors } from '@/models/goodsType'
import classnames from 'classnames'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { cartActions } from '@/redux/reducers/cartSlice'
import { productsAction } from '@/redux/reducers/productsSlice'
import { useToast } from '@/context/ToastContext'
import { useControlModal } from '@/hooks/useControlModal'
import { getIsAuthenticated } from '@/redux/selectors/getAuthSelector'
import { getChosenProducts } from '@/redux/selectors/getChosenProducts'
import { NotAuthModal } from '@/components/ui/NotAuthModal/NotAuthModal'
import { buildDefaultCartItem } from '@/utils/buildDefaultCartItem'

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
    const isAuthenticated = useAppSelector(getIsAuthenticated)
    const chosen = useAppSelector(getChosenProducts)
    const chosenIds = useMemo(() => new Set(chosen.map(p => p.id)), [chosen])
    const { isModalOpen, openModal, closeModal } = useControlModal(false)
    const { t } = useTranslation('store')

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

    const onAddToFavorites = useCallback(
      (product: IProduct) => () => {
        if (!isAuthenticated) {
          openModal()
          return
        }
        if (chosenIds.has(product.id)) {
          dispatch(productsAction.deleteChosen(product.id))
          addToast('Видалено з обраного', 'info')
        } else {
          dispatch(productsAction.addChosen(product))
          addToast('Додано до обраного', 'success')
        }
      },
      [dispatch, addToast, isAuthenticated, openModal, chosenIds]
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
        <NotAuthModal isOpened={isModalOpen} close={closeModal} overlay="on" />
      </div>
    )
  }
)

ProductsList.displayName = 'ProductsList'
