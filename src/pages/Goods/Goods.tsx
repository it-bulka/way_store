import cls from './Goods.module.scss'
import { BreadCrumbs } from '@/components/ui/Breadcrumbs/BreadCrumbs'
import { ImgTabs } from '@/components/ui/ImgTabs/ImgTabs'
import { PrevNextBtns } from '@/components/ui/PrevNextBtns/PrevNextBtns'
import { Typography, TypographyTypes } from '@/components/ui/Typography/Typography'
import { GoodsControls } from './GoodsControls/GoodsControls'
import { RelatedProducts } from './RelatedProducts'
import { useGoods } from './useGoods'
import { useLoaderData } from 'react-router-dom'
import type { IProduct } from '@/models/goodsType'
import { PageMeta } from '@/components/ui/PageMeta/PageMeta'

const Goods = () => {
  const prod = useLoaderData() as IProduct
  const {
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
  } = useGoods(prod)

  if (!prod) return null

  return (
    <div className={cls.goods}>
      <PageMeta
        title={prod.name}
        description={`${prod.name} — ${prod.material}, ${prod.price.amount} ${prod.price.currency}`}
        ogImage={prod.images.white?.[0]}
      />
      <BreadCrumbs lastLabel={prod.name} />
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
          <GoodsControls
            prod={prod}
            color={color}
            amount={amount}
            selectedSize={selectedSize}
            isChosen={isChosen}
            hasRequiredSize={hasRequiredSize}
            onLikeClick={onLikeClick}
            onColorPick={pickColor}
            onAmountChange={onAmountChange}
            onSizeSelect={onSizeSelect}
            onAddToBucketClick={onAddToBucketClick}
            onBuyClick={onBuyClick}
          />
        </div>
      </div>
      <RelatedProducts prod={prod} />
    </div>
  )
}

export default Goods
