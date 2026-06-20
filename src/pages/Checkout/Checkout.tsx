import { useTranslation } from 'react-i18next'
import { useAppSelector } from '@/hooks/reduxHooks'
import { getAuthInitializing } from '@/redux/selectors/getAuthSelector'
import { Absent } from '@/components/ui/Absent/Absent'
import cls from './Checkout.module.scss'
import { PageMeta } from '@/components/ui/PageMeta/PageMeta'
import { Typography, TypographyTypes } from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/Button/Button'
import { DeliveryForm } from './DeliveryForm/DeliveryForm'
import { PickupForm } from './PickupForm/PickupForm'
import { CheckoutOrderList } from './CheckoutOrderList/CheckoutOrderList'
import { CheckoutDelivery } from './CheckoutDelivery/CheckoutDelivery'
import { CheckoutPayment } from './CheckoutPayment/CheckoutPayment'
import { RecipientFields } from './RecipientFields/RecipientFields'
import { useCheckout } from './useCheckout'
import type { FieldValues, UseFormRegister } from 'react-hook-form'

const Checkout = () => {
  const { t } = useTranslation('checkout')
  const {
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
  } = useCheckout()

  const initializing = useAppSelector(getAuthInitializing)

  if (initializing) return null
  if (!items.length)
    return <Absent info={t('empty.info')} btnTitle={t('empty.btn')} onBtnClick={onBack} />

  const isDoor = delivery === 'ДО ДВЕРЕЙ'
  const isSubmitting = isDoor ? doorForm.formState.isSubmitting : pickupForm.formState.isSubmitting
  const hasErrors =
    Object.keys(isDoor ? doorForm.formState.errors : pickupForm.formState.errors).length > 0

  return (
    <form
      className={cls.root}
      onSubmit={
        isDoor ? doorForm.handleSubmit(onDoorSubmit) : pickupForm.handleSubmit(onPickupSubmit)
      }
      noValidate
    >
      <PageMeta title={t('meta.title')} noindex />
      <Typography variant="h3" type={TypographyTypes.HEADER} className={cls.heading}>
        {t('title')}
      </Typography>

      <div className={cls.section}>
        <Typography type={TypographyTypes.HEADER} className={cls.sectionTitle}>
          {t('sections.order')}
        </Typography>
        <CheckoutOrderList items={items} onDelete={onDeleteItem} setAmount={onSetItemAmount} />
      </div>

      <div className={cls.section}>
        <Typography type={TypographyTypes.HEADER} className={cls.sectionTitle}>
          {t('sections.recipient')}
        </Typography>
        <RecipientFields
          register={
            (isDoor
              ? doorForm.register
              : pickupForm.register) as unknown as UseFormRegister<FieldValues>
          }
          errors={isDoor ? doorForm.formState.errors : pickupForm.formState.errors}
        />
      </div>

      <div className={cls.section}>
        <Typography type={TypographyTypes.HEADER} className={cls.sectionTitle}>
          {t('sections.payment')}
        </Typography>
        <CheckoutPayment payment={payment} onChange={setPayment} />
      </div>

      <div className={cls.section}>
        <Typography type={TypographyTypes.HEADER} className={cls.sectionTitle}>
          {t('sections.delivery')}
        </Typography>
        <CheckoutDelivery delivery={delivery} onChange={setDelivery} />
      </div>

      <div className={cls.section}>
        <Typography type={TypographyTypes.HEADER} className={cls.sectionTitle}>
          {t('sections.address')}
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
      </div>

      <div className={cls.actions}>
        <Button
          title={t('submit')}
          type="submit"
          disabled={isSubmitting || isPaying || hasErrors}
        />
        <button type="button" className={cls.backBtn} onClick={onBack}>
          {t('backToStore')}
        </button>
      </div>
    </form>
  )
}

export default Checkout
