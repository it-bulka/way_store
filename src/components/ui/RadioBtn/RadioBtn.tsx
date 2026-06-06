import { HTMLAttributes } from 'react'
import cls from '@/components/ui/Checkbox/Checkbox.module.scss'
import classnames from 'classnames' //the same styling
import type { IRegister } from '@/models'
import { FieldValues } from 'react-hook-form/dist/types/fields'

interface RadioBtnProps<T extends FieldValues | undefined = undefined>
  extends HTMLAttributes<HTMLInputElement>,
    IRegister<T> {
  className?: string
  label?: string
  checked?: boolean
  onChecked?: () => void
  value: string
}
export function RadioBtn<T extends FieldValues | undefined = undefined>({
  className,
  label,
  checked,
  onChecked,
  value,
  register,
  name,
  ...props
}: RadioBtnProps<T>) {
  return (
    <label className={classnames(cls.checkbox, [className])}>
      <input
        type="radio"
        checked={checked}
        {...(register ? register(name) : {})}
        onChange={() => onChecked?.()}
        {...props}
        value={value}
      />
      <span className={cls.checkmark}></span>
      {label && <span>{label}</span>}
    </label>
  )
}
