import { type FC, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import cls from './Products.module.scss'
import { ProductsList } from '@/components/business/ProductsList/ProductsList'
import { RangeSlider } from '@/components/ui/RangeSlider/RangeSlider'
import { BreadCrumbs } from '@/components/ui/Breadcrumbs/BreadCrumbs'
import { Dropdown } from '@/components/ui/Dropdown/Dropdown'
import classnames from 'classnames'
import { useAppSelector } from '@/hooks/reduxHooks'
import { getProducts } from '@/redux/selectors/getProducts'
import { Absent } from '@/components/ui/Absent/Absent.tsx'
import { useProductFilters } from './useProductFilters'
import { useProductPagination } from './useProductPagination'
import { useFirestoreLang } from '@/hooks/useFirestoreLang'
import { useSearchParams } from 'react-router-dom'

interface ProductsProps {
  className?: string
}

export const Products: FC<ProductsProps> = ({ className }) => {
  const products = useAppSelector(getProducts)
  const [searchParams, setSearchParams] = useSearchParams()
  const { t } = useTranslation('store')
  const { t: tEnums } = useTranslation('enums')
  const searchQuery = searchParams.get('search') ?? ''
  const firestoreLang = useFirestoreLang()

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

  const { loading, loadingMore, hasMore, loadMore } = useProductPagination({
    collection,
    queries,
    firestoreLang,
  })

  const visibleProducts = useMemo(() => {
    let result = products
    if (searchQuery) {
      result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }
    const { stones: filterStones } = clientSideFilters
    if (filterStones && filterStones.length > 0) {
      result = result.filter(p => p.stones.some(s => filterStones.includes(s)))
    }
    return result
  }, [products, searchQuery, clientSideFilters])

  const handleReset = useCallback(() => {
    resetFilters()
    if (searchQuery)
      setSearchParams(prev => {
        const next = new URLSearchParams(prev)
        next.delete('search')
        return next
      })
  }, [resetFilters, searchQuery, setSearchParams])

  const clearSearch = useCallback(
    () =>
      setSearchParams(prev => {
        const next = new URLSearchParams(prev)
        next.delete('search')
        return next
      }),
    [setSearchParams]
  )

  return (
    <div className={classnames(cls.products, [className])}>
      <div className={cls.controls}>
        <BreadCrumbs />
        {searchQuery && (
          <div className={cls.searchInfo}>
            <span>{t('filters.searchLabel', { query: searchQuery })}</span>
            <button type="button" className={cls.clearSearch} onClick={clearSearch}>
              {t('filters.resetSearch')}
            </button>
          </div>
        )}
        <div className={cls.filters}>
          <div className={cls.dropdowns}>
            <Dropdown title={t('filters.product')} options={productType} onChangeChecked={onProductChecked} />
            <Dropdown title={t('filters.metal')} options={metals} onChangeChecked={onMetalsChecked} />
            <Dropdown title={t('filters.stone')} options={stones} onChangeChecked={onStonesChecked} />
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
              ? t('filters.noResultsSearch', { query: searchQuery })
              : t('filters.noResults')
          }
          btnTitle={searchQuery ? t('filters.resetSearch') : t('filters.reset')}
          onBtnClick={searchQuery ? clearSearch : handleReset}
        />
      ) : (
        <ProductsList
          products={visibleProducts}
          title={chosenProductType ? tEnums(`productTitle.${chosenProductType}` as never) : t('allProducts')}
          loading={loading}
          loadMore={loadMore}
          hasMore={hasMore}
          loadingMore={loadingMore}
        />
      )}
    </div>
  )
}
