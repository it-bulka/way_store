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
