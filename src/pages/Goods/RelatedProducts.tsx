import { type FC, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import cls from './RelatedProducts.module.scss'
import { ProductCard } from '@/components/ui/ProductCard/ProductCard'
import { ProductCardSkeleton } from '@/components/ui/ProductCardSkeleton/ProductCardSkeleton'
import { Typography, TypographyTypes } from '@/components/ui/Typography/Typography'
import { getSubcollectionDocsPaged } from '@/services'
import { cartActions } from '@/redux/reducers/cartSlice'
import { productsAction } from '@/redux/reducers/productsSlice'
import { useAppDispatch } from '@/hooks/reduxHooks'
import { useToast } from '@/context/ToastContext'
import { useNavigate } from 'react-router-dom'
import { useFirestoreLang } from '@/hooks/useFirestoreLang'
import { PAGES } from '@/models'
import type { IProduct, ProductType, ringsColors } from '@/models/goodsType'

const RELATED_COUNT = 4

const firstImg = (images: IProduct['images']): string =>
  (['white', 'rose', 'yellow'] as ringsColors[]).map(c => images[c][0]).find(Boolean) ?? ''

interface RelatedProductsProps {
  prod: IProduct
}

export const RelatedProducts: FC<RelatedProductsProps> = ({ prod }) => {
  const { t } = useTranslation('goods')
  const { t: tCart } = useTranslation('cart')
  const firestoreLang = useFirestoreLang()
  const [products, setProducts] = useState<IProduct[]>([])
  const [loading, setLoading] = useState(true)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { addToast } = useToast()

  useEffect(() => {
    const slugs = PAGES.getCollection(firestoreLang, prod.category as ProductType).split('/')
    const fetchRelated = async () => {
      setLoading(true)
      try {
        const { data } = await getSubcollectionDocsPaged<IProduct>({
          slugs,
          pageSize: RELATED_COUNT + 1,
        })
        setProducts(data.filter(p => p.id !== prod.id).slice(0, RELATED_COUNT))
      } finally {
        setLoading(false)
      }
    }
    fetchRelated()
  }, [prod.id, prod.category, firestoreLang])

  const onCardClick = useCallback(
    (product: IProduct) => () => navigate(`/store/${product.id}?category=${product.category}`),
    [navigate]
  )

  const onAddToCart = useCallback(
    (product: IProduct) => () => {
      dispatch(
        cartActions.addItem({
          id: product.id,
          title: product.name,
          amount: 1,
          price: product.price.amount,
          img: firstImg(product.images),
        })
      )
      addToast(tCart('addedToCart'), 'success')
    },
    [dispatch, addToast, tCart]
  )

  const onAddToFavorites = useCallback(
    (product: IProduct) => () => {
      dispatch(productsAction.addChosen(product))
      addToast(tCart('addedToFavorites'), 'success')
    },
    [dispatch, addToast, tCart]
  )

  if (!loading && products.length === 0) return null

  return (
    <section className={cls.related}>
      <Typography type={TypographyTypes.HEADER} variant="h3">
        {t('relatedTitle')}
      </Typography>
      <div className={cls.grid}>
        {loading
          ? Array.from({ length: RELATED_COUNT }, (_, i) => <ProductCardSkeleton key={i} />)
          : products.map(p => (
              <ProductCard
                key={p.id}
                img={firstImg(p.images)}
                title={p.name}
                price={p.price.amount}
                onClick={onCardClick(p)}
                onAddToCart={onAddToCart(p)}
                onAddToFavorites={onAddToFavorites(p)}
              />
            ))}
      </div>
    </section>
  )
}
