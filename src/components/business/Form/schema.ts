import * as yup from 'yup'
import { Sex } from '@/redux/types/user.ts'

export interface IInfoFormValues {
  sex: Sex
  name: string
  phone: string
  day: number
  month: number
  year: number
}

export const infoSchema = yup
  .object({
    sex: yup.string(),
    name: yup.string().required("Ім'я обов'язкове"),
    phone: yup
      .string()
      .matches(
        /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/g,
        'Невірний номер телефону'
      )
      .required("Телефон обов'язковий"),
    day: yup.number(),
    month: yup.number(),
    year: yup.number(),
  })
  .required()

export interface IPasswordFormValues {
  newPassword: string
  confirmPassword: string
  oldPassword: string
}

export const passwordSchema = yup
  .object({
    newPassword: yup.string().min(6, 'Мінімум 6 символів').required("Новий пароль обов'язковий"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('newPassword')], 'Паролі не співпадають')
      .required("Підтвердження обов'язкове"),
    oldPassword: yup.string().required("Старий пароль обов'язковий"),
  })
  .required()

export interface IAddressFormValues {
  city: string
  street: string
  home: string
  entrance: string
  floor: string
  apartment: string
  index: string
  comment: string
}

export const addressSchema = yup
  .object({
    city: yup.string().required("Місто обов'язкове"),
    street: yup.string(),
    home: yup.string().required("Будинок обов'язковий"),
    entrance: yup.string(),
    floor: yup.string(),
    apartment: yup.string(),
    index: yup.string(),
    comment: yup.string(),
  })
  .required()
