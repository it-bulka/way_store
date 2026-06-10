import { type FC } from 'react'
import { useTranslation } from 'react-i18next'
import cls from './ChosenGoods.module.scss'
import { Absent } from '@/components/ui/Absent/Absent'
import { ProductsList } from '@/components/business/ProductsList/ProductsList'
import classnames from 'classnames'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '@/hooks/reduxHooks'
import { getChosenProducts } from '@/redux/selectors/getChosenProducts'

interface ChosenGoodsProps {
  className?: string
}

const ChosenGoods: FC<ChosenGoodsProps> = ({ className }) => {
  const { t } = useTranslation('account')
  const chosen = useAppSelector(getChosenProducts)
  const navigateTo = useNavigate()

  return (
    <div className={classnames(cls.chosenGoods, [className])}>
      {chosen?.length ? (
        <ProductsList products={chosen} className={cls.products} title={t('chosen.title')} />
      ) : (
        <Absent
          info={t('chosen.empty')}
          btnTitle={t('chosen.goToStore')}
          className={cls.absent}
          onBtnClick={() => navigateTo('/store')}
        />
      )}
    </div>
  )
}

export default ChosenGoods
