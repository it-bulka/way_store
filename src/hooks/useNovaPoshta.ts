import { useCallback, useRef, useState } from 'react'
import { searchNPCities, getNPWarehouses } from '@/services/novaposhta'
import type { INPCity, INPWarehouse } from '@/services/novaposhta'

export const useNovaPoshta = () => {
  const [cities, setCities] = useState<INPCity[]>([])
  const [warehouses, setWarehouses] = useState<INPWarehouse[]>([])
  const timer = useRef<ReturnType<typeof setTimeout>>()

  const searchCities = useCallback((query: string) => {
    clearTimeout(timer.current)
    if (query.length < 2) {
      setCities([])
      return
    }
    timer.current = setTimeout(async () => {
      setCities(await searchNPCities(query))
    }, 300)
  }, [])

  const loadWarehouses = useCallback(async (cityRef: string) => {
    setWarehouses([])
    setWarehouses(await getNPWarehouses(cityRef))
  }, [])

  const clearCities = useCallback(() => setCities([]), [])
  const clearWarehouses = useCallback(() => setWarehouses([]), [])

  return { cities, warehouses, searchCities, loadWarehouses, clearCities, clearWarehouses }
}
