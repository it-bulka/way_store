import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { signIn } from '@/redux/async/signIn'
import { signUp } from '@/redux/async/signUp'
import { signOutUser } from '@/redux/async/signOutUser'
import { signInWithGoogle } from '@/redux/async/signInWithGoogle'

interface AuthState {
  uid: string | null
  email: string | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  uid: null,
  email: null,
  isAuthenticated: false,
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ uid: string; email: string | null }>) => {
      state.uid = action.payload.uid
      state.email = action.payload.email
      state.isAuthenticated = true
      state.error = null
    },
    clearUser: state => {
      state.uid = null
      state.email = null
      state.isAuthenticated = false
      state.error = null
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signIn.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false
        state.uid = action.payload.uid
        state.email = action.payload.email
        state.isAuthenticated = true
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(signUp.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false
        state.uid = action.payload.uid
        state.email = action.payload.email
        state.isAuthenticated = true
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(signOutUser.fulfilled, state => {
        state.uid = null
        state.email = null
        state.isAuthenticated = false
      })
      .addCase(signInWithGoogle.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(signInWithGoogle.fulfilled, (state, action) => {
        state.loading = false
        state.uid = action.payload.uid
        state.email = action.payload.email
        state.isAuthenticated = true
      })
      .addCase(signInWithGoogle.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { setUser, clearUser } = authSlice.actions
export const { reducer: authReducer } = authSlice
