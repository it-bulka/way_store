import { type FC, HTMLAttributes } from 'react'
import cls from './Button.module.scss'
import classnames from 'classnames'

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  className?: string
  title: string
  type?: 'submit' | 'button'
}
export const Button: FC<ButtonProps> = ({ className, title, type = 'button', ...props }) => {
  return (
    <button className={classnames(cls.button, [className])} type={type} {...props}>
      {title}
    </button>
  )
}
