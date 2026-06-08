import { FC, memo } from 'react'
import cls from './CheckoutDelivery.module.scss'
import { RadioBtn } from '@/components/ui/RadioBtn/RadioBtn'
import type { DeliveryType } from '@/models/orderType'

const OPTIONS: DeliveryType[] = ['ДО ДВЕРЕЙ', 'ПУНКТ ВИДАЧІ']

interface CheckoutDeliveryProps {
  delivery: DeliveryType
  onChange: (d: DeliveryType) => void
}

export const CheckoutDelivery: FC<CheckoutDeliveryProps> = memo(({ delivery, onChange }) => (
  <div className={cls.delivery}>
    {OPTIONS.map(option => (
      <RadioBtn
        key={option}
        name="delivery"
        value={option}
        label={option}
        checked={delivery === option}
        onChecked={() => onChange(option)}
      />
    ))}
  </div>
))

CheckoutDelivery.displayName = 'CheckoutDelivery'
