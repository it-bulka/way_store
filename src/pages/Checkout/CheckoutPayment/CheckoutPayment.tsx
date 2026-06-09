import { FC, memo } from 'react'
import cls from './CheckoutPayment.module.scss'
import { RadioBtn } from '@/components/ui/RadioBtn/RadioBtn'
import type { PaymentType } from '@/models/orderType'

const OPTIONS: PaymentType[] = ['ОНЛАЙН', 'ПРИ ОТРИМАННІ']

interface CheckoutPaymentProps {
  payment: PaymentType
  onChange: (p: PaymentType) => void
}

export const CheckoutPayment: FC<CheckoutPaymentProps> = memo(({ payment, onChange }) => (
  <div className={cls.payment}>
    {OPTIONS.map(option => (
      <RadioBtn
        key={option}
        name="payment"
        value={option}
        label={option}
        checked={payment === option}
        onChecked={() => onChange(option)}
      />
    ))}
  </div>
))

CheckoutPayment.displayName = 'CheckoutPayment'
