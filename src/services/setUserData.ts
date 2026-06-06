import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@/base/firebase'
import type { IUser } from '@/redux/types/user'

export const setUserData = (userId: string, data: Partial<IUser>): Promise<void> =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateDoc(doc(db, 'users', userId), data as any)
