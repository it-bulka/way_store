import { type FC } from 'react'
import cls from './OrderStatusBadge.module.scss'
import classnames from 'classnames'

interface OrderStatusBadgeProps {
  status: string
  label: string
  className?: string
}

export const OrderStatusBadge: FC<OrderStatusBadgeProps> = ({ status, label, className }) => (
  <div className={classnames(cls.badge, [className])}>
    <span className={classnames(cls.dot, cls[status])} />
    <span className={cls.label}>{label}</span>
  </div>
)
