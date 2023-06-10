import { type FC, useState } from 'react'
import cls from './Select.module.scss'
import ArrowIcon from '@/assets/general/arrow.svg'
import { useToggle } from '@/hooks/useToggle'
import classnames from 'classnames'

interface SelectProps {
  className?: string
  initialValue?: string
  onChose?: <T>(chosen: T) => void
}

const options = ['пн', 'вт', 'ср', 'чт', 'сб', 'нд']
export const Select: FC<SelectProps> = ({ className = '', initialValue = 'День', onChose }) => {
  const [chosen, setChosen] = useState<string | null>(null)
  const [isOpen, setOpen] = useToggle(false)

  const onItemClick = (item: string) => {
    setChosen(item)
    onChose && onChose(item)
  }

  const isSelected = (item: string) => {
    if (chosen) {
      return chosen === item
    }
    return false
  }

  return (
    <div className={classnames(cls.select, { className, [cls.opened]: isOpen })}>
      <p>{chosen || initialValue}</p>
      <button onClick={() => setOpen()}>
        <ArrowIcon />
      </button>
      {isOpen && (
        <ul className={cls.options}>
          {options.map(item => (
            <li
              onClick={() => onItemClick(item)}
              onKeyDown={() => onItemClick(item)}
              key={item}
              role="option"
              aria-selected={isSelected(item)}
              aria-labelledby={item}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
