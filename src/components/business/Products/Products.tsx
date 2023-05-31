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
const checks = ['option _1', 'option _2', 'option _3']

export const Products: FC<ProductsProps> = ({ className = '' }) => {
  return (
    <div className={cls.products + ' ' + className}>
      <BreadCrumbs crumbs={temporalCrumbs} />
      <Dropdown title={'КОЛЬЦА'} options={checks} />
      <RangeSlider />
      <ProductsList products={products} title={'КОЛЬЦА'} />
    </div>
  )
}
