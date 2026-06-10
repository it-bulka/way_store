import { useEffect, useState } from 'react'
import { fetchAllProducts } from '@/services/searchProducts'
import type { IProduct } from '@/models/goodsType'
import type { FirestoreLang } from '@/models/pages'

const SEARCH_LIMIT = 20
const DEBOUNCE_MS = 300
const MIN_QUERY_LENGTH = 2

const cache = new Map<FirestoreLang, Promise<IProduct[]>>()

const getProducts = (lang: FirestoreLang): Promise<IProduct[]> => {
  if (!cache.has(lang)) cache.set(lang, fetchAllProducts(lang))
  return cache.get(lang)!
}

export const useSearchProducts = (query: string, lang: FirestoreLang) => {
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
    setResults([])
    let cancelled = false

    const timer = setTimeout(async () => {
      let products = await getProducts(lang)

      // fallback to Ukrainian if language-specific data isn't seeded yet
      if (products.length === 0 && lang !== 'ukr') {
        products = await getProducts('ukr')
      }

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
  }, [query, lang])

  return { results, loading }
}
