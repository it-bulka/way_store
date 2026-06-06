import { createAsyncThunk } from '@reduxjs/toolkit'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/base/firebase'

export const signIn = createAsyncThunk(
  'auth/signIn',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password)
      return { uid: user.uid, email: user.email }
    } catch (e) {
      return rejectWithValue((e as Error).message)
    }
  }
)
