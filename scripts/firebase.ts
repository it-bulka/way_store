import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { readFileSync } from 'fs'
import { resolve } from 'path'

const parseEnv = (filePath: string): Record<string, string> =>
  Object.fromEntries(
    readFileSync(filePath, 'utf-8')
      .split('\n')
      .filter(line => line && !line.startsWith('#') && line.includes('='))
      .map(line => {
        const [key, ...rest] = line.split('=')
        return [key.trim(), rest.join('=').trim().replace(/^['"]|['"]$/g, '')]
      })
  )

const env = parseEnv(resolve(process.cwd(), '.env'))

const app = initializeApp({
  apiKey: env.VITE_API_KEY,
  authDomain: 'way-store-9bef5.firebaseapp.com',
  projectId: 'way-store-9bef5',
  storageBucket: 'way-store-9bef5.appspot.com',
  messagingSenderId: '351458313721',
  appId: '1:351458313721:web:c185e07ea540d854102928',
})

export const db = getFirestore(app)
