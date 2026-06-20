import { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import cls from './GoodsControls.module.scss'
import { Button } from '@/components/ui/Button/Button'
import { Stepper } from '@/components/ui/Stepper/Stepper'
import { ColorPicker } from '@/components/ui/ColorPicker/ColorPicker'
import { SizeSelector } from '@/components/ui/SizeSelector/SizeSelector'
import { Typography, TypographyTypes } from '@/components/ui/Typography/Typography'
import type { IProduct, ringsColors } from '@/models/goodsType'
import { COLOR_PALETTE } from '@/models/goodsType'
import { GoodsAccordion } from './GoodsAccordion.tsx'
import { LikeButton } from '@/components/ui/LikeButton/LikeButton.tsx'
import { useLikeProduct } from '@/components/business/LikeProductButton/model/hooks/useLikeProduct.tsx'
import { NotAuthModal } from '@/components/ui/NotAuthModal/NotAuthModal.tsx'

interface GoodsControlsProps {
  prod: IProduct
  color: ringsColors
  amount: number
  selectedSize: number | undefined
  hasRequiredSize: boolean
  onColorPick: (tag: ringsColors) => void
  onAmountChange: (n: number) => void
  onSizeSelect: (size: number) => void
  onAddToBucketClick: () => void
  onBuyClick: () => void
  withTabs?: boolean
}

export const GoodsControls: FC<GoodsControlsProps> = ({
  prod,
  color,
  amount,
  selectedSize,
  hasRequiredSize,
  onColorPick,
  onAmountChange,
  onSizeSelect,
  onAddToBucketClick,
  onBuyClick,
  withTabs = true,
}) => {
  const { t } = useTranslation('goods')
  const { t: tEnums } = useTranslation('enums')
  const { onAddToFavorites, chosenIds, isRestrictModalOpen, closeRestrictModal } = useLikeProduct()

  const availableColors = useMemo(
    () =>
      (Object.keys(prod.images ?? {}) as ringsColors[])
        .filter(key => prod.images?.[key]?.length > 0)
        .map((tag, idx) => ({ id: String(idx + 1), tag, color: COLOR_PALETTE[tag] })),
    [prod]
  )

  const isDisabled = amount <= 0 || !hasRequiredSize

  return (
    <>
      <div className={cls.descript}>
        <Typography>{prod.name}</Typography>
        <LikeButton onClick={onAddToFavorites(prod)} isLiked={chosenIds.has(prod.id)} />
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

      {withTabs && <GoodsAccordion prod={prod} />}
      <NotAuthModal isOpened={isRestrictModalOpen} close={closeRestrictModal} overlay="on" />
    </>
  )
}
