import { collection, getDocs, query } from 'firebase/firestore'
import { db } from '@/base/firebase'
import { QueryFieldFilterConstraint, QuerySnapshot } from '@firebase/firestore'

type GetSubcollectionDocsProps = {
  slugs: string[]
  queries?: QueryFieldFilterConstraint[]
}
export const getSubcollectionDocs = async <T extends { id: string }>({
  slugs,
  queries,
}: GetSubcollectionDocsProps): Promise<T[]> => {
  const docs: T[] = []

  try {
    const colRef = collection(db, slugs[0], ...slugs.splice(1))
    let querySnapshot: QuerySnapshot | null = null

    if (queries) {
      console.log({ queries })
      const q = query(colRef, ...queries)
      querySnapshot = await getDocs(q)
    } else {
      querySnapshot = await getDocs(colRef)
    }

    querySnapshot.forEach(doc => {
      docs.push({ id: doc.id, ...doc.data() } as T)
    })
  } catch (err) {
    console.log({ err })
  }

  return docs
}
