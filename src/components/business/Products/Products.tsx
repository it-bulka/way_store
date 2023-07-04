import { type FC, useEffect } from 'react'
import cls from './Products.module.scss'
import { ProductsList } from '@/components/business/ProductsList/ProductsList'
import { RangeSlider } from '@/components/ui/RangeSlider/RangeSlider'
import { BreadCrumbs } from '@/components/ui/Breadcrumbs/BreadCrumbs'
import { Dropdown } from '@/components/ui/Dropdown/Dropdown'
import classnames from 'classnames'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { getProducts } from '@/redux/selectors/getProducts'
import { fetchProducts } from '@/redux/async/fetchProducts'

interface ProductsProps {
  className?: string
}

const checks = ['option 1', 'option 2', 'option 3']

export const Products: FC<ProductsProps> = ({ className }) => {
  const products = useAppSelector(getProducts)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!products || !products.length) {
      dispatch(fetchProducts('rings'))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={classnames(cls.products, [className])}>
      <BreadCrumbs />
      <div className={cls.filters}>
        <div className={cls.dropdowns}>
          <Dropdown title="ИЗДЕЛИЕ" options={checks} />
          <Dropdown title="МЕТАЛЛ" options={checks} />
          <Dropdown title="КАМНИ" options={checks} />
        </div>
        <div className={cls.slider}>
          <RangeSlider />
        </div>
      </div>
      <ProductsList products={products} title={'КОЛЬЦА'} />
    </div>
  )
}
