import { type FC, useCallback, useEffect, useState } from 'react'
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
import { PAGES } from '@/models'
import type { IProduct } from '@/models/goodsType'

const RELATED_COUNT = 4
const RELATED_SLUGS = PAGES.getCollection('ukr').split('/')

interface RelatedProductsProps {
  prod: IProduct
}

export const RelatedProducts: FC<RelatedProductsProps> = ({ prod }) => {
  const [products, setProducts] = useState<IProduct[]>([])
  const [loading, setLoading] = useState(true)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { addToast } = useToast()

  useEffect(() => {
    const fetchRelated = async () => {
      setLoading(true)
      try {
        const { data } = await getSubcollectionDocsPaged<IProduct>({
          slugs: RELATED_SLUGS,
          pageSize: RELATED_COUNT + 1,
        })
        setProducts(data.filter(p => p.id !== prod.id).slice(0, RELATED_COUNT))
      } finally {
        setLoading(false)
      }
    }
    fetchRelated()
  }, [prod.id])

  const onCardClick = useCallback((id: string) => () => navigate(`/store/${id}`), [navigate])

  const onAddToCart = useCallback(
    (product: IProduct) => () => {
      dispatch(
        cartActions.addItem({
          id: product.id,
          title: product.name,
          amount: 1,
          price: product.price.amount,
          img: product.images['white'][0],
        })
      )
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

  if (!loading && products.length === 0) return null

  return (
    <section className={cls.related}>
      <Typography type={TypographyTypes.HEADER} variant="h3">Схожі товари</Typography>
      <div className={cls.grid}>
        {loading
          ? Array.from({ length: RELATED_COUNT }, (_, i) => <ProductCardSkeleton key={i} />)
          : products.map(p => (
              <ProductCard
                key={p.id}
                img={p.images['white'][0]}
                title={p.name}
                price={p.price.amount}
                onClick={onCardClick(p.id)}
                onAddToCart={onAddToCart(p)}
                onAddToFavorites={onAddToFavorites(p)}
              />
            ))}
      </div>
    </section>
  )
}
