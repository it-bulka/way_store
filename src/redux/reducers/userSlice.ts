import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '@/redux/types/user.ts'
import { fetchUser } from '@/redux/async/fetchUser.ts'
import { updateUser } from '@/redux/async/updateUser'
import { clearUser } from '@/redux/reducers/authSlice'

interface IState {
  user: IUser | null
  loading: boolean
  error: null | string
}

const initialState: IState = {
  user: null,
  loading: false,
  error: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUser.pending, state => {
        state.loading = true
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.error = null
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(updateUser.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(updateUser.fulfilled, state => {
        state.loading = false
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(clearUser, state => {
        state.user = null
        state.error = null
      })
  },
})

export const { reducer: userReducer, actions: userActions } = userSlice
