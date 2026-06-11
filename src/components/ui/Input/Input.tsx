import { FormEvent, InputHTMLAttributes, ReactNode, useId, useMemo, useState } from 'react'
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
  const initialValue = inputValue ?? defaultValue ?? ''

  // Used only when no register (standalone controlled input)
  const [value, setValue] = useState<string>(register ? '' : initialValue)

  // Tracks whether the field has content — used only for floating label
  const [hasValue, setHasValue] = useState<boolean>(!!initialValue)

  const [isFieldFocused, setFieldFocused] = useState(false)
  const id = useId()

  const registration = useMemo(
    () => (register && name ? register(name) : null),
    [register, name]
  )

  const changeHandler = (e: FormEvent<HTMLInputElement>) => {
    const currentValue = (e.target as HTMLInputElement).value
    setHasValue(currentValue !== '')

    if (onChange) {
      onChange(setInputValue)
    } else if (!register) {
      setValue(currentValue)
    }

    if (registration) {
      registration.onChange(e)
    }
  }

  const setInputValue = (val: InputVal) => {
    const str = val ?? ''
    setHasValue(str !== '')
    if (!register) setValue(str)
  }

  const addendumClickHandler = () => {
    onAddendumClick && onAddendumClick(setInputValue)
  }

  // When register is provided → uncontrolled (defaultValue only), RHF manages value via ref
  // When no register → controlled (value state)
  const valueProps = register ? { defaultValue: initialValue } : { value }

  return (
    <div className={classnames(cls.wrapper, [className])}>
      <div className={cls.input}>
        {label && (
          <label
            htmlFor={id + name}
            className={classnames({ [cls.label]: hasValue || isFieldFocused })}
          >
            {label}
          </label>
        )}
        <input
          type={type}
          {...props}
          id={id + name}
          {...(registration ?? {})}
          name={name}
          {...valueProps}
          onChange={changeHandler}
          onBlur={(e) => {
            setFieldFocused(false)
            registration?.onBlur(e)
          }}
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
