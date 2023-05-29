import { type FC } from 'react'
import cls from './Products.module.scss'
import { ProductsList } from '@/components/business/ProductsList/ProductsList'
import { products } from '@/data/products'
import { RangeSlider } from '@/components/ui/RangeSlider/RangeSlider'

interface ProductsProps {
  className?: string
}
export const Products: FC<ProductsProps> = ({ className = '' }) => {
  return (
    <div className={cls.products + ' ' + className}>
      <RangeSlider />
      <ProductsList products={products} title={'КОЛЬЦА'} />
    </div>
  )
}
