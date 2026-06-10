import { FC } from 'react'
import { Controller } from 'react-hook-form'
import type { Control } from 'react-hook-form'
import cls from './CityCombobox.module.scss'
import CloseIcon from '@/assets/general/close.svg'
import type { INPCity } from '@/services/novaposhta'
import type { IPickupFormValues } from '../schema'

interface CityComboboxProps {
  control: Control<IPickupFormValues>
  error?: string
  cities: INPCity[]
  showSuggestions: boolean
  onChange: (value: string) => void
  onBlur: () => void
  onSelect: (ref: string, name: string) => void
  onClear: () => void
}

export const CityCombobox: FC<CityComboboxProps> = ({
  control,
  error,
  cities,
  showSuggestions,
  onChange,
  onBlur,
  onSelect,
  onClear,
}) => (
  <Controller
    name="cityName"
    control={control}
    render={({ field }) => (
      <div className={cls.combobox}>
        <div className={cls.inputWrapper}>
          <input
            {...field}
            placeholder="МІСТО"
            autoComplete="off"
            className={cls.input}
            onChange={e => {
              field.onChange(e)
              onChange(e.target.value)
            }}
            onBlur={() => {
              field.onBlur()
              onBlur()
            }}
          />
          {field.value && (
            <button
              type="button"
              className={cls.clearBtn}
              onMouseDown={e => {
                e.preventDefault()
                onClear()
              }}
            >
              <CloseIcon />
            </button>
          )}
        </div>
        {error && <p className={cls.error}>{error}</p>}
        {showSuggestions && cities.length > 0 && (
          <ul className={cls.suggestions} role="listbox">
            {cities.map(city => (
              <li
                key={city.Ref}
                role="option"
                aria-selected={false}
                onMouseDown={() => onSelect(city.Ref, city.Present)}
                onKeyDown={e => e.key === 'Enter' && onSelect(city.Ref, city.Present)}
              >
                {city.Present}
              </li>
            ))}
          </ul>
        )}
      </div>
    )}
  />
)
