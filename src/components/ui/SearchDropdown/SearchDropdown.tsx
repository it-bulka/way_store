import { memo, type FC } from 'react'
import { Link } from 'react-router-dom'
import cls from './SearchDropdown.module.scss'
import type { IProduct } from '@/models/goodsType'
import { PRODUCT_TYPE_LABELS } from '@/models/goodsType'

interface SearchDropdownProps {
  results: IProduct[]
  loading: boolean
  onSelect: () => void
}

export const SearchDropdown: FC<SearchDropdownProps> = memo(({ results, loading, onSelect }) => {
  if (loading) {
    return (
      <div className={cls.dropdown}>
        <p className={cls.status}>Пошук...</p>
      </div>
    )
  }

  if (!results.length) {
    return (
      <div className={cls.dropdown}>
        <p className={cls.status}>Нічого не знайдено</p>
      </div>
    )
  }

  return (
    <div className={cls.dropdown}>
      {results.map(product => (
        <Link
          key={product.id}
          to={`/store/${product.id}?category=${product.category}`}
          className={cls.item}
          onClick={onSelect}
        >
          <img src={product.images.white[0]} alt={product.name} className={cls.thumbnail} />
          <div className={cls.info}>
            <p className={cls.name}>{product.name}</p>
            <p className={cls.meta}>{PRODUCT_TYPE_LABELS[product.category]}</p>
          </div>
          <span className={cls.price}>
            {product.price.amount} {product.price.currency}
          </span>
        </Link>
      ))}
    </div>
  )
})

SearchDropdown.displayName = 'SearchDropdown'
