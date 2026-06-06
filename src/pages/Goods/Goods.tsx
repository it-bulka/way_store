import { PrevNextBtns } from '@/components/ui/PrevNextBtns/PrevNextBtns'
import { ImgTabs } from '@/components/ui/ImgTabs/ImgTabs'
import cls from './Goods.module.scss'
import { Button } from '@/components/ui/Button/Button'
import { Stepper } from '@/components/ui/Stepper/Stepper'
import { ColorPicker, type IOption as IColorOption } from '@/components/ui/ColorPicker/ColorPicker'
import { SizeSelector } from '@/components/ui/SizeSelector/SizeSelector'
import { Accordion } from '@/components/ui/Accordion/Accordion'
import { BreadCrumbs } from '@/components/ui/Breadcrumbs/BreadCrumbs'
import { Typography, TypographyTypes } from '@/components/ui/Typography/Typography'
import LikeIcon from '@/assets/general/heart.svg'
import { LoaderFunctionArgs, useLoaderData, useNavigate } from 'react-router-dom'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { IProduct, ringsColors } from '@/models/goodsType'
import classNames from 'classnames'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { productsAction } from '@/redux/reducers/productsSlice'
import { getChosenProducts } from '@/redux/selectors/getChosenProducts'
import { getNextDoc, getDocInfo } from '@/services'
import { PAGES } from '@/models'
import { cartActions } from '@/redux/reducers/cartSlice.ts'
import { ICartItem } from '@/redux/types/cartTypes.ts'
import { useToast } from '@/context/ToastContext'

const colors: IColorOption[] = [
  { id: '1', color: '#D3D3D3', tag: 'white' },
  { id: '2', color: '#C0BA97', tag: 'yellow' },
  { id: '3', color: '#DBC5C5', tag: 'rose' },
]

const Goods = () => {
  const prod = useLoaderData() as IProduct
  const [color, setColor] = useState<ringsColors>('white')
  const [isChosen, setIsChosen] = useState(false)
  const [amount, setAmount] = useState(0)
  const [selectedSize, setSelectedSize] = useState<number | undefined>(undefined)
  const [isNextProd, setIsNextProd] = useState(true)
  const chosenProducts = useAppSelector(getChosenProducts)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { addToast } = useToast()

  const accordionItems = useMemo(
    () => [
      {
        id: '1',
        title: 'Деталі',
        content: (
          <p>
            Колір - {prod?.color}, Вага - {prod?.weight.num} {prod?.weight.measurement}
          </p>
        ),
      },
      {
        id: '2',
        title: 'Таблиця розмірів',
        content: <p>Колір - {prod?.color}</p>,
      },
      {
        id: '3',
        title: 'Догляд за виробом',
        content:
          'LOrem LOremLOremvvLOremLOrem LOremLOremLOremLOremLOremLOr emLOremL OremLOremLOrem LOremLOr emvvLOremLOremLOremLOremLOremLOremLOremLOremLOremLOremLOremLOrem LOremLOremvvLOremLOremLOremLOremLOremLOremLOemLOremLOremLOremLOremLOremLOremLOremLOrem',
      },
      {
        id: '4',
        title: 'Доставка та повернення',
        content:
          'emLOremLOremLOrem LOremLOremLOremLOremLOremLOrem LOremLOr emvvLOrem LOremLOremLOremLOremLOremLO remLOremLOremLOremLOrem',
      },
    ],
    [prod]
  )

  const onLikeClick = () => {
    setIsChosen(prev => !prev)
    if (isChosen) dispatch(productsAction.deleteChosen(prod.id))
    if (!isChosen) dispatch(productsAction.addChosen(prod))
  }

  const moveToProdPage = useCallback((id: string) => navigate(`/store/${id}`), [navigate])

  const onNextClick = useCallback(async () => {
    const nextProd = await getNextDoc({
      collection: PAGES.getCollection('ukr'),
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

  const pickColor = (colorTag: ringsColors) => setColor(colorTag)

  const hasRequiredSize = !prod?.sizes?.length || selectedSize !== undefined

  const onAddToBucketClick = () => {
    const chosen: ICartItem = {
      id: prod.id,
      title: prod.name,
      amount,
      price: prod.price.amount,
      img: prod.images[color][0],
      size: selectedSize,
    }
    dispatch(cartActions.addItem(chosen))
    addToast('Додано до кошика', 'success')
  }

  useEffect(() => {
    const found = chosenProducts.find(item => item.id === prod.id)
    if (found) setIsChosen(true)
  }, [prod, chosenProducts])

  if (!prod) return null

  return (
    <div className={cls.goods}>
      <BreadCrumbs />
      <div className={cls.title}>
        <Typography type={TypographyTypes.HEADER} variant="h3">
          Каблучки
        </Typography>
        <PrevNextBtns
          onNextClick={onNextClick}
          onPrevClick={onPrevClick}
          disablePrev={!prod.prev}
          disableNext={!isNextProd}
        />
      </div>
      <div className={cls.content}>
        <div className={cls.col1}>
          <ImgTabs options={prod.images[color] || []} />
        </div>
        <div className={cls.col2}>
          <div className={cls.descript}>
            <Typography>{prod.name}</Typography>
            <button
              onClick={onLikeClick}
              className={classNames(cls.likeBtn, { [cls.isLiked]: isChosen })}
            >
              <LikeIcon />
            </button>
          </div>
          <Typography type={TypographyTypes.HEADER} variant="h4">
            {prod.price.amount} {prod.price.currency}
          </Typography>

          <div className={cls.controls}>
            <div className={cls.stepper}>
              <Typography>Кількість</Typography>
              <Stepper initial={amount} getValue={n => setAmount(n)} />
            </div>
            <div className={cls.btns}>
              <Button
                title="Додати до кошика"
                onClick={onAddToBucketClick}
                disabled={amount <= 0 || !hasRequiredSize}
              />
              <Button title="Купити" disabled={amount <= 0 || !hasRequiredSize} />
            </div>
          </div>
          <ColorPicker options={colors} title={`Колір - ${color}`} onClick={pickColor} />
          {!!prod.sizes?.length && (
            <SizeSelector
              sizes={prod.sizes}
              selected={selectedSize}
              onSelect={setSelectedSize}
            />
          )}
          <Accordion items={accordionItems} />
        </div>
      </div>
    </div>
  )
}

export default Goods

export const goodsLoader = async ({ params }: LoaderFunctionArgs) => {
  if (params.slug) {
    return await getDocInfo<IProduct>(PAGES.getCollection('ukr'), params.slug)
  }

  return null
}
