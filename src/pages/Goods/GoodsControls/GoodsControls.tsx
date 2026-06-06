import { FC, useMemo } from 'react'
import cls from './GoodsControls.module.scss'
import { Button } from '@/components/ui/Button/Button'
import { Stepper } from '@/components/ui/Stepper/Stepper'
import { ColorPicker, type IOption as IColorOption } from '@/components/ui/ColorPicker/ColorPicker'
import { SizeSelector } from '@/components/ui/SizeSelector/SizeSelector'
import { Accordion } from '@/components/ui/Accordion/Accordion'
import { Typography, TypographyTypes } from '@/components/ui/Typography/Typography'
import LikeIcon from '@/assets/general/heart.svg'
import classNames from 'classnames'
import type { IProduct, ringsColors } from '@/models/goodsType'

const colors: IColorOption[] = [
  { id: '1', color: '#D3D3D3', tag: 'white' },
  { id: '2', color: '#C0BA97', tag: 'yellow' },
  { id: '3', color: '#DBC5C5', tag: 'rose' },
]

interface GoodsControlsProps {
  prod: IProduct
  color: ringsColors
  amount: number
  selectedSize: number | undefined
  isChosen: boolean
  hasRequiredSize: boolean
  onLikeClick: () => void
  onColorPick: (tag: ringsColors) => void
  onAmountChange: (n: number) => void
  onSizeSelect: (size: number) => void
  onAddToBucketClick: () => void
  onBuyClick: () => void
}

export const GoodsControls: FC<GoodsControlsProps> = ({
  prod,
  color,
  amount,
  selectedSize,
  isChosen,
  hasRequiredSize,
  onLikeClick,
  onColorPick,
  onAmountChange,
  onSizeSelect,
  onAddToBucketClick,
  onBuyClick,
}) => {
  const accordionItems = useMemo(
    () => [
      {
        id: '1',
        title: 'Деталі',
        content: (
          <p>
            Колір - {prod.color}, Вага - {prod.weight.num} {prod.weight.measurement}
          </p>
        ),
      },
      {
        id: '2',
        title: 'Таблиця розмірів',
        content: <p>Колір - {prod.color}</p>,
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

  const isDisabled = amount <= 0 || !hasRequiredSize

  return (
    <>
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
          <Stepper initial={amount} getValue={onAmountChange} />
        </div>
        <div className={cls.btns}>
          <Button title="Додати до кошика" onClick={onAddToBucketClick} disabled={isDisabled} />
          <Button title="Купити" onClick={onBuyClick} disabled={isDisabled} />
        </div>
      </div>

      <ColorPicker options={colors} title={`Колір - ${color}`} onClick={onColorPick} />

      {!!prod.sizes?.length && (
        <SizeSelector sizes={prod.sizes} selected={selectedSize} onSelect={onSizeSelect} />
      )}

      <Accordion items={accordionItems} />
    </>
  )
}
