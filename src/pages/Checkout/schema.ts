import * as yup from 'yup'

const recipientSchemaFields = {
  name: yup.string().required("ПІБ обов'язкове").min(2, 'Мінімум 2 символи'),
  phone: yup
    .string()
    .required("Телефон обов'язковий")
    .test('ua-phone', 'Вкажіть номер у форматі +380XXXXXXXXX', value => {
      if (!value) return true
      return /^\+380\d{9}$/.test(value.replace(/[\s\-\(\)]/g, ''))
    }),
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
