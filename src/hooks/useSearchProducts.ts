import { useEffect, useState } from 'react'
import { fetchAllProducts } from '@/services/searchProducts'
import type { IProduct } from '@/models/goodsType'

const SEARCH_LIMIT = 20
const DEBOUNCE_MS = 300
const MIN_QUERY_LENGTH = 2

let cache: Promise<IProduct[]> | null = null

const getProducts = (): Promise<IProduct[]> => {
  if (!cache) cache = fetchAllProducts()
  return cache
}

export const useSearchProducts = (query: string) => {
  const [results, setResults] = useState<IProduct[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const q = query.trim()

    if (q.length < MIN_QUERY_LENGTH) {
      setResults([])
      setLoading(false)
      return
    }

    setLoading(true)
    let cancelled = false

    const timer = setTimeout(async () => {
      const products = await getProducts()
      if (cancelled) return
      setResults(
        products.filter(p => p.name.toLowerCase().includes(q.toLowerCase())).slice(0, SEARCH_LIMIT)
      )
      setLoading(false)
    }, DEBOUNCE_MS)

    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [query])

  return { results, loading }
}
