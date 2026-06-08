import { FC, useMemo } from 'react'
import cls from './GoodsControls.module.scss'
import { Button } from '@/components/ui/Button/Button'
import { Stepper } from '@/components/ui/Stepper/Stepper'
import { ColorPicker } from '@/components/ui/ColorPicker/ColorPicker'
import { SizeSelector } from '@/components/ui/SizeSelector/SizeSelector'
import { Accordion } from '@/components/ui/Accordion/Accordion'
import { Typography, TypographyTypes } from '@/components/ui/Typography/Typography'
import LikeIcon from '@/assets/general/heart.svg'
import classNames from 'classnames'
import type { IProduct, ringsColors } from '@/models/goodsType'
import { COLOR_PALETTE, COLOR_LABELS, METAL_LABELS, STONE_LABELS, CARE_INSTRUCTIONS, DELIVERY_INFO } from '@/models/goodsType'

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
  const availableColors = useMemo(
    () => (Object.keys(prod.images ?? {}) as ringsColors[])
      .filter(key => prod.images?.[key]?.length > 0)
      .map((tag, idx) => ({ id: String(idx + 1), tag, color: COLOR_PALETTE[tag] })),
    [prod]
  )

  const accordionItems = useMemo(
    () => [
      {
        id: '1',
        title: 'Деталі',
        content: (
          <div>
            <p>Матеріал: {prod.material}</p>
            <p>Метал: {(prod.metal ?? []).map(m => METAL_LABELS[m]).join(', ')}</p>
            {(prod.stones ?? []).length > 0 && (
              <p>Камені: {(prod.stones ?? []).map(s => STONE_LABELS[s]).join(', ')}</p>
            )}
            <p>Вага: {prod.weight.num} {prod.weight.measurement}</p>
          </div>
        ),
      },
      {
        id: '2',
        title: 'Таблиця розмірів',
        content: prod.sizes?.length
          ? <p>Доступні розміри: {prod.sizes.join(', ')}</p>
          : <p>Розмір універсальний</p>,
      },
      {
        id: '3',
        title: 'Догляд за виробом',
        content: (
          <div>
            {(prod.metal ?? []).map(m => <p key={m}>{CARE_INSTRUCTIONS[m]}</p>)}
          </div>
        ),
      },
      {
        id: '4',
        title: 'Доставка та повернення',
        content: (
          <div>
            {DELIVERY_INFO.split('\n\n').map((line, i) => <p key={i}>{line}</p>)}
          </div>
        ),
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

      <ColorPicker options={availableColors} title={`Колір - ${COLOR_LABELS[color]}`} onClick={onColorPick} />

      {!!prod.sizes?.length && (
        <SizeSelector sizes={prod.sizes} selected={selectedSize} onSelect={onSizeSelect} />
      )}

      <Accordion items={accordionItems} />
    </>
  )
}
