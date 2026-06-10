import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import type { ICartItem } from '@/redux/types/cartTypes'
import { formatNumberIntoGroups } from '@/utils/formatNumberIntoGroups'

export function useCartTotals(items: ICartItem[]) {
  const { t } = useTranslation('cart')

  const totalAmount = useMemo(() => items.reduce((acc, item) => acc + item.amount, 0), [items])

  const totalSum = useMemo(
    () => formatNumberIntoGroups(items.reduce((acc, item) => acc + item.amount * item.price, 0)),
    [items]
  )

  const amountLabel = t('itemCount', { count: totalAmount })

  return { totalAmount, totalSum, amountLabel }
}
