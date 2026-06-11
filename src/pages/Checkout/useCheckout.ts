import { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
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
import type { ringsColors } from '@/models/goodsType'
import { useWayforpay } from '@/hooks/useWayforpay'
import { useToast } from '@/context/ToastContext'

export const useCheckout = () => {
  const { t } = useTranslation('checkout')
  const dispatch = useAppDispatch()
  const navigateTo = useNavigate()
  const items = useAppSelector(getCartItems)
  const user = useAppSelector(getUserSelector)
  const [delivery, setDeliveryRaw] = useState<DeliveryType>('ДО ДВЕРЕЙ')
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

  const setDelivery = useCallback(
    (newDelivery: DeliveryType) => {
      const currentForm = delivery === 'ДО ДВЕРЕЙ' ? doorForm : pickupForm
      const targetForm = newDelivery === 'ДО ДВЕРЕЙ' ? doorForm : pickupForm
      const { name, phone } = currentForm.getValues()
      const setVal = targetForm.setValue as (k: 'name' | 'phone', v: string) => void
      setVal('name', name)
      setVal('phone', phone)
      setDeliveryRaw(newDelivery)
    },
    [delivery, doorForm, pickupForm]
  )

  const onDeleteItem = useCallback(
    (id: string, color?: ringsColors, size?: number) =>
      dispatch(cartActions.deleteItem({ id, color, size })),
    [dispatch]
  )

  const onSetItemAmount = useCallback(
    (id: string, amount: number, color?: ringsColors, size?: number) => {
      if (amount === 0) dispatch(cartActions.deleteItem({ id, color, size }))
      else dispatch(cartActions.setItemAmount({ id, amount, color, size }))
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
        color: item.color,
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
        addToast(t('toast.orderError'), 'error')
        return
      }

      if (payment === 'ПРИ ОТРИМАННІ') {
        navigateTo('/checkout/success', { state: { orderNumber } })
        return
      }

      if (!isReady) {
        addToast(t('toast.paymentUnavailable'), 'error')
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
          addToast(t('toast.paymentDeclined'), 'error')
        },
      })
    },
    [items, delivery, payment, isReady, dispatch, navigateTo, pay, addToast]
  )

  const onDoorSubmit = useCallback<SubmitHandler<ICheckoutFormValues>>(
    data =>
      submitOrder(
        {
          city: data.city,
          street: data.street,
          home: Number(data.home),
          apartment: data.apartment,
        },
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
