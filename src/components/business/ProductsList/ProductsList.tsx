import { type FC } from 'react'
import cls from './ProductsList.module.scss'
import { type IProduct, ProductCard } from '@/components/ui/ProductCard/ProductCard'

interface ProductsListProps {
  className?: string
  products: Array<IProduct>
  title?: string
}
export const ProductsList: FC<ProductsListProps> = ({ className = '', products, title }) => {
  return (
    <div className={cls.productsList + ' ' + className}>
      {title && <h3 className={cls.title}>{title}</h3>}
      <div className={cls.list}>
        {products.map(({ img, title, price, id }) => (
          <ProductCard img={img} title={title} price={price} key={id} />
        ))}
      </div>
    </div>
  )
}
