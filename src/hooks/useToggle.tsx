import { useState } from 'react'

export const useToggle = (
  isToggle?: boolean
): [isToggle: boolean, setToggle: (isToggle?: boolean) => void] => {
  const [isOn, setOn] = useState<boolean>(isToggle || false)

  const toggle = (a?: boolean): void => {
    if (typeof a === 'boolean') {
      setOn(a)
      return
    }

    setOn(prev => !prev)
  }

  return [isOn, toggle]
}
