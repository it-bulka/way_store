interface ICartItem {
  id: string
  title: string
  amount: number
  price: number
  img: string
  size?: number
}

interface ICart {
  items: ICartItem[]
}

export type { ICart, ICartItem }
