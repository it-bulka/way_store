import { describe, it, expect } from 'vitest'
import { formatNumberIntoGroups } from './formatNumberIntoGroups'

describe('formatNumberIntoGroups', () => {
  it('returns zero unchanged', () => {
    expect(formatNumberIntoGroups(0)).toBe('0')
  })

  it('leaves numbers below 1000 unchanged', () => {
    expect(formatNumberIntoGroups(999)).toBe('999')
    expect(formatNumberIntoGroups(100)).toBe('100')
  })

  it('formats exact thousands', () => {
    expect(formatNumberIntoGroups(1000)).toBe('1 000')
  })

  it('formats multi-group numbers', () => {
    expect(formatNumberIntoGroups(1000000)).toBe('1 000 000')
    expect(formatNumberIntoGroups(123456789)).toBe('123 456 789')
  })

  it('handles mid-range numbers correctly', () => {
    expect(formatNumberIntoGroups(12345)).toBe('12 345')
    expect(formatNumberIntoGroups(1234567)).toBe('1 234 567')
  })

  it('respects custom group size', () => {
    expect(formatNumberIntoGroups(1000000, 2)).toBe('1 00 00 00')
  })
})
