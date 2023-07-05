import { type FC, HTMLAttributes } from 'react'
import cls from './Checkbox.module.scss'
import { useToggle } from '@/hooks/useToggle'
import classnames from 'classnames'

interface CheckInputProps extends HTMLAttributes<HTMLInputElement> {
  className?: string
  label?: string
  checked?: boolean
  onChecked?: (isChecked: boolean) => void
}
export const Checkbox: FC<CheckInputProps> = ({
  className,
  label,
  checked = false,
  onChecked,
  ...props
}) => {
  const [isChecked, toggleChecked] = useToggle(checked)

  const checkHandler = () => {
    onChecked && onChecked(!isChecked)
    toggleChecked()
  }
  return (
    <label className={classnames(cls.checkbox, [className])}>
      <input type="checkbox" checked={isChecked} onChange={checkHandler} {...props} />
      <span className={cls.checkmark}></span>
      {label && <span>{label}</span>}
    </label>
  )
}
