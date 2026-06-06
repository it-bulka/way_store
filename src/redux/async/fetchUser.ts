import { createAsyncThunk } from '@reduxjs/toolkit'
import { IUser } from '@/redux/types/user.ts'
import { getDocInfo } from '@/services'

export const fetchUser = createAsyncThunk<IUser, string>(
  'user/fetchUser',
  async (arg, { rejectWithValue }) => {
    try {
      const user = await getDocInfo<IUser>('users', arg)
      return user
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message)
      }

      return rejectWithValue('Ooops... Something is wrong')
    }
  }
)
