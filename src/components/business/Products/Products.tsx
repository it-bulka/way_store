import { type FC } from 'react'
import cls from './Products.module.scss'
import { ProductsList } from '@/components/business/ProductsList/ProductsList'
import { RangeSlider } from '@/components/ui/RangeSlider/RangeSlider'
import { BreadCrumbs } from '@/components/ui/Breadcrumbs/BreadCrumbs'
import { Dropdown } from '@/components/ui/Dropdown/Dropdown'
import classnames from 'classnames'
import { useAppSelector } from '@/hooks/reduxHooks'
import { getProducts } from '@/redux/selectors/getProducts'
import { Absent } from '@/components/ui/Absent/Absent.tsx'
import { categoryTitles } from './filterOptions'
import { useProductFilters } from './useProductFilters'

interface ProductsProps {
  className?: string
}

export const Products: FC<ProductsProps> = ({ className }) => {
  const products = useAppSelector(getProducts)
  const {
    metals,
    stones,
    productType,
    priceFilter,
    chosenProductType,
    onMetalsChecked,
    onStonesChecked,
    onProductChecked,
    getRange,
    resetFilters,
  } = useProductFilters()

  return (
    <div className={classnames(cls.products, [className])}>
      <BreadCrumbs />
      <div className={cls.filters}>
        <div className={cls.dropdowns}>
          <Dropdown title="ВИРІБ" options={productType} onChangeChecked={onProductChecked} />
          <Dropdown title="МЕТАЛ" options={metals} onChangeChecked={onMetalsChecked} />
          <Dropdown title="КАМІННЯ" options={stones} onChangeChecked={onStonesChecked} />
        </div>
        <div className={cls.slider}>
          <RangeSlider
            getRange={getRange}
            min={1000}
            max={500000}
            maxPossible={500000}
            reset={!priceFilter}
          />
        </div>
      </div>
      {!products || !products.length ? (
        <Absent
          info={'Товарів не знайдено. Спробуйте змінити параметри фільтрації'}
          btnTitle={'Скинути параметри'}
          onBtnClick={resetFilters}
        />
      ) : (
        <ProductsList products={products} title={categoryTitles[chosenProductType]} />
      )}
    </div>
  )
}
