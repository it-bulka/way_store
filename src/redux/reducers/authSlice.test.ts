import { describe, it, expect } from 'vitest'
import { authReducer, setUser, clearUser } from './authSlice'
import { signIn } from '@/redux/async/signIn'
import { signUp } from '@/redux/async/signUp'
import { signOutUser } from '@/redux/async/signOutUser'

const base = {
  uid: null,
  email: null,
  isAuthenticated: false,
  loading: false,
  error: null,
}

const credentials = { email: 'a@b.com', password: '123456' }
const authPayload = { uid: 'u1', email: 'a@b.com' }

describe('authSlice — sync reducers', () => {
  it('setUser: marks authenticated and stores uid/email', () => {
    const state = authReducer(base, setUser(authPayload))
    expect(state.isAuthenticated).toBe(true)
    expect(state.uid).toBe('u1')
    expect(state.email).toBe('a@b.com')
    expect(state.error).toBeNull()
  })

  it('clearUser: resets all auth fields', () => {
    const state = authReducer(
      { ...base, uid: 'u1', email: 'a@b.com', isAuthenticated: true },
      clearUser()
    )
    expect(state.uid).toBeNull()
    expect(state.email).toBeNull()
    expect(state.isAuthenticated).toBe(false)
  })
})

describe('authSlice — signIn thunk states', () => {
  it('pending: sets loading, clears error', () => {
    const state = authReducer({ ...base, error: 'old' }, signIn.pending('id', credentials))
    expect(state.loading).toBe(true)
    expect(state.error).toBeNull()
  })

  it('fulfilled: sets auth state', () => {
    const state = authReducer({ ...base, loading: true }, signIn.fulfilled(authPayload, 'id', credentials))
    expect(state.loading).toBe(false)
    expect(state.isAuthenticated).toBe(true)
    expect(state.uid).toBe('u1')
  })

  it('rejected: sets error, clears loading', () => {
    const state = authReducer(
      { ...base, loading: true },
      signIn.rejected(null, 'id', credentials, 'Wrong password')
    )
    expect(state.loading).toBe(false)
    expect(state.error).toBe('Wrong password')
  })
})

describe('authSlice — signUp thunk states', () => {
  it('pending: sets loading', () => {
    const state = authReducer(base, signUp.pending('id', credentials))
    expect(state.loading).toBe(true)
  })

  it('fulfilled: sets auth state', () => {
    const state = authReducer(base, signUp.fulfilled(authPayload, 'id', credentials))
    expect(state.isAuthenticated).toBe(true)
  })

  it('rejected: sets error', () => {
    const state = authReducer(base, signUp.rejected(null, 'id', credentials, 'Email in use'))
    expect(state.error).toBe('Email in use')
  })
})

describe('authSlice — signOutUser thunk states', () => {
  it('fulfilled: clears uid, email and auth flag', () => {
    const state = authReducer(
      { ...base, uid: 'u1', email: 'a@b.com', isAuthenticated: true },
      signOutUser.fulfilled(undefined, 'id', undefined)
    )
    expect(state.uid).toBeNull()
    expect(state.isAuthenticated).toBe(false)
  })
})
