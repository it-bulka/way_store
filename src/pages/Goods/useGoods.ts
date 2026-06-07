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
  const [color, setColor] = useState<ringsColors>('white')
  const [isChosen, setIsChosen] = useState(false)
  const [amount, setAmount] = useState(0)
  const [selectedSize, setSelectedSize] = useState<number | undefined>(undefined)
  const [isNextProd, setIsNextProd] = useState(true)

  const chosenProducts = useAppSelector(getChosenProducts)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { addToast } = useToast()

  const hasRequiredSize = !prod?.sizes?.length || selectedSize !== undefined

  const buildCartItem = (): ICartItem => ({
    id: prod.id,
    title: prod.name,
    amount,
    price: prod.price.amount,
    img: prod.images[color][0],
    size: selectedSize,
  })

  const moveToProdPage = useCallback((id: string) => navigate(`/store/${id}`), [navigate])

  const onLikeClick = () => {
    if (isChosen) {
      dispatch(productsAction.deleteChosen(prod.id))
      addToast('Видалено з обраного', 'info')
    } else {
      dispatch(productsAction.addChosen(prod))
      addToast('Додано до обраного', 'success')
    }
    setIsChosen(prev => !prev)
  }

  const pickColor = (colorTag: ringsColors) => setColor(colorTag)

  const onAmountChange = (n: number) => setAmount(n)

  const onSizeSelect = (size: number) => setSelectedSize(size)

  const onAddToBucketClick = () => {
    dispatch(cartActions.addItem(buildCartItem()))
    addToast('Додано до кошика', 'success')
  }

  const onBuyClick = () => {
    dispatch(cartActions.addItem(buildCartItem()))
    navigate('/checkout')
  }

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
