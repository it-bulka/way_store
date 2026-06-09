export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'

export type DeliveryType = 'ДО ДВЕРЕЙ' | 'ПУНКТ ВИДАЧІ'

export interface IOrderItem {
  id: string
  title: string
  amount: number
  price: number
  img: string
  size?: number
}

export interface IOrder {
  id: string
  orderNumber: string
  date: Date
  status: OrderStatus
  items: IOrderItem[]
  deliveryType: DeliveryType
  tracking?: string
  address: {
    city: string
    street: string
    home: number
    apartment: string
    warehouseRef?: string
    warehouseAddress?: string
  }
}
