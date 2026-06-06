import { type FC } from 'react'
import cls from './SizeSelector.module.scss'
import classnames from 'classnames'

interface SizeSelectorProps {
  sizes: number[]
  selected?: number
  onSelect: (size: number) => void
  title?: string
}

export const SizeSelector: FC<SizeSelectorProps> = ({
  sizes,
  selected,
  onSelect,
  title = 'Розмір (мм)',
}) => (
  <div className={cls.sizeSelector}>
    <p>{title}</p>
    <div className={cls.holder}>
      {sizes.map(size => (
        <button
          key={size}
          type="button"
          className={classnames(cls.btn, { [cls.active]: selected === size })}
          onClick={() => onSelect(size)}
        >
          {size}
        </button>
      ))}
    </div>
  </div>
)
