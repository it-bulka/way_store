import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { where } from 'firebase/firestore'
import { type IOption as IDropdownOption } from '@/components/ui/Dropdown/Dropdown'
import { type IGetRange } from '@/components/ui/RangeSlider/RangeSlider'
import { useAppDispatch } from '@/hooks/reduxHooks'
import { FilterActions } from '@/redux/reducers'
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

type ClientSideFilters = { stones?: StoneType[] }

// Firestore allows only ONE array-contains-any per query.
// Priority: metal > stones. When both are active, stones falls back to client-side.
function buildQueryConstraints(fc: IFilters): QueryFieldFilterConstraint[] | undefined {
  const filters: QueryFieldFilterConstraint[] = []

  if (fc.metal?.length) {
    filters.push(where('metal', 'array-contains-any', fc.metal))
  } else if (fc.stones?.length) {
    filters.push(where('stones', 'array-contains-any', fc.stones))
  }

  if (fc.price) {
    filters.push(where('price.amount', '>=', fc.price.min))
    filters.push(where('price.amount', '<=', fc.price.max))
  }

  return filters.length ? filters : undefined
}

function buildClientSideFilters(fc: IFilters): ClientSideFilters {
  if (fc.metal?.length && fc.stones?.length) return { stones: fc.stones }
  return {}
}

export const useProductFilters = () => {
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const firstRenderRef = useRef(true)
  const priceDebounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const urlProduct = useMemo(() => searchParams.getAll('product') as ProductType[], [])
  const urlMetal   = useMemo(() => searchParams.getAll('metal')   as MetalsType[],  [])
  const urlStones  = useMemo(() => searchParams.getAll('stones')  as StoneType[],   [])
  const urlPriceRaw = searchParams.get('price')
  const urlPrice = useMemo<FilterPrice | null>(
    () => urlPriceRaw
      ? { min: Number(urlPriceRaw.split('-')[0]), max: Number(urlPriceRaw.split('-')[1]) }
      : null,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const [metals, setMetals] = useState(() =>
    metalsOptions.map(opt => ({ ...opt, chosen: urlMetal.includes(opt.label as MetalsType) }))
  )
  const [stones, setStones] = useState(() =>
    stonesOptions.map(opt => ({ ...opt, chosen: urlStones.includes(opt.label as StoneType) }))
  )
  const [productType, setProductType] = useState(() =>
    productOptions.map(opt => ({ ...opt, chosen: urlProduct.includes(opt.label as ProductType) }))
  )
  const [priceFilter, setPriceFilter] = useState<FilterPrice | null>(urlPrice)

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

  const getRange: IGetRange = useCallback((min, max) => {
    clearTimeout(priceDebounceRef.current)
    priceDebounceRef.current = setTimeout(() => setPriceFilter({ min, max }), 400)
  }, [])

  const resetFilters = useCallback(() => {
    setMetals(prev => resetArr(prev))
    setStones(prev => resetArr(prev))
    setProductType(prev => resetArr(prev))
    setPriceFilter(null)
  }, [])

  const chosenProductType = useMemo(
    () => getChosenCategory<ProductType>(productType)[0] ?? null,
    [productType]
  )

  const activeFilters = useMemo<IFilters>(
    () => ({
      metal: getChosenCategory<MetalsType>(metals),
      stones: getChosenCategory<StoneType>(stones),
      product: getChosenCategory<ProductType>(productType),
      price: priceFilter ?? undefined,
    }),
    [metals, stones, productType, priceFilter]
  )

  const queries = useMemo(() => buildQueryConstraints(activeFilters), [activeFilters])

  const clientSideFilters = useMemo(() => buildClientSideFilters(activeFilters), [activeFilters])

  useEffect(() => {
    firstRenderRef.current = false
  }, [])

  useEffect(() => {
    if (!firstRenderRef.current) dispatch(FilterActions.addCategory(activeFilters))
  }, [dispatch, activeFilters])

  useEffect(() => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev)

      const chosenProduct = getChosenCategory<ProductType>(productType)
      next.delete('product')
      chosenProduct.forEach(v => next.append('product', v))

      const chosenMetal = getChosenCategory<MetalsType>(metals)
      next.delete('metal')
      chosenMetal.forEach(v => next.append('metal', v))

      const chosenStones = getChosenCategory<StoneType>(stones)
      next.delete('stones')
      chosenStones.forEach(v => next.append('stones', v))

      if (priceFilter) next.set('price', `${priceFilter.min}-${priceFilter.max}`)
      else next.delete('price')

      return next
    }, { replace: true })
  }, [activeFilters])

  return {
    metals,
    stones,
    productType,
    priceFilter,
    chosenProductType,
    collection: chosenProductType,
    queries,
    clientSideFilters,
    onMetalsChecked,
    onStonesChecked,
    onProductChecked,
    getRange,
    resetFilters,
  }
}
