import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { where } from 'firebase/firestore'
import { type IOption as IDropdownOption } from '@/components/ui/Dropdown/Dropdown'
import { type IGetRange } from '@/components/ui/RangeSlider/RangeSlider'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { fetchProducts } from '@/redux/async/fetchProducts'
import { FilterActions } from '@/redux/reducers'
import { getFilterCategories } from '@/redux/selectors'
import { type FilterPrice, type IFilters } from '@/redux/reducers/filterCategorySlice.ts'
import { QueryFieldFilterConstraint } from '@firebase/firestore'
import type { StoneType, ProductType, MetalsType } from '@/models'
import {
  metalsOptions,
  stonesOptions,
  productOptions,
  type GoodsDropdownType,
} from './filterOptions'

function getChosenCategory<T extends string>(categories: IDropdownOption<T>[]): T[] {
  return categories.filter(item => item.chosen).map(item => item.label)
}

function onCategoryChecked<T extends string>(
  id: string,
  status: boolean,
  categories: IDropdownOption<T>[]
): IDropdownOption<T>[] {
  return categories.map(item => (item.id === id ? { ...item, chosen: status } : item))
}

function resetArr<T extends GoodsDropdownType>(arr: T): T {
  return arr.map(item => ({ ...item, chosen: false })) as T
}

function buildQueryConstraints(fc: IFilters): QueryFieldFilterConstraint[] | undefined {
  const filters: QueryFieldFilterConstraint[] = []

  if (fc.metal?.length) filters.push(where('metal', 'array-contains-any', fc.metal))
  if (fc.stones?.length) filters.push(where('stones', 'array-contains-any', fc.stones))

  if (fc.price) {
    filters.push(where('price', '>=', fc.price.min))
    filters.push(where('price', '<=', fc.price.max))
  }

  return filters.length ? filters : undefined
}

export const useProductFilters = () => {
  const dispatch = useAppDispatch()
  const filterCategories = useAppSelector(getFilterCategories)
  const firstRenderRef = useRef(true)

  const [metals, setMetals] = useState(metalsOptions)
  const [stones, setStones] = useState(stonesOptions)
  const [productType, setProductType] = useState(productOptions)
  const [priceFilter, setPriceFilter] = useState<FilterPrice | null>(null)

  const onMetalsChecked = useCallback(
    (id: string, status: boolean) =>
      setMetals(prev => onCategoryChecked<MetalsType>(id, status, prev)),
    []
  )

  const onStonesChecked = useCallback(
    (id: string, status: boolean) =>
      setStones(prev => onCategoryChecked<StoneType>(id, status, prev)),
    []
  )

  const onProductChecked = useCallback(
    (id: string, status: boolean) =>
      setProductType(prev => onCategoryChecked<ProductType>(id, status, prev)),
    []
  )

  const getRange: IGetRange = useCallback((min, max) => setPriceFilter({ min, max }), [])

  const resetFilters = useCallback(() => {
    setMetals(prev => resetArr(prev))
    setStones(prev => resetArr(prev))
    setProductType(prev => resetArr(prev))
    setPriceFilter(null)
  }, [])

  const chosenProductType = useMemo(
    () => getChosenCategory<ProductType>(productType)[0] ?? 'rings',
    [productType]
  )

  useEffect(() => {
    const { metal, stones: sf, product, price } = filterCategories
    if (metal?.length) setMetals(prev => prev.map(item => ({ ...item, chosen: metal.includes(item.label) })))
    if (sf?.length) setStones(prev => prev.map(item => ({ ...item, chosen: sf.includes(item.label) })))
    if (product?.length) setProductType(prev => prev.map(item => ({ ...item, chosen: product.includes(item.label) })))
    if (price) setPriceFilter({ min: price.min, max: price.max })
    firstRenderRef.current = false
  }, [])

  useEffect(() => {
    if (!firstRenderRef.current) {
      const filters: IFilters = {
        metal: getChosenCategory<MetalsType>(metals),
        stones: getChosenCategory<StoneType>(stones),
        product: getChosenCategory<ProductType>(productType),
      }
      if (priceFilter) filters.price = priceFilter
      dispatch(FilterActions.addCategory(filters))
      dispatch(fetchProducts({
        collection: filters.product?.[0] ?? 'rings',
        queries: buildQueryConstraints(filters),
      }))
    }
  }, [dispatch, metals, stones, productType, priceFilter])

  return {
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
  }
}
