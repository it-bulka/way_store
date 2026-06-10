import { type FC } from 'react'
import cls from './OrderDetail.module.scss'
import { Typography } from '@/components/ui/Typography/Typography'
import { OrderStatusBadge } from '@/components/ui/OrderStatusBadge/OrderStatusBadge'
import { AppLink } from '@/components/ui/AppLink/AppLink'
import { formatDate } from '@/utils/formatDate.tsx'
import type { IOrder, OrderStatus } from '@/models/orderType'

const statusLabels: Record<OrderStatus, string> = {
  pending: 'ОЧІКУЄТЬСЯ',
  processing: 'ОБРОБЛЯЄТЬСЯ',
  shipped: 'В ДОРОЗІ',
  delivered: 'ВИКОНАНО',
  cancelled: 'СКАСОВАНО',
}

interface OrderHeaderProps {
  order: IOrder
}

export const OrderHeader: FC<OrderHeaderProps> = ({ order }) => (
  <div className={cls.header}>
    <AppLink
      path="/account/purchase-history"
      title="← До списку замовлень"
      withDecoration={false}
      className={cls.back}
    />
    <div className={cls.meta}>
      <Typography className={cls.orderNum}>№ {order.orderNumber}</Typography>
      <Typography className={cls.date}>{formatDate(order.date)}</Typography>
      <OrderStatusBadge status={order.status} label={statusLabels[order.status]} />
    </div>
  </div>
)
