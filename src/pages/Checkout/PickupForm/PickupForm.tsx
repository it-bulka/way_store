import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useWatch } from 'react-hook-form'
import type { Control, UseFormSetValue, UseFormRegister, FieldErrors } from 'react-hook-form'
import cls from './PickupForm.module.scss'
import { CityCombobox } from './CityCombobox'
import { Select } from '@/components/ui/Select/Select'
import { usePickupForm } from './usePickupForm'
import type { IPickupFormValues } from '../schema'

interface PickupFormProps {
  control: Control<IPickupFormValues>
  register: UseFormRegister<IPickupFormValues>
  setValue: UseFormSetValue<IPickupFormValues>
  errors: FieldErrors<IPickupFormValues>
}

export const PickupForm: FC<PickupFormProps> = ({ control, register, setValue, errors }) => {
  const { t } = useTranslation('checkout')
  const {
    cities,
    showSuggestions,
    warehouseOptions,
    handleCityChange,
    handleCityBlur,
    handleCitySelect,
    handleCityClear,
    handleWarehouseSelect,
    handleWarehouseClear,
  } = usePickupForm(setValue)

  const cityRef = useWatch({ control, name: 'cityRef' })

  return (
    <div className={cls.root}>
      <p className={cls.npLabel}>{t('pickup.novaPoshta')}</p>
      <CityCombobox
        control={control}
        placeholder={t('pickup.city')}
        error={errors.cityName?.message ?? errors.cityRef?.message}
        cities={cities}
        showSuggestions={showSuggestions}
        onChange={handleCityChange}
        onBlur={handleCityBlur}
        onSelect={handleCitySelect}
        onClear={handleCityClear}
      />
      <input type="hidden" {...register('cityRef')} />
      <input type="hidden" {...register('warehouseAddress')} />
      <div className={cls.warehouseWrapper}>
        <Select
          key={cityRef}
          options={warehouseOptions}
          initialValue={t('pickup.warehouse')}
          onChose={handleWarehouseSelect}
          onClear={handleWarehouseClear}
        />
        {errors.warehouseRef && <p className={cls.error}>{errors.warehouseRef.message}</p>}
      </div>
    </div>
  )
}
