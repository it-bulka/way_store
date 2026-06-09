import type { ringsColors } from '@/models/goodsType'

interface ICartItem {
  id: string
  title: string
  amount: number
  price: number
  img: string
  color?: ringsColors
  size?: number
  colorImages?: Partial<Record<ringsColors, string>>
  availableSizes?: number[]
}

interface ICart {
  items: ICartItem[]
}

export type { ICart, ICartItem }
