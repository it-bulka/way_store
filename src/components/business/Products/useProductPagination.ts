import { useCallback, useEffect, useRef, useState } from 'react'
import type { QueryDocumentSnapshot, QueryFieldFilterConstraint } from '@firebase/firestore'
import { useAppDispatch } from '@/hooks/reduxHooks'
import { productsAction } from '@/redux/reducers/productsSlice'
import { getSubcollectionDocsPaged, PAGE_SIZE } from '@/services/getSubcollectionDocsPaged'
import { useToast } from '@/context/ToastContext'
import { PAGES } from '@/models/pages'
import type { IProduct, ProductType } from '@/models/goodsType'

const PRODUCT_PATH_PREFIX = PAGES.getCollection().split('/').slice(0, -1)

const ALL_CATEGORIES: ProductType[] = [
  'rings', 'necklaces', 'bracelets', 'earrings',
  'pendants', 'watches', 'cufflinks', 'chains',
]

interface UsePaginationParams {
  collection: ProductType | null
  queries?: QueryFieldFilterConstraint[]
}

interface UsePaginationResult {
  loading: boolean
  loadingMore: boolean
  hasMore: boolean
  loadMore: () => void
}

export const useProductPagination = ({
  collection,
  queries,
}: UsePaginationParams): UsePaginationResult => {
  const dispatch = useAppDispatch()
  const { addToast } = useToast()
  const cursorRef = useRef<QueryDocumentSnapshot | null>(null)
  const bufferRef = useRef<IProduct[]>([])
  const bufferOffsetRef = useRef<number>(0)
  const loadingMoreRef = useRef(false)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    cursorRef.current = null
    bufferRef.current = []
    bufferOffsetRef.current = 0
    setHasMore(true)

    const fetchFirstPage = async () => {
      setLoading(true)
      try {
        if (!collection) {
          const results = await Promise.all(
            ALL_CATEGORIES.map(cat =>
              getSubcollectionDocsPaged<IProduct>({
                slugs: [...PRODUCT_PATH_PREFIX, cat],
                queries,
                pageSize: 1000,
              })
            )
          )
          bufferRef.current = results.flatMap(r => r.data)
          bufferOffsetRef.current = PAGE_SIZE
          dispatch(productsAction.setProducts(bufferRef.current.slice(0, PAGE_SIZE)))
          setHasMore(bufferRef.current.length > PAGE_SIZE)
          return
        }
        const slugs = [...PRODUCT_PATH_PREFIX, collection]
        const { data, lastDoc } = await getSubcollectionDocsPaged<IProduct>({ slugs, queries })
        cursorRef.current = lastDoc
        setHasMore(data.length >= PAGE_SIZE)
        dispatch(productsAction.setProducts(data))
      } catch {
        addToast('Помилка завантаження товарів', 'error')
      } finally {
        setLoading(false)
      }
    }

    fetchFirstPage()
  }, [collection, queries, dispatch, addToast])

  const loadMore = useCallback(async () => {
    if (loadingMoreRef.current || !hasMore) return
    loadingMoreRef.current = true
    setLoadingMore(true)
    try {
      if (!collection) {
        const offset = bufferOffsetRef.current
        const next = bufferRef.current.slice(offset, offset + PAGE_SIZE)
        bufferOffsetRef.current = offset + PAGE_SIZE
        setHasMore(bufferRef.current.length > bufferOffsetRef.current)
        dispatch(productsAction.appendProducts(next))
        return
      }
      const slugs = [...PRODUCT_PATH_PREFIX, collection]
      const { data, lastDoc } = await getSubcollectionDocsPaged<IProduct>({
        slugs,
        queries,
        startAfterDoc: cursorRef.current,
      })
      cursorRef.current = lastDoc
      setHasMore(data.length >= PAGE_SIZE)
      dispatch(productsAction.appendProducts(data))
    } catch {
      addToast('Помилка завантаження товарів', 'error')
    } finally {
      loadingMoreRef.current = false
      setLoadingMore(false)
    }
  }, [collection, queries, hasMore, dispatch, addToast])

  return { loading, loadingMore, hasMore, loadMore }
}
