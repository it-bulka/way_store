import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
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
  type FilterTypes,
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

function checkFilters<T extends FilterTypes>(
  arr: GoodsDropdownType<T>,
  filtersArr: T[],
  cb: Dispatch<SetStateAction<GoodsDropdownType<T>>>
): void {
  cb(arr.map(item => ({ ...item, chosen: filtersArr.includes(item.label) })))
}

function resetArr<T extends GoodsDropdownType>(arr: T): T {
  return arr.map(item => ({ ...item, chosen: false })) as T
}

export const useProductFilters = () => {
  const dispatch = useAppDispatch()
  const filterCategories = useAppSelector(getFilterCategories)
  const firstRenderRef = useRef(true)

  const [metals, setMetals] = useState(metalsOptions)
  const [stones, setStones] = useState(stonesOptions)
  const [productType, setProductType] = useState(productOptions)
  const [priceFilter, setPriceFilter] = useState<FilterPrice | null>(null)

  const getFilters = (fc: IFilters): QueryFieldFilterConstraint[] | undefined => {
    const filters: QueryFieldFilterConstraint[] = []

    const push = (category: keyof Omit<IFilters, 'price'>) => {
      const arr: FilterTypes[] = fc?.[category] ? [...(fc[category] as FilterTypes[])] : []
      if (arr.length) filters.push(where(category, 'array-contains-any', arr))
    }

    push('metal')
    push('stones')
    push('product')

    if (fc.price) {
      filters.push(where('price', '>=', fc.price.min))
      filters.push(where('price', '<=', fc.price.max))
    }

    return filters.length ? filters : undefined
  }

  const dispatchProducts = (fc: IFilters): void => {
    const queries = getFilters(fc)
    const chosen = getChosenCategory<ProductType>(productType)[0] ?? 'rings'
    dispatch(fetchProducts({ collection: chosen, queries }))
  }

  const setFilters = (): IFilters => {
    const filters: IFilters = {
      metal: getChosenCategory<MetalsType>(metals),
      stones: getChosenCategory<StoneType>(stones),
      product: getChosenCategory<ProductType>(productType),
    }
    if (priceFilter) filters.price = priceFilter
    dispatch(FilterActions.addCategory(filters))
    return filters
  }

  const onMetalsChecked = (id: string, status: boolean) =>
    setMetals(onCategoryChecked<MetalsType>(id, status, metals))

  const onStonesChecked = (id: string, status: boolean) =>
    setStones(onCategoryChecked<StoneType>(id, status, stones))

  const onProductChecked = (id: string, status: boolean) =>
    setProductType(onCategoryChecked<ProductType>(id, status, productType))

  const getRange: IGetRange = (min, max) => setPriceFilter({ min, max })

  const resetFilters = () => {
    setMetals(resetArr(metals))
    setStones(resetArr(stones))
    setProductType(resetArr(productType))
    setPriceFilter(null)
  }

  useEffect(() => {
    const { metal, stones: stonesFilter, product, price } = filterCategories
    metal?.length && checkFilters(metals, metal, setMetals)
    stonesFilter?.length && checkFilters(stones, stonesFilter, setStones)
    product?.length && checkFilters(productType, product, setProductType)
    price && setPriceFilter({ min: price.min, max: price.max })
    firstRenderRef.current = false
  }, [])

  useEffect(() => {
    if (!firstRenderRef.current) {
      const filters = setFilters()
      dispatchProducts(filters)
    }
  }, [metals, stones, productType, priceFilter])

  const chosenProductType = getChosenCategory<ProductType>(productType)[0] ?? 'rings'

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
