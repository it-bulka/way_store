import { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import type { UseFormSetValue } from 'react-hook-form'
import { useNovaPoshta } from '@/hooks/useNovaPoshta'
import type { SelectOption } from '@/components/ui/Select/Select'
import type { IPickupFormValues } from '../schema'

export const usePickupForm = (setValue: UseFormSetValue<IPickupFormValues>) => {
  const { cities, warehouses, searchCities, loadWarehouses, clearCities, clearWarehouses } =
    useNovaPoshta()
  const [showSuggestions, setShowSuggestions] = useState(false)
  const blurTimer = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => () => clearTimeout(blurTimer.current), [])

  const handleCityChange = useCallback(
    (value: string) => {
      searchCities(value)
      setShowSuggestions(true)
      setValue('cityRef', '')
      setValue('warehouseRef', '')
      setValue('warehouseAddress', '')
    },
    [searchCities, setValue]
  )

  const handleCityBlur = useCallback(() => {
    blurTimer.current = setTimeout(() => setShowSuggestions(false), 150)
  }, [])

  const handleCitySelect = useCallback(
    (ref: string, name: string) => {
      clearTimeout(blurTimer.current)
      setValue('cityName', name, { shouldValidate: true })
      setValue('cityRef', ref, { shouldValidate: true })
      setValue('warehouseRef', '', { shouldValidate: false })
      setValue('warehouseAddress', '')
      setShowSuggestions(false)
      loadWarehouses(ref)
    },
    [setValue, loadWarehouses]
  )

  const handleCityClear = useCallback(() => {
    clearTimeout(blurTimer.current)
    setValue('cityName', '')
    setValue('cityRef', '')
    setValue('warehouseRef', '')
    setValue('warehouseAddress', '')
    clearCities()
    clearWarehouses()
    setShowSuggestions(false)
  }, [setValue, clearCities, clearWarehouses])

  const warehouseOptions = useMemo<SelectOption[]>(
    () => warehouses.map(w => ({ id: w.Ref, label: w.Description, value: w.Ref })),
    [warehouses]
  )

  const handleWarehouseSelect = useCallback(
    (option: SelectOption) => {
      setValue('warehouseRef', option.value as string, { shouldValidate: true })
      setValue('warehouseAddress', option.label)
    },
    [setValue]
  )

  const handleWarehouseClear = useCallback(() => {
    setValue('warehouseRef', '', { shouldValidate: false })
    setValue('warehouseAddress', '')
  }, [setValue])

  return {
    cities,
    showSuggestions,
    warehouseOptions,
    handleCityChange,
    handleCityBlur,
    handleCitySelect,
    handleCityClear,
    handleWarehouseSelect,
    handleWarehouseClear,
  }
}
