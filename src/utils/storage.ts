const safeGet = <T>(key: string): T | null => {
  try {
    const item = localStorage.getItem(key)
    return item ? (JSON.parse(item) as T) : null
  } catch {
    return null
  }
}

const safeSet = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {}
}

const safeRemove = (key: string): void => {
  try {
    localStorage.removeItem(key)
  } catch {}
}

export const storage = { get: safeGet, set: safeSet, remove: safeRemove }
