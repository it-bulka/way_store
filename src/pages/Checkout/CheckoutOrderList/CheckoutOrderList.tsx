import { FC, memo, useMemo } from 'react'
import cls from './CheckoutOrderList.module.scss'
import { CheckoutItem } from '../CheckoutItem/CheckoutItem'
import { Typography, TypographyTypes } from '@/components/ui/Typography/Typography'
import { formatNumberIntoGroups } from '@/utils/formatNumberIntoGroups'
import type { ICartItem } from '@/redux/types/cartTypes'

interface CheckoutOrderListProps {
  items: ICartItem[]
  onDelete: (id: string) => void
  setAmount: (id: string, amount: number) => void
}

export const CheckoutOrderList: FC<CheckoutOrderListProps> = memo(({ items, onDelete, setAmount }) => {
  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.amount, 0),
    [items]
  )

  return (
    <>
      <ul className={cls.items}>
        {items.map(item => (
          <CheckoutItem
            key={item.id}
            id={item.id}
            img={item.img}
            title={item.title}
            price={item.price}
            amount={item.amount}
            onDelete={() => onDelete(item.id)}
            setAmount={amount => setAmount(item.id, amount)}
          />
        ))}
      </ul>
      <Typography type={TypographyTypes.HEADER} className={cls.total}>
        РАЗОМ: <span>{formatNumberIntoGroups(total)} грн.</span>
      </Typography>
    </>
  )
})

CheckoutOrderList.displayName = 'CheckoutOrderList'
