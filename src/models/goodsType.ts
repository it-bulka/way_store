export type ringsColors = 'white' | 'rose' | 'yellow'
export interface IRing {
  name: string
  prev: string | null
  price: {
    amount: number
    currency: string
  }
  material: string
  weight: {
    num: number
    measurement: string
  }
  color: string
  images: Record<ringsColors, string[]>
}

export interface IProduct extends IRing {
  id: string
}
