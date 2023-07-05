export type ringsColors = 'white' | 'rose' | 'yellow'
export type MetalsType = 'gold' | 'silver' | 'platinum' | 'stainless steel'
export type StoneType =
  | 'diamonds'
  | 'sapphires'
  | 'rubies'
  | 'amethysts'
  | 'topazes'
  | 'aquamarines'
  | 'pearls'
  | 'opals'
  | 'garnets'

export type ProductType =
  | 'rings'
  | 'necklaces'
  | 'bracelets'
  | 'earrings'
  | 'pendants'
  | 'watches'
  | 'cufflinks'
  | 'chains'
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
