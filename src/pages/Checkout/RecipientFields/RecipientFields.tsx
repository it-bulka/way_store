import type { FC } from 'react'
import type { UseFormRegister, FieldValues } from 'react-hook-form'
import { Input } from '@/components/ui/Input/Input'

interface RecipientFieldsProps {
  register: UseFormRegister<FieldValues>
  errors: { name?: { message?: string }; phone?: { message?: string } }
}

export const RecipientFields: FC<RecipientFieldsProps> = ({ register, errors }) => (
  <>
    <Input<FieldValues>
      name="name"
      register={register}
      label="ПІБ ОТРИМУВАЧА"
      error={errors.name?.message}
    />
    <Input<FieldValues>
      name="phone"
      register={register}
      label="НОМЕР ТЕЛЕФОНУ"
      error={errors.phone?.message}
    />
  </>
)
