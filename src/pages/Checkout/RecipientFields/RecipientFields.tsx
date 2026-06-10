import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import type { UseFormRegister, FieldValues } from 'react-hook-form'
import { Input } from '@/components/ui/Input/Input'

interface RecipientFieldsProps {
  register: UseFormRegister<FieldValues>
  errors: { name?: { message?: string }; phone?: { message?: string } }
}

export const RecipientFields: FC<RecipientFieldsProps> = ({ register, errors }) => {
  const { t } = useTranslation('checkout')
  return (
    <>
      <Input<FieldValues>
        name="name"
        register={register}
        label={t('recipient.fullName')}
        error={errors.name?.message}
      />
      <Input<FieldValues>
        name="phone"
        register={register}
        label={t('recipient.phone')}
        error={errors.phone?.message}
      />
    </>
  )
}
