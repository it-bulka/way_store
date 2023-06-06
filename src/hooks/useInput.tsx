import { FormEvent, useState } from 'react'

export type InitialInputValue = string | undefined

export const useInput = (
  initialValue: InitialInputValue
): [
  value: InitialInputValue,
  func: (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => void
] => {
  const [value, setValue] = useState(initialValue)

  const onChange = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue((e.target as HTMLInputElement | HTMLTextAreaElement).value)
  }

  return [value, onChange]
}
