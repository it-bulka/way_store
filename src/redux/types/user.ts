type Birthday = 'day' | 'month' | 'year'
export type Sex = 'male' | 'female' | 'other'
export interface IUser {
  id: string
  password: string
  name: string
  sex: Sex
  email: string
  phone: string
  birthday: { [K in Birthday]: number }
  address: {
    city: string
    street: string
    home: number
    apartment: string
    entrance: string
    index: number
    floor: number
  }
  comment: string
}
