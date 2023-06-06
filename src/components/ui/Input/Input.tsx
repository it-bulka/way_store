import { type FC, FormEvent, HTMLAttributes, ReactNode, useId, useState } from 'react'
import cls from './Input.module.scss'

type InputVal = string | undefined
type InputSetter = <T>(a: T) => void

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  className?: string
  type?: string
  label?: string
  placeholder?: string
  defaultValue?: string
  name: string
  onChange?: InputSetter
  addendum?: ReactNode
  onAddendumClick?: InputSetter
}

export const Input: FC<InputProps> = ({
  className = '',
  type = 'text',
  label,
  placeholder,
  defaultValue,
  name,
  onChange,
  addendum,
  onAddendumClick,
  ...props
}) => {
  const [value, setValue] = useState<InputVal>(defaultValue)
  const id = useId()

  const changeHandler = (e: FormEvent<HTMLInputElement>) => {
    onChange ? onChange(setInputValue) : setValue((e.target as HTMLInputElement).value)
  }

  const setInputValue = (value: InputVal) => {
    setValue(value)
  }

  const addendumClickHandler = () => {
    onAddendumClick && onAddendumClick(setInputValue)
  }

  return (
    <div className={cls.input + ' ' + className}>
      {label && <label htmlFor={id + name}>{label}</label>}
      <input
        type={type}
        {...props}
        id={id + name}
        name={name}
        value={value}
        onChange={changeHandler}
        placeholder={placeholder}
      />
      {addendum && <button onClick={addendumClickHandler}>{addendum}</button>}
    </div>
  )
}
