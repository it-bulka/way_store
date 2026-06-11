import { FormEvent, InputHTMLAttributes, ReactNode, useId, useState } from 'react'
import cls from './Input.module.scss'
import classnames from 'classnames'
import { FieldValues } from 'react-hook-form/dist/types/fields'
import { IRegister } from '@/models'

type InputVal = string | undefined
type InputSetter = <T>(a: T) => void

interface InputProps<T extends FieldValues | undefined = undefined>
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'name'>,
    IRegister<T> {
  className?: string
  type?: string
  label?: string
  placeholder?: string
  defaultValue?: string
  value?: string
  onChange?: InputSetter
  addendum?: ReactNode
  onAddendumClick?: InputSetter
  error?: string
}

export function Input<T extends FieldValues | undefined = undefined>({
  className,
  type = 'text',
  label,
  placeholder,
  defaultValue,
  value: inputValue,
  name,
  onChange,
  addendum,
  onAddendumClick,
  error,
  register,
  ...props
}: InputProps<T>) {
  const [value, setValue] = useState<InputVal>(inputValue || defaultValue)
  const [isFieldFocused, setFieldFocused] = useState(false)
  const id = useId()

  const changeHandler = (e: FormEvent<HTMLInputElement>) => {
    onChange ? onChange(setInputValue) : setValue((e.target as HTMLInputElement).value)

    if (register && name) {
      register(name).onChange(e)
    }
  }

  const setInputValue = (value: InputVal) => {
    setValue(value)
  }

  const addendumClickHandler = () => {
    onAddendumClick && onAddendumClick(setInputValue)
  }

  return (
    <div className={classnames(cls.wrapper, [className])}>
      <div className={cls.input}>
        {label && (
          <label
            htmlFor={id + name}
            className={classnames({ [cls.label]: !!value || isFieldFocused })}
          >
            {label}
          </label>
        )}
        <input
          type={type}
          {...props}
          id={id + name}
          {...(register ? register(name) : {})}
          name={name}
          value={value}
          onChange={changeHandler}
          onBlur={() => setFieldFocused(false)}
          onFocus={() => setFieldFocused(true)}
          placeholder={placeholder}
          autoComplete="new-password"
          aria-invalid={!!error}
        />
        {addendum && <button onClick={addendumClickHandler}>{addendum}</button>}
      </div>
      {error && !isFieldFocused && (
        <p role="alert" className={cls.error}>
          {error}
        </p>
      )}
    </div>
  )
}
