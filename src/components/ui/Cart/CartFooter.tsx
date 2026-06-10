import { type FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Typography } from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/Button/Button'
import cls from './Cart.module.scss'

interface CartFooterProps {
  amountLabel: string
  totalSum: string
  onCheckout: () => void
}

export const CartFooter: FC<CartFooterProps> = memo(({ amountLabel, totalSum, onCheckout }) => {
  const { t } = useTranslation('cart')
  return (
    <div className={cls.footer}>
      <Typography className={cls.sum}>
        {amountLabel} {t('totalSumLabel')} <span>{totalSum}</span> {t('currency')}
      </Typography>
      <Button title={t('checkout')} onClick={onCheckout} />
    </div>
  )
})

CartFooter.displayName = 'CartFooter'
