import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
const API_KEY = import.meta.env.VITE_API_KEY

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: 'way-store-9bef5.firebaseapp.com',
  projectId: 'way-store-9bef5',
  storageBucket: 'way-store-9bef5.appspot.com',
  messagingSenderId: '351458313721',
  appId: '1:351458313721:web:c185e07ea540d854102928',
}

export const app = initializeApp(firebaseConfig)

export const db = getFirestore()
export const storage = getStorage()
