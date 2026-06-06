import { createAsyncThunk } from '@reduxjs/toolkit'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { setDoc, doc } from 'firebase/firestore'
import { auth, db } from '@/base/firebase'
import { fetchUser } from '@/redux/async/fetchUser'
import type { IUser } from '@/redux/types/user'

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (
    { email, password, name }: { email: string; password: string; name: string },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password)
      const newUser: IUser = {
        id: user.uid,
        password: '',
        name,
        sex: 'other',
        email,
        phone: '',
        birthday: { day: 0, month: 0, year: 0 },
        address: { city: '', street: '', home: 0, apartment: '', entrance: '', index: 0, floor: 0 },
        comment: '',
      }
      await setDoc(doc(db, 'users', user.uid), newUser)
      dispatch(fetchUser(user.uid))
      return { uid: user.uid, email: user.email }
    } catch (e) {
      return rejectWithValue((e as Error).message)
    }
  }
)
