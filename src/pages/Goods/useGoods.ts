import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { productsAction } from '@/redux/reducers/productsSlice'
import { cartActions } from '@/redux/reducers/cartSlice'
import { getChosenProducts } from '@/redux/selectors/getChosenProducts'
import { getNextDoc } from '@/services'
import { PAGES } from '@/models'
import { useToast } from '@/context/ToastContext'
import type { IProduct, ringsColors } from '@/models/goodsType'
import type { ICartItem } from '@/redux/types/cartTypes'

export const useGoods = (prod: IProduct) => {
  const firstColor =
    (Object.keys(prod.images) as ringsColors[]).find(key => prod.images[key].length > 0) ?? 'white'
  const [color, setColor] = useState<ringsColors>(firstColor)
  const [isChosen, setIsChosen] = useState(false)
  const [amount, setAmount] = useState(0)
  const [selectedSize, setSelectedSize] = useState<number | undefined>(prod.sizes?.[0])
  const [isNextProd, setIsNextProd] = useState(true)

  const chosenProducts = useAppSelector(getChosenProducts)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { addToast } = useToast()

  const hasRequiredSize = !prod?.sizes?.length || selectedSize !== undefined

  const buildCartItem = useCallback((): ICartItem => {
    const colorImages = (Object.keys(prod.images) as ringsColors[])
      .filter(k => prod.images[k].length > 0)
      .reduce<Partial<Record<ringsColors, string>>>(
        (acc, k) => ({ ...acc, [k]: prod.images[k][0] }),
        {}
      )
    return {
      id: prod.id,
      title: prod.name,
      amount,
      price: prod.price.amount,
      img: prod.images[color][0],
      color,
      size: selectedSize,
      colorImages,
      availableSizes: prod.sizes,
    }
  }, [prod, amount, color, selectedSize])

  const moveToProdPage = useCallback((id: string) => navigate(`/store/${id}`), [navigate])

  const onLikeClick = useCallback(() => {
    if (isChosen) {
      dispatch(productsAction.deleteChosen(prod.id))
      addToast('Видалено з обраного', 'info')
    } else {
      dispatch(productsAction.addChosen(prod))
      addToast('Додано до обраного', 'success')
    }
    setIsChosen(prev => !prev)
  }, [isChosen, dispatch, prod, addToast])

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
      collection: PAGES.getCollection(),
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

  useEffect(() => {
    const found = chosenProducts.find(item => item.id === prod.id)
    if (found) setIsChosen(true)
  }, [prod, chosenProducts])

  return {
    color,
    amount,
    selectedSize,
    isChosen,
    isNextProd,
    hasRequiredSize,
    onLikeClick,
    pickColor,
    onAmountChange,
    onSizeSelect,
    onAddToBucketClick,
    onBuyClick,
    onNextClick,
    onPrevClick,
  }
}
