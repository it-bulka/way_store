import { db } from '@/base/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { IProduct } from '@/models/goodsType.ts'

export const getDocInfo = async (path: string, docId: string): Promise<IProduct | never> => {
  const docRef = doc(db, path, docId)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    console.log(docSnap.data())

    return { ...docSnap.data(), id: docId } as IProduct
  } else {
    throw new Error('Нет такого документа')
  }
}
