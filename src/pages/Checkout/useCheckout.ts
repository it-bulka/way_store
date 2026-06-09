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
import type { DeliveryType, IOrder, IOrderItem } from '@/models/orderType'
import { useWayforpay } from '@/hooks/useWayforpay'
import { useToast } from '@/context/ToastContext'

export const useCheckout = () => {
  const dispatch = useAppDispatch()
  const navigateTo = useNavigate()
  const items = useAppSelector(getCartItems)
  const user = useAppSelector(getUserSelector)
  const [delivery, setDelivery] = useState<DeliveryType>('ДО ДВЕРЕЙ')
  const [isPaying, setIsPaying] = useState(false)
  const { pay } = useWayforpay()
  const { addToast } = useToast()

  const doorForm = useForm<ICheckoutFormValues>({
    resolver: yupResolver(checkoutSchema),
    defaultValues: {
      city: user?.address.city ?? '',
      street: user?.address.street ?? '',
      home: user?.address.home?.toString() ?? '',
      apartment: user?.address.apartment ?? '',
    },
  })

  const pickupForm = useForm<IPickupFormValues>({
    resolver: yupResolver(pickupSchema),
    defaultValues: { cityName: '', cityRef: '', warehouseRef: '', warehouseAddress: '' },
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
    async (address: IOrder['address']) => {
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
          address,
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
    },
    [items, delivery, dispatch, user, navigateTo, pay, addToast]
  )

  const onDoorSubmit = useCallback<SubmitHandler<ICheckoutFormValues>>(
    data =>
      submitOrder({
        city: data.city,
        street: data.street,
        home: Number(data.home),
        apartment: data.apartment,
      }),
    [submitOrder]
  )

  const onPickupSubmit = useCallback<SubmitHandler<IPickupFormValues>>(
    data =>
      submitOrder({
        city: data.cityName,
        street: data.warehouseAddress,
        home: 0,
        apartment: '',
        warehouseRef: data.warehouseRef,
        warehouseAddress: data.warehouseAddress,
      }),
    [submitOrder]
  )

  return {
    items,
    delivery,
    setDelivery,
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
