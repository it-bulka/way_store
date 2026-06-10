import { type FC } from 'react'
import { useTranslation } from 'react-i18next'
import cls from './OrderDetail.module.scss'
import { Typography } from '@/components/ui/Typography/Typography'
import { OrderStatusBadge } from '@/components/ui/OrderStatusBadge/OrderStatusBadge'
import { AppLink } from '@/components/ui/AppLink/AppLink'
import { formatDate } from '@/utils/formatDate.tsx'
import type { IOrder, OrderStatus } from '@/models/orderType'

interface OrderHeaderProps {
  order: IOrder
}

export const OrderHeader: FC<OrderHeaderProps> = ({ order }) => {
  const { t } = useTranslation('account')
  const statusLabels: Record<OrderStatus, string> = {
    pending: t('purchaseHistory.status.pending'),
    processing: t('purchaseHistory.status.processing'),
    shipped: t('purchaseHistory.status.shipped'),
    delivered: t('purchaseHistory.status.delivered'),
    cancelled: t('purchaseHistory.status.cancelled'),
  }

  return (
    <div className={cls.header}>
      <AppLink
        path="/account/purchase-history"
        title={t('orderDetail.backToListArrow')}
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
}
