import { type FC } from 'react'
import cls from './ProductCardSkeleton.module.scss'
import classnames from 'classnames'

interface ProductCardSkeletonProps {
  className?: string
}

export const ProductCardSkeleton: FC<ProductCardSkeletonProps> = ({ className }) => (
  <div className={classnames(cls.skeleton, [className])}>
    <div className={cls.image} />
    <div className={cls.content}>
      <div className={cls.title} />
      <div className={cls.price} />
    </div>
  </div>
)
