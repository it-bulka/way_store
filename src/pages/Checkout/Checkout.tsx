import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { PageMeta } from '@/components/ui/PageMeta/PageMeta'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import cls from './Checkout.module.scss'
import { CheckoutItem } from './CheckoutItem/CheckoutItem'
import { DeliveryForm } from './DeliveryForm/DeliveryForm'
import { Typography, TypographyTypes } from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/Button/Button'
import { RadioBtn } from '@/components/ui/RadioBtn/RadioBtn'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { getCartItems } from '@/redux/selectors/cartSelectors'
import { getUserSelector } from '@/redux/selectors/getUserSelector'
import { formatNumberIntoGroups } from '@/utils/formatNumberIntoGroups'
import { createOrder } from '@/redux/async/createOrder'
import { checkoutSchema, type ICheckoutFormValues } from './schema'
import type { DeliveryType, IOrderItem } from '@/models/orderType'
import { useWayforpay } from '@/hooks/useWayforpay'
import { useToast } from '@/context/ToastContext'

const DELIVERY_OPTIONS: DeliveryType[] = ['ДО ДВЕРЕЙ', 'ПУНКТ ВИДАЧІ']

const Checkout = () => {
  const dispatch = useAppDispatch()
  const navigateTo = useNavigate()
  const items = useAppSelector(getCartItems)
  const user = useAppSelector(getUserSelector)
  const [delivery, setDelivery] = useState<DeliveryType>('ДО ДВЕРЕЙ')
  const [isPaying, setIsPaying] = useState(false)
  const { pay } = useWayforpay()
  const { addToast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ICheckoutFormValues>({
    resolver: yupResolver(checkoutSchema),
    defaultValues: {
      city: user?.address.city ?? '',
      street: user?.address.street ?? '',
      home: user?.address.home?.toString() ?? '',
      apartment: user?.address.apartment ?? '',
    },
  })

  if (items.length === 0) return <Navigate to="/store" replace />

  const total = items.reduce((sum, item) => sum + item.price * item.amount, 0)

  const onSubmit: SubmitHandler<ICheckoutFormValues> = async data => {
    const orderNumber = crypto.randomUUID().slice(0, 8).toUpperCase()
    const orderItems: IOrderItem[] = items.map(item => ({
      id: item.id,
      title: item.title,
      amount: item.amount,
      price: item.price,
      img: item.img,
      size: item.size,
    }))
    const result = await dispatch(
      createOrder({
        orderNumber,
        date: new Date(),
        status: 'pending',
        deliveryType: delivery,
        items: orderItems,
        address: {
          city: data.city,
          street: data.street,
          home: Number(data.home),
          apartment: data.apartment,
        },
      })
    )
    if (!createOrder.fulfilled.match(result)) return

    setIsPaying(true)
    pay({
      orderReference: orderNumber,
      items,
      clientFirstName: user?.name,
      clientPhone: user?.phone,
      onApproved: () => navigateTo('/checkout/success', { state: { orderNumber } }),
      onDeclined: () => {
        setIsPaying(false)
        addToast('Платіж відхилено. Спробуйте ще раз.', 'error')
      },
    })
  }

  return (
    <form className={cls.root} onSubmit={handleSubmit(onSubmit)} noValidate>
      <PageMeta title="Оформлення замовлення" noindex />
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

      <Typography type={TypographyTypes.HEADER} className={cls.sectionTitle}>
        Адреса доставки
      </Typography>
      <DeliveryForm register={register} errors={errors} />

      <div className={cls.actions}>
        <Button title="Оформити замовлення" type="submit" disabled={isSubmitting || isPaying} />
        <button type="button" className={cls.backBtn} onClick={() => navigateTo('/store')}>
          Назад до магазину
        </button>
      </div>
    </form>
  )
}

export default Checkout
