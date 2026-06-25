import { useEffect, useRef } from 'react'
import cls from './Goods.module.scss'
import { BreadCrumbs } from '@/components/ui/Breadcrumbs/BreadCrumbs'
import { ImgTabs } from '@/components/ui/ImgTabs/ImgTabs'
import { PrevNextBtns } from '@/components/ui/PrevNextBtns/PrevNextBtns'
import { Typography, TypographyTypes } from '@/components/ui/Typography/Typography'
import { GoodsControls } from './GoodsControls/GoodsControls'
import { RelatedProducts } from './RelatedProducts'
import { GoodsContentSkeleton } from './GoodsPageSkeleton'
import { useGoods } from './useGoods'
import { useLoaderData, useNavigation, useRevalidator } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import type { IProduct } from '@/models/goodsType'
import { PageMeta } from '@/components/ui/PageMeta/PageMeta'
import { useMediaQuery } from '@/hooks/useMediaQuery.tsx'
import { GoodsAccordion } from '@/pages/Goods/GoodsControls/GoodsAccordion.tsx'

const Goods = () => {
  const prod = useLoaderData() as IProduct
  const { revalidate } = useRevalidator()
  const { state } = useNavigation()
  const { i18n, t: tEnums } = useTranslation('enums')
  const mountedRef = useRef(false)

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true
      return
    }
    revalidate()
  }, [i18n.language, revalidate])
  const {
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
  } = useGoods(prod)
  const isMobile = useMediaQuery('screen and (max-width: 768px)')
  const isNavigating = state === 'loading'

  if (!prod) return null

  return (
    <div className={cls.goods}>
      <PageMeta
        title={prod.name}
        description={`${prod.name} — ${prod.material}, ${prod.price.amount} ${prod.price.currency}`}
        ogImage={prod.images?.white?.[0]}
      />
      <BreadCrumbs lastLabel={prod.name} />
      <div className={cls.title}>
        <Typography type={TypographyTypes.HEADER} variant="h3">
          {tEnums(`productTitle.${prod.category}` as never)}
        </Typography>
        <PrevNextBtns
          onNextClick={onNextClick}
          onPrevClick={onPrevClick}
          disablePrev={!prod.prev}
          disableNext={!isNextProd}
        />
      </div>
      {isNavigating ? (
        <GoodsContentSkeleton />
      ) : (
        <>
          <div className={cls.content}>
            <div className={cls.col1}>
              <ImgTabs options={prod.images?.[color] || []} alt={prod.name} />
            </div>
            <div className={cls.col2}>
              <GoodsControls
                prod={prod}
                color={color}
                amount={amount}
                selectedSize={selectedSize}
                hasRequiredSize={hasRequiredSize}
                onColorPick={pickColor}
                onAmountChange={onAmountChange}
                onSizeSelect={onSizeSelect}
                onAddToBucketClick={onAddToBucketClick}
                onBuyClick={onBuyClick}
                withTabs={!isMobile}
              />
            </div>
          </div>
          {isMobile && <GoodsAccordion prod={prod} />}
          <RelatedProducts prod={prod} />
        </>
      )}
    </div>
  )
}

export default Goods
