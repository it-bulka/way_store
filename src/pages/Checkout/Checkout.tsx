import { Navigate } from 'react-router-dom'
import cls from './Checkout.module.scss'
import { PageMeta } from '@/components/ui/PageMeta/PageMeta'
import { Typography, TypographyTypes } from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/Button/Button'
import { DeliveryForm } from './DeliveryForm/DeliveryForm'
import { PickupForm } from './PickupForm/PickupForm'
import { CheckoutOrderList } from './CheckoutOrderList/CheckoutOrderList'
import { CheckoutDelivery } from './CheckoutDelivery/CheckoutDelivery'
import { useCheckout } from './useCheckout'

const Checkout = () => {
  const {
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
  } = useCheckout()

  if (!items.length) return <Navigate to="/store" replace />

  const isDoor = delivery === 'ДО ДВЕРЕЙ'
  const isSubmitting = isDoor
    ? doorForm.formState.isSubmitting
    : pickupForm.formState.isSubmitting

  return (
    <form
      className={cls.root}
      onSubmit={
        isDoor
          ? doorForm.handleSubmit(onDoorSubmit)
          : pickupForm.handleSubmit(onPickupSubmit)
      }
      noValidate
    >
      <PageMeta title="Оформлення замовлення" noindex />
      <Typography variant="h3" type={TypographyTypes.HEADER} className={cls.heading}>
        ОФОРМЛЕННЯ ЗАМОВЛЕННЯ
      </Typography>

      <Typography type={TypographyTypes.HEADER} className={cls.sectionTitle}>
        Ваше замовлення
      </Typography>
      <CheckoutOrderList items={items} onDelete={onDeleteItem} setAmount={onSetItemAmount} />

      <Typography type={TypographyTypes.HEADER} className={cls.sectionTitle}>
        Спосіб доставки
      </Typography>
      <CheckoutDelivery delivery={delivery} onChange={setDelivery} />

      <Typography type={TypographyTypes.HEADER} className={cls.sectionTitle}>
        Адреса доставки
      </Typography>

      {isDoor ? (
        <DeliveryForm register={doorForm.register} errors={doorForm.formState.errors} />
      ) : (
        <PickupForm
          control={pickupForm.control}
          register={pickupForm.register}
          setValue={pickupForm.setValue}
          errors={pickupForm.formState.errors}
        />
      )}

      <div className={cls.actions}>
        <Button title="Оформити замовлення" type="submit" disabled={isSubmitting || isPaying} />
        <button type="button" className={cls.backBtn} onClick={onBack}>
          Назад до магазину
        </button>
      </div>
    </form>
  )
}

export default Checkout
