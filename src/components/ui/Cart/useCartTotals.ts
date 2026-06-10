import { useMemo } from 'react'
import type { ICartItem } from '@/redux/types/cartTypes'
import { formatNumberIntoGroups } from '@/utils/formatNumberIntoGroups'

export function useCartTotals(items: ICartItem[]) {
  const totalAmount = useMemo(() => items.reduce((acc, item) => acc + item.amount, 0), [items])

  const totalSum = useMemo(
    () => formatNumberIntoGroups(items.reduce((acc, item) => acc + item.amount * item.price, 0)),
    [items]
  )

  const amountLabel = useMemo(() => {
    const lastDigit = totalAmount % 10
    const lastTwoDigits = totalAmount % 100
    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) return `${totalAmount} ТОВАРІВ`
    if (lastDigit === 1) return `${totalAmount} ТОВАР`
    if (lastDigit >= 2 && lastDigit <= 4) return `${totalAmount} ТОВАРИ`
    return `${totalAmount} ТОВАРІВ`
  }, [totalAmount])

  return { totalAmount, totalSum, amountLabel }
}
