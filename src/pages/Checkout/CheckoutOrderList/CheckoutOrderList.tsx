import { FC, memo, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import cls from './CheckoutOrderList.module.scss'
import { CheckoutItem } from '../CheckoutItem/CheckoutItem'
import { Typography, TypographyTypes } from '@/components/ui/Typography/Typography'
import { formatNumberIntoGroups } from '@/utils/formatNumberIntoGroups'
import type { ICartItem } from '@/redux/types/cartTypes'
import type { ringsColors } from '@/models/goodsType'

interface CheckoutOrderListProps {
  items: ICartItem[]
  onDelete: (id: string, color?: ringsColors, size?: number) => void
  setAmount: (id: string, amount: number, color?: ringsColors, size?: number) => void
}

export const CheckoutOrderList: FC<CheckoutOrderListProps> = memo(
  ({ items, onDelete, setAmount }) => {
    const { t } = useTranslation('checkout')
    const total = useMemo(
      () => items.reduce((sum, item) => sum + item.price * item.amount, 0),
      [items]
    )

    return (
      <>
        <ul className={cls.items}>
          {items.map(item => (
            <CheckoutItem
              key={`${item.id}-${item.color ?? ''}-${item.size ?? ''}`}
              id={item.id}
              img={item.img}
              title={item.title}
              price={item.price}
              amount={item.amount}
              color={item.color}
              size={item.size}
              onDelete={() => onDelete(item.id, item.color, item.size)}
              setAmount={amount => setAmount(item.id, amount, item.color, item.size)}
            />
          ))}
        </ul>
        <Typography type={TypographyTypes.HEADER} className={cls.total}>
          {t('totalPrefix')} <span>{formatNumberIntoGroups(total)} {t('currency')}</span>
        </Typography>
      </>
    )
  }
)

CheckoutOrderList.displayName = 'CheckoutOrderList'
