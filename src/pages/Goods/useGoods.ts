import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/hooks/reduxHooks'
import { cartActions } from '@/redux/reducers/cartSlice'
import { getNextDoc } from '@/services'
import { PAGES } from '@/models'
import { useToast } from '@/context/ToastContext'
import type { IProduct, ProductType, ringsColors } from '@/models/goodsType'
import type { ICartItem } from '@/redux/types/cartTypes'
import { buildDefaultCartItem } from '@/utils/buildDefaultCartItem'

export const useGoods = (prod: IProduct) => {
  const firstColor =
    (Object.keys(prod.images) as ringsColors[]).find(key => prod.images[key].length > 0) ?? 'white'
  const [color, setColor] = useState<ringsColors>(firstColor)
  const [amount, setAmount] = useState(0)
  const [selectedSize, setSelectedSize] = useState<number | undefined>(prod.sizes?.[0])
  const [isNextProd, setIsNextProd] = useState(true)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { addToast } = useToast()

  const hasRequiredSize = !prod?.sizes?.length || selectedSize !== undefined

  const buildCartItem = useCallback(
    (): ICartItem => ({
      ...buildDefaultCartItem(prod, amount),
      img: prod.images[color][0],
      color,
      size: selectedSize,
    }),
    [prod, amount, color, selectedSize]
  )

  const moveToProdPage = useCallback((id: string) => navigate(`/store/${id}`), [navigate])
  const pickColor = useCallback((colorTag: ringsColors) => setColor(colorTag), [])

  const onAmountChange = useCallback((n: number) => setAmount(n), [])

  const onSizeSelect = useCallback((size: number) => setSelectedSize(size), [])

  const onAddToBucketClick = useCallback(() => {
    dispatch(cartActions.addItem(buildCartItem()))
    addToast('Додано до кошика', 'success')
  }, [buildCartItem, dispatch, addToast])

  const onBuyClick = useCallback(() => {
    dispatch(cartActions.addItem(buildCartItem()))
    navigate('/checkout')
  }, [buildCartItem, dispatch, navigate])

  const onNextClick = useCallback(async () => {
    const nextProd = await getNextDoc({
      collection: PAGES.getCollection(undefined, prod.category as ProductType),
      currentDocId: prod.id,
    })
    if (!nextProd?.id) {
      setIsNextProd(false)
      return
    }
    moveToProdPage(nextProd.id)
  }, [prod, moveToProdPage])

  const onPrevClick = useCallback(async () => {
    if (prod?.prev) {
      moveToProdPage(prod.prev)
      setIsNextProd(true)
    }
  }, [prod, moveToProdPage])

  return {
    color,
    amount,
    selectedSize,
    isNextProd,
    hasRequiredSize,
    pickColor,
    onAmountChange,
    onSizeSelect,
    onAddToBucketClick,
    onBuyClick,
    onNextClick,
    onPrevClick,
  }
}
