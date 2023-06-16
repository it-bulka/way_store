import { type FC } from 'react'
import cls from './Products.module.scss'
import { ProductsList } from '@/components/business/ProductsList/ProductsList'
import { products } from '@/data/products'
import { RangeSlider } from '@/components/ui/RangeSlider/RangeSlider'
import { BreadCrumbs } from '@/components/ui/Breadcrumbs/BreadCrumbs'
import { Dropdown } from '@/components/ui/Dropdown/Dropdown'
import classnames from 'classnames'

interface ProductsProps {
  className?: string
}

console.log({ products2: products })
const checks = ['option 1', 'option 2', 'option 3']

export const Products: FC<ProductsProps> = ({ className }) => {
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
