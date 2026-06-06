import { type FC, useCallback, useMemo } from 'react'
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
import { useSearchParams } from 'react-router-dom'

interface ProductsProps {
  className?: string
}

export const Products: FC<ProductsProps> = ({ className }) => {
  const products = useAppSelector(getProducts)
  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery = searchParams.get('search') ?? ''

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

  const visibleProducts = useMemo(
    () =>
      searchQuery
        ? products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
        : products,
    [products, searchQuery]
  )

  const handleReset = useCallback(() => {
    resetFilters()
    if (searchQuery) setSearchParams({})
  }, [resetFilters, searchQuery, setSearchParams])

  const clearSearch = useCallback(() => setSearchParams({}), [setSearchParams])

  return (
    <div className={classnames(cls.products, [className])}>
      <BreadCrumbs />
      {searchQuery && (
        <div className={cls.searchInfo}>
          <span>Пошук: «{searchQuery}»</span>
          <button type="button" className={cls.clearSearch} onClick={clearSearch}>
            Скинути пошук
          </button>
        </div>
      )}
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
      {!visibleProducts.length ? (
        <Absent
          info={
            searchQuery
              ? `За запитом «${searchQuery}» нічого не знайдено`
              : 'Товарів не знайдено. Спробуйте змінити параметри фільтрації'
          }
          btnTitle={searchQuery ? 'Скинути пошук' : 'Скинути параметри'}
          onBtnClick={searchQuery ? clearSearch : handleReset}
        />
      ) : (
        <ProductsList products={visibleProducts} title={categoryTitles[chosenProductType]} />
      )}
    </div>
  )
}
