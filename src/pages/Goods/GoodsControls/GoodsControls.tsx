import { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
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
import { COLOR_PALETTE } from '@/models/goodsType'

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
  const { t } = useTranslation('goods')
  const { t: tEnums } = useTranslation('enums')

  const availableColors = useMemo(
    () =>
      (Object.keys(prod.images ?? {}) as ringsColors[])
        .filter(key => prod.images?.[key]?.length > 0)
        .map((tag, idx) => ({ id: String(idx + 1), tag, color: COLOR_PALETTE[tag] })),
    [prod]
  )

  const accordionItems = useMemo(
    () => [
      {
        id: '1',
        title: t('details.title'),
        content: (
          <div>
            <p>{t('details.material')} {prod.material}</p>
            <p>{t('details.metal')} {(prod.metal ?? []).map(m => tEnums(`metal.${m}` as never)).join(', ')}</p>
            {(prod.stones ?? []).length > 0 && (
              <p>{t('details.stones')} {(prod.stones ?? []).map(s => tEnums(`stone.${s}` as never)).join(', ')}</p>
            )}
            <p>{t('details.weight', { num: prod.weight.num, measurement: prod.weight.measurement })}</p>
          </div>
        ),
      },
      {
        id: '2',
        title: t('sizes.title'),
        content: prod.sizes?.length ? (
          <p>{t('sizes.available', { sizes: prod.sizes.join(', ') })}</p>
        ) : (
          <p>{t('sizes.universal')}</p>
        ),
      },
      {
        id: '3',
        title: t('care.title'),
        content: (
          <div>
            {(prod.metal ?? []).map(m => (
              <p key={m}>{tEnums(`careInstructions.${m}` as never)}</p>
            ))}
          </div>
        ),
      },
      {
        id: '4',
        title: t('delivery.title'),
        content: (
          <div>
            {tEnums('deliveryInfo').split('\n\n').map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        ),
      },
    ],
    [prod, t, tEnums]
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
          <Typography>{t('quantity')}</Typography>
          <Stepper initial={amount} getValue={onAmountChange} />
        </div>
        <div className={cls.btns}>
          <Button title={t('addToCart')} onClick={onAddToBucketClick} disabled={isDisabled} />
          <Button title={t('buy')} onClick={onBuyClick} disabled={isDisabled} />
        </div>
      </div>

      <ColorPicker
        options={availableColors}
        title={t('color', { color: tEnums(`color.${color}` as never) })}
        onClick={onColorPick}
      />

      {!!prod.sizes?.length && (
        <SizeSelector sizes={prod.sizes} selected={selectedSize} onSelect={onSizeSelect} />
      )}

      <Accordion items={accordionItems} />
    </>
  )
}
