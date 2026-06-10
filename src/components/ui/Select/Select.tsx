import { useState } from 'react'
import cls from './Select.module.scss'
import ArrowIcon from '@/assets/general/arrow.svg'
import CloseIcon from '@/assets/general/close.svg'
import { useToggle } from '@/hooks/useToggle'
import classnames from 'classnames'
import type { FieldValues, UseFormRegister } from 'react-hook-form'
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
  onClear?: () => void
  options: Options
}

export function Select<T extends FieldValues | undefined = undefined>({
  className = '',
  initialValue = 'День',
  onChose,
  onClear,
  register,
  name,
  options,
}: SelectProps<T>) {
  const [chosen, setChosen] = useState<SelectOption | null>(null)
  const [isOpen, setOpen] = useToggle(false)

  function onItemClick(item: SelectOption) {
    setChosen(item)
    setOpen(false)
    onChose && onChose(item)

    if (register && name) {
      ;(register as UseFormRegister<FieldValues>)(name as string, { value: item.value })
    }
  }

  function onClearClick() {
    setChosen(null)
    setOpen(false)
    onClear && onClear()
  }

  const isSelected = (item: SelectOption) => {
    if (chosen) {
      return chosen.value === item.value
    }
    return false
  }

  return (
    <div className={classnames(cls.select, { className, [cls.opened]: isOpen })}>
      <div className={cls.control}>
        <button type="button" onClick={() => setOpen()} className={cls.toggleBtn}>
          <p>{chosen?.label || initialValue}</p>
          <ArrowIcon />
        </button>
        {chosen && onClear && (
          <button type="button" className={cls.clearBtn} onClick={onClearClick}>
            <CloseIcon />
          </button>
        )}
      </div>
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
