import { createAsyncThunk } from '@reduxjs/toolkit'
import { signOut } from 'firebase/auth'
import { auth } from '@/base/firebase'

export const signOutUser = createAsyncThunk(
  'auth/signOut',
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth)
    } catch (e) {
      return rejectWithValue((e as Error).message)
    }
  }
)
