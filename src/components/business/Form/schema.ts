import * as yup from 'yup'
import { Sex } from '@/redux/types/user.ts'

export interface IFormValues {
  sex: Sex
  email: string
  name: string
  phone: string
  password: string
  confirm: string
  day: number
  month: number
  year: number
  city: string
  street: string
  home: string
  entrance: string
  floor: string
  apartment: string
  index: string
  comment: string
}

export const formSchema = yup
  .object({
    sex: yup.string(),
    email: yup.string().email('Невірний email').required("Email обов'язковий"),
    name: yup.string().required("Ім'я обов'язкове"),
    phone: yup
      .string()
      .matches(
        /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/g,
        'Невірний номер телефону'
      )
      .required("Телефон обов'язковий"),
    password: yup.string(),
    confirm: yup.string(),
    day: yup.number(),
    month: yup.number(),
    year: yup.number(),
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
