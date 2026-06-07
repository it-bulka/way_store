import { describe, it, expect, beforeEach } from 'vitest'
import { storage } from './storage'

beforeEach(() => {
  localStorage.clear()
})

describe('storage.get', () => {
  it('returns null for missing key', () => {
    expect(storage.get('missing')).toBeNull()
  })

  it('returns parsed value for existing key', () => {
    localStorage.setItem('user', JSON.stringify({ id: '1' }))
    expect(storage.get<{ id: string }>('user')).toEqual({ id: '1' })
  })

  it('returns null for malformed JSON', () => {
    localStorage.setItem('bad', '{not-json}')
    expect(storage.get('bad')).toBeNull()
  })
})

describe('storage.set', () => {
  it('persists value retrievable via get', () => {
    const data = [1, 2, 3]
    storage.set('list', data)
    expect(storage.get<number[]>('list')).toEqual(data)
  })

  it('overwrites existing value', () => {
    storage.set('key', 'first')
    storage.set('key', 'second')
    expect(storage.get<string>('key')).toBe('second')
  })
})
