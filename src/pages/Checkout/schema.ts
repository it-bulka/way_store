import * as yup from 'yup'

const recipientSchemaFields = {
  name: yup.string().min(2, 'Мінімум 2 символи').required("ПІБ обов'язкове"),
  phone: yup
    .string()
    .matches(/^(\+380|0)\d{9}$/, 'Невірний формат телефону')
    .required("Телефон обов'язковий"),
}

export interface ICheckoutFormValues {
  name: string
  phone: string
  city: string
  street: string
  home: string
  apartment: string
}

export const checkoutSchema = yup
  .object({
    ...recipientSchemaFields,
    city: yup.string().required("Місто обов'язкове"),
    street: yup.string().default(''),
    home: yup.string().required("Будинок обов'язковий"),
    apartment: yup.string().default(''),
  })
  .required()

export interface IPickupFormValues {
  name: string
  phone: string
  cityName: string
  cityRef: string
  warehouseRef: string
  warehouseAddress: string
}

export const pickupSchema = yup
  .object({
    ...recipientSchemaFields,
    cityName: yup.string().required("Місто обов'язкове"),
    cityRef: yup.string().required('Оберіть місто зі списку'),
    warehouseRef: yup.string().required("Відділення обов'язкове"),
    warehouseAddress: yup.string().default(''),
  })
  .required()
