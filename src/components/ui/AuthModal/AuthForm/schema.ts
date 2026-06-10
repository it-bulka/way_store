import * as yup from 'yup'
import i18n from '@/i18n/config'

const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/

const tAuth = i18n.t.bind(i18n) as (key: string, opts: object) => string
const v = (key: string) => () => tAuth(`validation.${key}`, { ns: 'auth' })

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
  email: yup.string().email(v('emailInvalid')).required(v('emailRequired')),
  password: yup.string().min(6, v('passwordMin')).required(v('passwordRequired')),
})

export const registerSchema = yup.object({
  name: yup.string().required(v('nameRequired')),
  email: yup.string().email(v('emailInvalid')).required(v('emailRequired')),
  phone: yup.string().matches(phoneRegex, v('phoneInvalid')).required(v('phoneRequired')),
  password: yup.string().min(6, v('passwordMin')).required(v('passwordRequired')),
})
