import { collection, query, getDocs, startAfter, limit } from 'firebase/firestore'
import type { QueryConstraint, QueryDocumentSnapshot, QueryFieldFilterConstraint } from '@firebase/firestore'
import { db } from '@/base/firebase'

export const PAGE_SIZE = 12

type PagedResult<T> = {
  data: T[]
  lastDoc: QueryDocumentSnapshot | null
}

export const getSubcollectionDocsPaged = async <T extends { id: string }>({
  slugs,
  queries = [],
  pageSize = PAGE_SIZE,
  startAfterDoc,
}: {
  slugs: string[]
  queries?: QueryFieldFilterConstraint[]
  pageSize?: number
  startAfterDoc?: QueryDocumentSnapshot | null
}): Promise<PagedResult<T>> => {
  const colRef = collection(db, slugs[0], ...slugs.slice(1))
  const constraints: QueryConstraint[] = [
    ...(queries as QueryConstraint[]),
    ...(startAfterDoc ? [startAfter(startAfterDoc)] : []),
    limit(pageSize),
  ]
  const snap = await getDocs(query(colRef, ...constraints))
  const data = snap.docs.map(d => ({ id: d.id, ...d.data() }) as T)
  return { data, lastDoc: snap.docs.at(-1) ?? null }
}
