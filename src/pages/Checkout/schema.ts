import * as yup from 'yup'

export interface ICheckoutFormValues {
  city: string
  street: string
  home: string
  apartment: string
}

export const checkoutSchema = yup
  .object({
    city: yup.string().required("Місто обов'язкове"),
    street: yup.string().default(''),
    home: yup.string().required("Будинок обов'язковий"),
    apartment: yup.string().default(''),
  })
  .required()

export interface IPickupFormValues {
  cityName: string
  cityRef: string
  warehouseRef: string
  warehouseAddress: string
}

export const pickupSchema = yup
  .object({
    cityName: yup.string().required("Місто обов'язкове"),
    cityRef: yup.string().required('Оберіть місто зі списку'),
    warehouseRef: yup.string().required("Відділення обов'язкове"),
    warehouseAddress: yup.string().default(''),
  })
  .required()
