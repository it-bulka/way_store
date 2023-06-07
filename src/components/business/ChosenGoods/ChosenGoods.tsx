import { type FC } from 'react'
import cls from './ChosenGoods.module.scss'
import { Absent } from '@/components/ui/Absent/Absent'
import { ProductsList } from '@/components/business/ProductsList/ProductsList'
import { products } from '@/data/products'

products.length = 0

interface ChosenGoodsProps {
  className?: string
}
export const ChosenGoods: FC<ChosenGoodsProps> = ({ className = '' }) => {
  return (
    <div className={cls.chosenGoods + ' ' + className}>
      {products?.length ? (
        <ProductsList products={products} className={cls.products} />
      ) : (
        <Absent
          info="ВЫ ПОКА НИЧЕГО НЕ ДОБАВИЛИ В ИЗБРАННОЕ"
          btnTitle="ПЕРЕЙТИ В МАГАЗИН"
          className={cls.absent}
        />
      )}
    </div>
  )
}
