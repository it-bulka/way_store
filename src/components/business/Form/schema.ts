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
    email: yup.string().email('Not valid email').required('Email is required'),
    name: yup.string().required('Name is required'),
    phone: yup
      .string()
      .matches(
        /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/g,
        'Invalid phone number'
      )
      .required('Phone number is required'),
    password: yup.string(),
    confirm: yup.string(),
    day: yup.number(),
    month: yup.number(),
    year: yup.number(),
    home: yup.string().required('Home is required'),
    city: yup.string().required('City is required'),
    entrance: yup.string(),
    floor: yup.string(),
    apartment: yup.string(),
    index: yup.string(),
    comment: yup.string(),
  })
  .required()
