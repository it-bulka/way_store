import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/base/firebase'

export const saveSubscriber = (email: string, name: string) =>
  setDoc(doc(db, 'subscribers', email), { email, name, createdAt: new Date().toISOString() })
