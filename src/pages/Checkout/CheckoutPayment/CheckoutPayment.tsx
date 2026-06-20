import { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import cls from './CheckoutPayment.module.scss'
import { RadioBtn } from '@/components/ui/RadioBtn/RadioBtn'
import type { PaymentType } from '@/models/orderType'

const OPTIONS: PaymentType[] = ['ОНЛАЙН', 'ПРИ ОТРИМАННІ']

interface CheckoutPaymentProps {
  payment: PaymentType
  onChange: (p: PaymentType) => void
}

export const CheckoutPayment: FC<CheckoutPaymentProps> = memo(({ payment, onChange }) => {
  const { t } = useTranslation('checkout')
  const labels: Record<PaymentType, string> = {
    ОНЛАЙН: t('payment.online'),
    'ПРИ ОТРИМАННІ': t('payment.onDelivery'),
  }
  return (
    <div className={cls.payment}>
      {OPTIONS.map(option => (
        <RadioBtn
          key={option}
          name="payment"
          value={option}
          label={labels[option]}
          checked={payment === option}
          onChecked={() => onChange(option)}
        />
      ))}
    </div>
  )
})

CheckoutPayment.displayName = 'CheckoutPayment'
