import { type FC } from 'react'
import cls from './Button.module.scss'

interface ButtonProps {
  className?: string
  title: string
}
export const Button: FC<ButtonProps> = ({ className, title }) => {
  return <button className={cls.button + ' ' + className}>{title}</button>
}
