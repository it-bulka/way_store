import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import cls from './CheckoutSuccess.module.scss'
import { PageMeta } from '@/components/ui/PageMeta/PageMeta'
import { Typography, TypographyTypes } from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/Button/Button'
import { formatNumberIntoGroups } from '@/utils/formatNumberIntoGroups'
import { useNavigate, useLocation } from 'react-router-dom'
import type { ICartItem } from '@/redux/types/cartTypes'

const CheckoutSuccess = () => {
  const { t } = useTranslation('checkout')
  const navigate = useNavigate()
  const location = useLocation()

  const [orderNumber] = useState<string>(
    () =>
      (location.state as { orderNumber?: string } | null)?.orderNumber ??
      crypto.randomUUID().slice(0, 8).toUpperCase()
  )
  const [snapshot] = useState<ICartItem[]>(
    () => (location.state as { items?: ICartItem[] } | null)?.items ?? []
  )

  const total = snapshot.reduce((sum, item) => sum + item.price * item.amount, 0)

  return (
    <div className={cls.root}>
      <PageMeta title={t('success.meta.title')} noindex />
      <Typography variant="h3" type={TypographyTypes.HEADER} className={cls.heading}>
        {t('success.title')}
      </Typography>

      <Typography className={cls.orderNum}>
        {t('success.orderNumber', { number: orderNumber })}
      </Typography>

      {snapshot.length > 0 && (
        <ul className={cls.items}>
          {snapshot.map(item => (
            <li key={item.id} className={cls.item}>
              <img src={item.img} alt={item.title} className={cls.img} loading="lazy" />
              <Typography className={cls.title}>{item.title}</Typography>
              <Typography className={cls.qty}>× {item.amount}</Typography>
              <Typography className={cls.price}>
                {formatNumberIntoGroups(item.price * item.amount)} {t('currency')}
              </Typography>
            </li>
          ))}
        </ul>
      )}

      <Typography type={TypographyTypes.HEADER} className={cls.total}>
        {t('totalPrefix')} <span>{formatNumberIntoGroups(total)} {t('currency')}</span>
      </Typography>

      <Button title={t('success.continueShopping')} onClick={() => navigate('/store')} className={cls.btn} />
    </div>
  )
}

export default CheckoutSuccess
