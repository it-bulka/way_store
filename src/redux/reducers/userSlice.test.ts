import { describe, it, expect } from 'vitest'
import { userReducer, userActions } from './userSlice'
import { fetchUser } from '@/redux/async/fetchUser'
import { updateUser } from '@/redux/async/updateUser'
import { clearUser } from './authSlice'
import type { IUser } from '@/redux/types/user'

const base = { user: null, loading: false, error: null }

const updateArg = { userId: 'u1', data: { name: 'New Name' } }

const mockUser: IUser = {
  id: 'u1',
  name: 'Test User',
  email: 'test@example.com',
  phone: '+380991234567',
  password: 'hashed',
  sex: 'female',
  birthday: { day: 1, month: 1, year: 1990 },
  address: {
    city: 'Kyiv',
    street: 'Main St',
    home: 1,
    apartment: '1',
    entrance: '1',
    index: 1000,
    floor: 1,
  },
  comment: '',
}

describe('userSlice — sync reducers', () => {
  it('set: stores user', () => {
    const state = userReducer(base, userActions.set(mockUser))
    expect(state.user).toEqual(mockUser)
  })
})

describe('userSlice — fetchUser thunk states', () => {
  it('pending: sets loading', () => {
    const state = userReducer(base, fetchUser.pending('id', 'u1'))
    expect(state.loading).toBe(true)
  })

  it('fulfilled: stores user, clears error and loading', () => {
    const state = userReducer({ ...base, loading: true }, fetchUser.fulfilled(mockUser, 'id', 'u1'))
    expect(state.loading).toBe(false)
    expect(state.user).toEqual(mockUser)
    expect(state.error).toBeNull()
  })

  it('rejected: sets error, clears loading', () => {
    const state = userReducer(
      { ...base, loading: true },
      fetchUser.rejected(null, 'id', 'u1', 'Not found')
    )
    expect(state.loading).toBe(false)
    expect(state.error).toBe('Not found')
  })
})

describe('userSlice — updateUser thunk states', () => {
  it('pending: sets loading, clears error', () => {
    const state = userReducer({ ...base, error: 'old' }, updateUser.pending('id', updateArg))
    expect(state.loading).toBe(true)
    expect(state.error).toBeNull()
  })

  it('fulfilled: clears loading', () => {
    const state = userReducer({ ...base, loading: true }, updateUser.fulfilled(undefined, 'id', updateArg))
    expect(state.loading).toBe(false)
  })

  it('rejected: sets error', () => {
    const state = userReducer(base, updateUser.rejected(null, 'id', updateArg, 'Update failed'))
    expect(state.error).toBe('Update failed')
  })
})

describe('userSlice — clearUser action (from authSlice)', () => {
  it('resets user to null', () => {
    const state = userReducer({ ...base, user: mockUser }, clearUser())
    expect(state.user).toBeNull()
    expect(state.error).toBeNull()
  })
})
