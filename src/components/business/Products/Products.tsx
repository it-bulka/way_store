import { type FC, useEffect, useState } from 'react'
import { where } from 'firebase/firestore'
import cls from './Products.module.scss'
import { ProductsList } from '@/components/business/ProductsList/ProductsList'
import { type IGetRange, RangeSlider } from '@/components/ui/RangeSlider/RangeSlider'
import { BreadCrumbs } from '@/components/ui/Breadcrumbs/BreadCrumbs'
import { Dropdown, type IOption as IDropdownOption } from '@/components/ui/Dropdown/Dropdown'
import classnames from 'classnames'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { getProducts } from '@/redux/selectors/getProducts'
import { fetchProducts } from '@/redux/async/fetchProducts'
import { FilterActions } from '@/redux/reducers'
import { getFilterCategories } from '@/redux/selectors'
import { FilterPrice, IFilters } from '@/redux/reducers/filterCategorySlice.ts'
import { QueryFieldFilterConstraint } from '@firebase/firestore'
import { Absent } from '@/components/ui/Absent/Absent.tsx'
import type { StoneType, ProductType, MetalsType } from '@/models'

interface ProductsProps {
  className?: string
}

type FilterTypes = MetalsType | StoneType | ProductType
type GoodsDropdownType<T extends FilterTypes = FilterTypes> = IDropdownOption<T>[]

const metalsOptions: IDropdownOption<MetalsType>[] = [
  { id: '1', label: 'gold', chosen: false },
  { id: '2', label: 'silver', chosen: false },
  { id: '3', label: 'platinum', chosen: false },
  { id: '4', label: 'stainless steel', chosen: false },
]

const stonesOptions: IDropdownOption<StoneType>[] = [
  { id: '1', label: 'diamonds', chosen: false },
  { id: '2', label: 'sapphires', chosen: false },
  { id: '3', label: 'rubies', chosen: false },
  { id: '4', label: 'amethysts', chosen: false },
  { id: '5', label: 'topazes', chosen: false },
  { id: '6', label: 'aquamarines', chosen: false },
  { id: '7', label: 'pearls', chosen: false },
  { id: '8', label: 'garnets', chosen: false },
  { id: '9', label: 'opals', chosen: false },
]

const productOptions: IDropdownOption<ProductType>[] = [
  { id: '1', label: 'rings', chosen: false },
  { id: '2', label: 'necklaces', chosen: false },
  { id: '3', label: 'bracelets', chosen: false },
  { id: '4', label: 'earrings', chosen: false },
  { id: '5', label: 'pendants', chosen: false },
  { id: '6', label: 'watches', chosen: false },
  { id: '7', label: 'cufflinks', chosen: false },
  { id: '8', label: 'chains', chosen: false },
]

export const Products: FC<ProductsProps> = ({ className }) => {
  const products = useAppSelector(getProducts)
  const filterCategories = useAppSelector(getFilterCategories)
  const [metals, setMetals] = useState(metalsOptions)
  const [stones, setStones] = useState(stonesOptions)
  const [productType, setProductType] = useState(productOptions)
  const [priceFilter, setPriceFilter] = useState<FilterPrice | null>(null)
  const dispatch = useAppDispatch()

  const getFilters = (): QueryFieldFilterConstraint[] | undefined => {
    const filters: QueryFieldFilterConstraint[] = []

    const setQueries = (category: keyof Omit<IFilters, 'price'>) => {
      filterCategories?.[category]?.forEach(item => {
        filters.push(where(category, 'array-contains', item))
      })
    }
    setQueries('metal')
    setQueries('stones')
    setQueries('product')

    const setPriceParam = (): void => {
      const price: FilterPrice | undefined = filterCategories.price
      if (price) {
        filters.push(where('price', '>=', filterCategories.price!.min))
        filters.push(where('price', '>=', filterCategories.price!.min))
      }
    }

    setPriceParam()

    return filters.length ? filters : undefined
  }

  useEffect(() => {
    const queries = getFilters()
    dispatch(fetchProducts({ collection: 'rings', queries }))
  }, [filterCategories])

  function onCategoryChecked<T extends string>(
    id: string,
    status: boolean,
    categories: IDropdownOption<T>[]
  ): IDropdownOption<T>[] {
    return categories.map(item => {
      if (item.id === id) return { ...item, chosen: status }

      return item
    })
  }

  const onProductChecked = (id: string, status: boolean) => {
    const category = onCategoryChecked<ProductType>(id, status, productType)
    setProductType(category)
  }

  const onMetalsChecked = (id: string, status: boolean) => {
    const m = onCategoryChecked<MetalsType>(id, status, metals)
    setMetals(m)
  }

  const onStonesChecked = (id: string, status: boolean) => {
    const categories = onCategoryChecked<StoneType>(id, status, stones)
    setStones(categories)
  }

  function getChosenCategory<T extends string>(categories: IDropdownOption<T>[]): T[] {
    return categories.filter(item => item.chosen).map(item => item.label)
  }

  const setFilters = () => {
    const metalsFilters = getChosenCategory<MetalsType>(metals)
    const stonesFilters = getChosenCategory<StoneType>(stones)
    const productFilters = getChosenCategory<ProductType>(productType)
    const filters: IFilters = {
      metal: metalsFilters,
      stones: stonesFilters,
      product: productFilters,
    }

    if (priceFilter) {
      filters.price = priceFilter
    }

    dispatch(FilterActions.addCategory(filters))
  }

  const getRange: IGetRange = (min, max) => {
    setPriceFilter({ min, max })
  }

  const resetFilters = () => {
    function reset<T extends GoodsDropdownType>(arr: T): T {
      return arr.map(item => ({ ...item, chosen: false })) as T
    }

    setMetals(reset(metals))
    setStones(reset(stones))
    setProductType(reset(productType))
    setPriceFilter(null)
  }

  useEffect(() => {
    setFilters()
  }, [metals, stones, productType, priceFilter])

  return (
    <div className={classnames(cls.products, [className])}>
      <BreadCrumbs />
      <div className={cls.filters}>
        <div className={cls.dropdowns}>
          <Dropdown title="ИЗДЕЛИЕ" options={productType} onChangeChecked={onProductChecked} />
          <Dropdown title="МЕТАЛЛ" options={metals} onChangeChecked={onMetalsChecked} />
          <Dropdown title="КАМНИ" options={stones} onChangeChecked={onStonesChecked} />
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
        <ProductsList products={products} title={'КОЛЬЦА'} />
      )}
    </div>
  )
}
