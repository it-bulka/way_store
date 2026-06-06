import { addDoc, collection } from 'firebase/firestore'
import { db } from '@/base/firebase'
import type { IOrder } from '@/models/orderType'

export const createOrderDoc = (
  userId: string,
  order: Omit<IOrder, 'id'>
): Promise<{ id: string }> => addDoc(collection(db, 'users', userId, 'orders'), order)
