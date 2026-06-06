import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import cls from './Checkout.module.scss'
import { CheckoutItem } from './CheckoutItem/CheckoutItem'
import { Typography, TypographyTypes } from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/Button/Button'
import { RadioBtn } from '@/components/ui/RadioBtn/RadioBtn'
import { useAppSelector } from '@/hooks/reduxHooks'
import { getCartItems } from '@/redux/selectors/cartSelectors'
import { formatNumberIntoGroups } from '@/utils/formatNumberIntoGroups'
import type { DeliveryType } from '@/models/orderType'

const DELIVERY_OPTIONS: DeliveryType[] = ['ДО ДВЕРЕЙ', 'ПУНКТ ВИДАЧІ']

const Checkout = () => {
  const navigateTo = useNavigate()
  const items = useAppSelector(getCartItems)
  const [delivery, setDelivery] = useState<DeliveryType>('ДО ДВЕРЕЙ')

  if (items.length === 0) return <Navigate to="/store" replace />

  const total = items.reduce((sum, item) => sum + item.price * item.amount, 0)

  return (
    <div className={cls.root}>
      <Typography variant="h3" type={TypographyTypes.HEADER} className={cls.heading}>
        ОФОРМЛЕННЯ ЗАМОВЛЕННЯ
      </Typography>

      <Typography type={TypographyTypes.HEADER} className={cls.sectionTitle}>
        Ваше замовлення
      </Typography>
      <ul className={cls.items}>
        {items.map(item => (
          <CheckoutItem
            key={item.id}
            img={item.img}
            title={item.title}
            price={item.price}
            amount={item.amount}
          />
        ))}
      </ul>

      <Typography type={TypographyTypes.HEADER} className={cls.total}>
        РАЗОМ: <span>{formatNumberIntoGroups(total)} грн.</span>
      </Typography>

      <Typography type={TypographyTypes.HEADER} className={cls.sectionTitle}>
        Спосіб доставки
      </Typography>
      <div className={cls.delivery}>
        {DELIVERY_OPTIONS.map(option => (
          <RadioBtn
            key={option}
            name="delivery"
            value={option}
            label={option}
            checked={delivery === option}
            onChecked={() => setDelivery(option)}
          />
        ))}
      </div>

      <div className={cls.actions}>
        <Button
          title="Оформити замовлення"
          onClick={() => navigateTo('/checkout/success')}
        />
        <button className={cls.backBtn} onClick={() => navigateTo('/store')}>
          Назад до магазину
        </button>
      </div>
    </div>
  )
}

export default Checkout
