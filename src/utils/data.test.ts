import { describe, it, expect, vi } from 'vitest'
import { daysInMonth, monthsOfYear } from './data'
import { getDateExpires } from './getDateExpires'

// suppress the console.log inside monthsOfYear
vi.spyOn(console, 'log').mockImplementation(() => undefined)

describe('daysInMonth', () => {
  it('returns 31 days for July', () => {
    const result = daysInMonth(2023, 6) // month 6 = July (0-indexed)
    expect(result).toHaveLength(31)
  })

  it('returns 28 days for February in non-leap year', () => {
    const result = daysInMonth(2023, 1)
    expect(result).toHaveLength(28)
  })

  it('returns 29 days for February in leap year', () => {
    const result = daysInMonth(2024, 1)
    expect(result).toHaveLength(29)
  })

  it('each item has id, label (string) and value (number)', () => {
    const [first] = daysInMonth(2023, 0)
    expect(first).toEqual({ id: '1', label: '1', value: 1 })
  })
})

describe('monthsOfYear', () => {
  it('returns exactly 12 months', () => {
    expect(monthsOfYear()).toHaveLength(12)
  })

  it('first item has value 0 and last has value 11', () => {
    const months = monthsOfYear()
    expect(months[0].value).toBe(0)
    expect(months[11].value).toBe(11)
  })

  it('each item has id, label and value', () => {
    const [jan] = monthsOfYear()
    expect(jan).toHaveProperty('id', '0')
    expect(jan).toHaveProperty('label')
    expect(jan).toHaveProperty('value', 0)
  })
})

describe('getDateExpires', () => {
  it('returns a Date object', () => {
    expect(getDateExpires(7)).toBeInstanceOf(Date)
  })

  it('returned date is n days from today', () => {
    const days = 10
    const result = getDateExpires(days)
    const expected = new Date()
    expected.setDate(expected.getDate() + days)
    expect(result.toDateString()).toBe(expected.toDateString())
  })
})
