import { useState } from 'react'
import cls from './Select.module.scss'
import ArrowIcon from '@/assets/general/arrow.svg'
import { useToggle } from '@/hooks/useToggle'
import classnames from 'classnames'
import type { FieldValues } from 'react-hook-form/dist/types/fields'
import { IRegister } from '@/models'

export interface SelectOption {
  id: string
  label: string
  value: string | number
}

type Options = SelectOption[]
interface SelectProps<T extends FieldValues | undefined = undefined> extends Partial<IRegister<T>> {
  className?: string
  initialValue?: string | number
  onChose?: (chosen: SelectOption) => void
  options: Options
}

export function Select<T extends FieldValues | undefined = undefined>({
  className = '',
  initialValue = 'День',
  onChose,
  register,
  name,
  options,
}: SelectProps<T>) {
  const [chosen, setChosen] = useState<SelectOption | null>(null)
  const [isOpen, setOpen] = useToggle(false)

  function onItemClick(item: SelectOption) {
    setChosen(item)
    onChose && onChose(item)

    if (register && name) {
      register(name as any, { value: item.value })
    }
  }

  const isSelected = (item: SelectOption) => {
    if (chosen) {
      return chosen.value === item.value
    }
    return false
  }

  return (
    <div className={classnames(cls.select, { className, [cls.opened]: isOpen })}>
      <button onClick={() => setOpen()} type={'button'}>
        <p>{chosen?.label || initialValue}</p>
        <ArrowIcon />
      </button>
      {isOpen && (
        <ul className={cls.options}>
          {options.map(item => (
            <li
              onClick={() => onItemClick(item)}
              onKeyDown={() => onItemClick(item)}
              key={item.id}
              role="option"
              aria-selected={isSelected(item)}
              aria-labelledby={item.label}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
