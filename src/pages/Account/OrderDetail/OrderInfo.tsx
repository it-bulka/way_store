import { type FC } from 'react'
import { useTranslation } from 'react-i18next'
import cls from './OrderDetail.module.scss'
import { Typography, TypographyTypes } from '@/components/ui/Typography/Typography'
import type { IOrder } from '@/models/orderType'

interface OrderInfoProps {
  order: IOrder
}

export const OrderInfo: FC<OrderInfoProps> = ({ order }) => {
  const { t } = useTranslation('account')
  const { address, deliveryType, tracking } = order

  return (
    <div className={cls.infoSection}>
      <div className={cls.infoBlock}>
        <Typography variant="h4" type={TypographyTypes.HEADER} className={cls.infoTitle}>
          {t('orderDetail.sections.address')}
        </Typography>
        <div className={cls.infoRow}>
          <span className={cls.infoLabel}>{t('orderDetail.labels.deliveryType')}</span>
          <span>{deliveryType}</span>
        </div>
        <div className={cls.infoRow}>
          <span className={cls.infoLabel}>{t('orderDetail.labels.city')}</span>
          <span>{address.city}</span>
        </div>
        <div className={cls.infoRow}>
          <span className={cls.infoLabel}>{t('orderDetail.labels.street')}</span>
          <span>
            {address.street}, {address.home}
          </span>
        </div>
        {address.apartment && (
          <div className={cls.infoRow}>
            <span className={cls.infoLabel}>{t('orderDetail.labels.apartment')}</span>
            <span>{address.apartment}</span>
          </div>
        )}
      </div>

      <div className={cls.infoBlock}>
        <Typography variant="h4" type={TypographyTypes.HEADER} className={cls.infoTitle}>
          {t('orderDetail.sections.tracking')}
        </Typography>
        <div className={cls.infoRow}>
          <span className={cls.infoLabel}>{t('orderDetail.labels.trackingNumber')}</span>
          <span className={tracking ? cls.tracking : undefined}>{tracking ?? '—'}</span>
        </div>
      </div>
    </div>
  )
}
