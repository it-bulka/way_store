import { type FC } from 'react'
import cls from './OrderDetail.module.scss'
import { Typography, TypographyTypes } from '@/components/ui/Typography/Typography'
import type { IOrder } from '@/models/orderType'

interface OrderInfoProps {
  order: IOrder
}

export const OrderInfo: FC<OrderInfoProps> = ({ order }) => {
  const { address, deliveryType, tracking } = order

  return (
    <div className={cls.infoSection}>
      <div className={cls.infoBlock}>
        <Typography variant="h4" type={TypographyTypes.HEADER} className={cls.infoTitle}>
          АДРЕСА ДОСТАВКИ
        </Typography>
        <div className={cls.infoRow}>
          <span className={cls.infoLabel}>Тип доставки:</span>
          <span>{deliveryType}</span>
        </div>
        <div className={cls.infoRow}>
          <span className={cls.infoLabel}>Місто:</span>
          <span>{address.city}</span>
        </div>
        <div className={cls.infoRow}>
          <span className={cls.infoLabel}>Вулиця:</span>
          <span>{address.street}, {address.home}</span>
        </div>
        {address.apartment && (
          <div className={cls.infoRow}>
            <span className={cls.infoLabel}>Квартира:</span>
            <span>{address.apartment}</span>
          </div>
        )}
      </div>

      <div className={cls.infoBlock}>
        <Typography variant="h4" type={TypographyTypes.HEADER} className={cls.infoTitle}>
          ТРЕКІНГ НОВА ПОШТА
        </Typography>
        <div className={cls.infoRow}>
          <span className={cls.infoLabel}>Номер ТТН:</span>
          <span className={tracking ? cls.tracking : undefined}>{tracking ?? '—'}</span>
        </div>
      </div>
    </div>
  )
}
