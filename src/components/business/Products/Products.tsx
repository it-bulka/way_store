import { type FC } from 'react'
import cls from './Products.module.scss'
import { ProductsList } from '@/components/business/ProductsList/ProductsList'
import { products } from '@/data/products'
import { RangeSlider } from '@/components/ui/RangeSlider/RangeSlider'
import { BreadCrumbs } from '@/components/ui/Breadcrumbs/BreadCrumbs'

interface ProductsProps {
  className?: string
}

const temporalCrumbs: string[] = ['Главная', 'Магазин', 'Кольца']

export const Products: FC<ProductsProps> = ({ className = '' }) => {
  return (
    <div className={cls.products + ' ' + className}>
      <BreadCrumbs crumbs={temporalCrumbs} />
      <RangeSlider />
      <ProductsList products={products} title={'КОЛЬЦА'} />
    </div>
  )
}
