import { type FC } from 'react'
import cls from './OrderDetail.module.scss'
import { Typography, TypographyTypes } from '@/components/ui/Typography/Typography'
import { formatNumberIntoGroups } from '@/utils/formatNumberIntoGroups'
import type { IOrderItem } from '@/models/orderType'

interface OrderItemsProps {
  items: IOrderItem[]
}

export const OrderItems: FC<OrderItemsProps> = ({ items }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.amount, 0)

  return (
    <div className={cls.itemsSection}>
      <Typography variant="h4" type={TypographyTypes.HEADER} className={cls.sectionTitle}>
        ТОВАРИ
      </Typography>
      <ul className={cls.itemsList}>
        {items.map(item => (
          <li key={item.id} className={cls.item}>
            <img src={item.img} alt={item.title} className={cls.itemImg} loading="lazy" />
            <div className={cls.itemName}>
              <Typography>{item.title}</Typography>
              {item.size && <Typography className={cls.itemSize}>Розмір: {item.size} мм</Typography>}
            </div>
            <Typography className={cls.itemQty}>× {item.amount}</Typography>
            <Typography className={cls.itemTotal}>
              {formatNumberIntoGroups(item.price * item.amount)} грн.
            </Typography>
          </li>
        ))}
      </ul>
      <div className={cls.totalRow}>
        <Typography className={cls.totalLabel}>РАЗОМ:</Typography>
        <Typography type={TypographyTypes.HEADER} className={cls.totalAmount}>
          {formatNumberIntoGroups(total)} грн.
        </Typography>
      </div>
    </div>
  )
}
