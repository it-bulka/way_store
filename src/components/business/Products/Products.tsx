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
import { useProductPagination } from './useProductPagination'
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
    collection,
    queries,
    clientSideFilters,
    onMetalsChecked,
    onStonesChecked,
    onProductChecked,
    getRange,
    resetFilters,
  } = useProductFilters()

  const { loading, loadingMore, hasMore, loadMore } = useProductPagination({ collection, queries })

  const visibleProducts = useMemo(() => {
    let result = products
    if (searchQuery) {
      result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }
    if (clientSideFilters.stones?.length) {
      result = result.filter(p => p.stones.some(s => clientSideFilters.stones!.includes(s)))
    }
    return result
  }, [products, searchQuery, clientSideFilters])

  const handleReset = useCallback(() => {
    resetFilters()
    if (searchQuery) setSearchParams({})
  }, [resetFilters, searchQuery, setSearchParams])

  const clearSearch = useCallback(() => setSearchParams({}), [setSearchParams])

  return (
    <div className={classnames(cls.products, [className])}>
      <div className={cls.controls}>
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
              max={46000}
              maxPossible={46000}
              rangeGap={3000}
              reset={!priceFilter}
            />
          </div>
        </div>
      </div>
      {!visibleProducts.length && !loading ? (
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
        <ProductsList
          products={visibleProducts}
          title={chosenProductType ? categoryTitles[chosenProductType] : 'УСІ ВИРОБИ'}
          loading={loading}
          loadMore={loadMore}
          hasMore={hasMore}
          loadingMore={loadingMore}
        />
      )}
    </div>
  )
}
