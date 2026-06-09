import { createAsyncThunk } from '@reduxjs/toolkit'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, db } from '@/base/firebase'
import { fetchUser } from '@/redux/async/fetchUser'
import type { IUser } from '@/redux/types/user'

export const signInWithGoogle = createAsyncThunk(
  'auth/signInWithGoogle',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const provider = new GoogleAuthProvider()
      const { user } = await signInWithPopup(auth, provider)

      const userRef = doc(db, 'users', user.uid)
      const userSnap = await getDoc(userRef)

      if (!userSnap.exists()) {
        const newUser: IUser = {
          id: user.uid,
          password: '',
          name: user.displayName ?? '',
          sex: 'other',
          email: user.email ?? '',
          phone: '',
          birthday: { day: 0, month: 0, year: 0 },
          address: { city: '', street: '', home: 0, apartment: '', entrance: '', index: 0, floor: 0 },
          comment: '',
        }
        await setDoc(userRef, newUser)
      }

      dispatch(fetchUser(user.uid))
      return { uid: user.uid, email: user.email }
    } catch (e) {
      return rejectWithValue((e as Error).message)
    }
  }
)
