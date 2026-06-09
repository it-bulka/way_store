import type { IOrder } from '@/models/orderType'
import RingImg from '@/assets/goods/Ring 1.jpg'

export const mockOrders: IOrder[] = [
  {
    id: 'ord-001',
    orderNumber: 'ENY7-47920435',
    date: new Date(2024, 2, 15),
    status: 'delivered',
    deliveryType: 'ДО ДВЕРЕЙ',
    paymentType: 'ОНЛАЙН',
    recipient: { name: 'Іванenko Іван Іванович', phone: '+380671234567' },
    tracking: '59000482850821',
    address: {
      city: 'Київ',
      street: 'Хрещатик',
      home: 12,
      apartment: '45',
    },
    items: [
      {
        id: 'item-1',
        title: 'Каблучка ДІЛЬВО 18 СМ',
        amount: 1,
        price: 4500,
        img: RingImg,
        size: 18,
      },
      {
        id: 'item-2',
        title: 'Сережки WAY Gold',
        amount: 2,
        price: 2800,
        img: RingImg,
      },
    ],
  },
  {
    id: 'ord-002',
    orderNumber: 'ENY7-47920436',
    date: new Date(2024, 5, 20),
    status: 'cancelled',
    deliveryType: 'ПУНКТ ВИДАЧІ',
    paymentType: 'ПРИ ОТРИМАННІ',
    recipient: { name: 'Петренко Петро Петрович', phone: '+380501234567' },
    address: {
      city: 'Львів',
      street: 'Сагайдачного',
      home: 7,
      apartment: '12',
    },
    items: [
      {
        id: 'item-3',
        title: 'Браслет WAY Classic',
        amount: 1,
        price: 6200,
        img: RingImg,
      },
    ],
  },
]
