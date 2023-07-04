import { type FC, HTMLAttributes } from 'react'
import cls from './Button.module.scss'
import classnames from 'classnames'

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  className?: string
  title: string
  type?: 'submit' | 'button'
  disabled?: boolean
}
export const Button: FC<ButtonProps> = ({
  className,
  title,
  type = 'button',
  disabled = false,
  ...props
}) => {
  return (
    <button
      className={classnames(cls.button, [className], { [cls.disabled]: disabled })}
      type={type}
      {...props}
      disabled={disabled}
    >
      {title}
    </button>
  )
}
