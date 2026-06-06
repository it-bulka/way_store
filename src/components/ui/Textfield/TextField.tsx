import { HTMLAttributes, useId } from 'react'
import cls from './TextField.module.scss'
import { useInput, type InitialInputValue } from '@/hooks/useInput'
import classnames from 'classnames'
import { FieldValues } from 'react-hook-form/dist/types/fields'
import { IRegister } from '@/models'

interface TextFieldProps<T extends FieldValues | undefined = undefined>
  extends HTMLAttributes<HTMLTextAreaElement>,
    IRegister<T> {
  className?: string
  initialValue?: InitialInputValue
  label?: string
}
export function TextField<T extends FieldValues | undefined = undefined>({
  className,
  initialValue,
  label,
  register,
  name,
}: TextFieldProps<T>) {
  const [value, onChange] = useInput(initialValue)
  const id = useId()

  return (
    <div className={classnames(cls.textfield, [className])}>
      {label && <label htmlFor={id}>{label}</label>}
      <textarea value={value} {...(register && register(name))} onChange={onChange} id={id} />
    </div>
  )
}
