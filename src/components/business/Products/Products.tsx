import { type FC } from 'react'
import cls from './Products.module.scss'
import { ProductsList } from '@/components/business/ProductsList/ProductsList'
import { products } from '@/data/products'
import { RangeSlider } from '@/components/ui/RangeSlider/RangeSlider'
import { BreadCrumbs } from '@/components/ui/Breadcrumbs/BreadCrumbs'
import { Dropdown } from '@/components/ui/Dropdown/Dropdown'

interface ProductsProps {
  className?: string
}

const temporalCrumbs: string[] = ['Главная', 'Магазин', 'Кольца']
const checks = ['option 1', 'option 2', 'option 3']

export const Products: FC<ProductsProps> = ({ className = '' }) => {
  return (
    <div className={cls.products + ' ' + className}>
      <BreadCrumbs crumbs={temporalCrumbs} />
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
