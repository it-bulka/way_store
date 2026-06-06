import * as yup from 'yup'

const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/

export interface ILoginValues {
  email: string
  password: string
}

export interface IRegisterValues {
  name: string
  email: string
  phone: string
  password: string
}

export const loginSchema = yup.object({
  email: yup.string().email('Невірний email').required("Email обов'язковий"),
  password: yup.string().min(6, 'Мінімум 6 символів').required("Пароль обов'язковий"),
})

export const registerSchema = yup.object({
  name: yup.string().required("ПІБ обов'язкове"),
  email: yup.string().email('Невірний email').required("Email обов'язковий"),
  phone: yup.string().matches(phoneRegex, 'Невірний номер телефону').required("Телефон обов'язковий"),
  password: yup.string().min(6, 'Мінімум 6 символів').required("Пароль обов'язковий"),
})
