import { type FC } from 'react'
import cls from './ChosenGoods.module.scss'
import { Absent } from '@/components/ui/Absent/Absent'
import { ProductsList } from '@/components/business/ProductsList/ProductsList'
import { products } from '@/data/products'
import classnames from 'classnames'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '@/hooks/reduxHooks'
import { getChosenProducts } from '@/redux/selectors/getChosenProducts'

interface ChosenGoodsProps {
  className?: string
}
const ChosenGoods: FC<ChosenGoodsProps> = ({ className }) => {
  const chosen = useAppSelector(getChosenProducts)
  const navigateTo = useNavigate()

  return (
    <div className={classnames(cls.chosenGoods, [className])}>
      {products?.length ? (
        <ProductsList products={chosen} className={cls.products} />
      ) : (
        <Absent
          info="ВЫ ПОКА НИЧЕГО НЕ ДОБАВИЛИ В ИЗБРАННОЕ"
          btnTitle="ПЕРЕЙТИ В МАГАЗИН"
          className={cls.absent}
          onBtnClick={() => navigateTo('/store')}
        />
      )}
    </div>
  )
}

export default ChosenGoods
