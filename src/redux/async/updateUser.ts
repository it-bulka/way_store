import { createAsyncThunk } from '@reduxjs/toolkit'
import { setUserData } from '@/services/setUserData'
import type { IUser } from '@/redux/types/user'

export const updateUser = createAsyncThunk(
  'user/update',
  async ({ userId, data }: { userId: string; data: Partial<IUser> }, { rejectWithValue }) => {
    try {
      await setUserData(userId, data)
    } catch (e) {
      return rejectWithValue((e as Error).message)
    }
  }
)
