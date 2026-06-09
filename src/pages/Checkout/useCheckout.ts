import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { getCartItems } from '@/redux/selectors/cartSelectors'
import { getUserSelector } from '@/redux/selectors/getUserSelector'
import { createOrder } from '@/redux/async/createOrder'
import { cartActions } from '@/redux/reducers/cartSlice'
import { checkoutSchema, pickupSchema } from './schema'
import type { ICheckoutFormValues, IPickupFormValues } from './schema'
import type { DeliveryType, IOrder, IOrderItem, PaymentType } from '@/models/orderType'
import { useWayforpay } from '@/hooks/useWayforpay'
import { useToast } from '@/context/ToastContext'

export const useCheckout = () => {
  const dispatch = useAppDispatch()
  const navigateTo = useNavigate()
  const items = useAppSelector(getCartItems)
  const user = useAppSelector(getUserSelector)
  const [delivery, setDelivery] = useState<DeliveryType>('ДО ДВЕРЕЙ')
  const [payment, setPayment] = useState<PaymentType>('ОНЛАЙН')
  const [isPaying, setIsPaying] = useState(false)
  const { pay, isReady } = useWayforpay()
  const { addToast } = useToast()

  const doorForm = useForm<ICheckoutFormValues>({
    resolver: yupResolver(checkoutSchema),
    defaultValues: {
      name: user?.name ?? '',
      phone: user?.phone ?? '',
      city: user?.address.city ?? '',
      street: user?.address.street ?? '',
      home: user?.address.home?.toString() ?? '',
      apartment: user?.address.apartment ?? '',
    },
  })

  const pickupForm = useForm<IPickupFormValues>({
    resolver: yupResolver(pickupSchema),
    defaultValues: {
      name: user?.name ?? '',
      phone: user?.phone ?? '',
      cityName: '',
      cityRef: '',
      warehouseRef: '',
      warehouseAddress: '',
    },
  })

  const onDeleteItem = useCallback(
    (id: string) => dispatch(cartActions.deleteItem({ id })),
    [dispatch]
  )

  const onSetItemAmount = useCallback(
    (id: string, amount: number) => {
      if (amount === 0) dispatch(cartActions.deleteItem({ id }))
      else dispatch(cartActions.setItemAmount({ id, amount }))
    },
    [dispatch]
  )

  const onBack = useCallback(() => navigateTo('/store'), [navigateTo])

  const submitOrder = useCallback(
    async (address: IOrder['address'], name: string, phone: string) => {
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
          paymentType: payment,
          recipient: { name, phone },
          items: orderItems,
          address,
        })
      )
      if (!createOrder.fulfilled.match(result)) {
        addToast('Помилка при створенні замовлення', 'error')
        return
      }

      if (payment === 'ПРИ ОТРИМАННІ') {
        navigateTo('/checkout/success', { state: { orderNumber } })
        return
      }

      if (!isReady) {
        addToast('Платіжний сервіс недоступний. Спробуйте ще раз.', 'error')
        return
      }

      setIsPaying(true)
      pay({
        orderReference: orderNumber,
        items,
        clientFirstName: name,
        clientPhone: phone,
        onApproved: () => navigateTo('/checkout/success', { state: { orderNumber } }),
        onDeclined: () => {
          setIsPaying(false)
          addToast('Платіж відхилено. Спробуйте ще раз.', 'error')
        },
      })
    },
    [items, delivery, payment, isReady, dispatch, navigateTo, pay, addToast]
  )

  const onDoorSubmit = useCallback<SubmitHandler<ICheckoutFormValues>>(
    data =>
      submitOrder(
        { city: data.city, street: data.street, home: Number(data.home), apartment: data.apartment },
        data.name,
        data.phone
      ),
    [submitOrder]
  )

  const onPickupSubmit = useCallback<SubmitHandler<IPickupFormValues>>(
    data =>
      submitOrder(
        {
          city: data.cityName,
          street: data.warehouseAddress,
          home: 0,
          apartment: '',
          warehouseRef: data.warehouseRef,
          warehouseAddress: data.warehouseAddress,
        },
        data.name,
        data.phone
      ),
    [submitOrder]
  )

  return {
    items,
    delivery,
    setDelivery,
    payment,
    setPayment,
    doorForm,
    pickupForm,
    onDoorSubmit,
    onPickupSubmit,
    isPaying,
    onDeleteItem,
    onSetItemAmount,
    onBack,
  }
}
