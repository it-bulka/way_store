import { initializeApp, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { getStorage } from 'firebase-admin/storage'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const serviceAccount = require('./serviceAccount.json')

initializeApp({
  credential: cert(serviceAccount),
  storageBucket: 'way-store-9bef5.appspot.com',
})

export const db = getFirestore()
export const bucket = getStorage().bucket()
