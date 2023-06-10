import { type FC, HTMLAttributes } from 'react'
import cls from '@/components/ui/Checkbox/Checkbox.module.scss'
import classnames from 'classnames' //the same styling

interface RadioBtnProps extends HTMLAttributes<HTMLInputElement> {
  className?: string
  label?: string
  checked?: boolean
  onChecked?: () => void
  value: string
}
export const RadioBtn: FC<RadioBtnProps> = ({
  className,
  label,
  checked,
  onChecked,
  value,
  ...props
}) => {
  return (
    <label className={classnames(cls.checkbox, [className])}>
      <input
        type="radio"
        checked={checked}
        onChange={() => onChecked?.()}
        {...props}
        value={value}
      />
      <span className={cls.checkmark}></span>
      {label && <span>{label}</span>}
    </label>
  )
}
