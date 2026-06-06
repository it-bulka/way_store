import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '@/redux/types/user.ts'
import { fetchUser } from '@/redux/async/fetchUser.ts'

interface IState {
  user: IUser | null
  loading: boolean
  error: string | null
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
  },
})

export const { reducer: userReducer } = userSlice
