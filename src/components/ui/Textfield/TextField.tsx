import { type FC, HTMLAttributes, useId } from 'react'
import cls from './TextField.module.scss'
import { useInput, type InitialInputValue } from '@/hooks/useInput'

interface TextFieldProps extends HTMLAttributes<HTMLTextAreaElement> {
  className?: string
  initialValue?: InitialInputValue
  label?: string
  name: string
}
export const TextField: FC<TextFieldProps> = ({ className = '', initialValue, label }) => {
  const [value, onChange] = useInput(initialValue)
  const id = useId()

  return (
    <div className={cls.textfield + ' ' + className}>
      {label && <label htmlFor={id}>{label}</label>}
      <textarea value={value} onChange={onChange} id={id} />
    </div>
  )
}
