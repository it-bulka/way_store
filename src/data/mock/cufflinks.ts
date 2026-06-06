import type { IProduct } from '@/models/goodsType'

export const mockCufflinks: IProduct[] = [
  {
    id: 'cufflinks-001',
    name: 'Запонки ДІЛЬВО Gold Onyx',
    prev: null,
    price: { amount: 8900, currency: 'UAH' },
    material: 'Золото 18K, оніксове каміння',
    weight: { num: 12.4, measurement: 'г' },
    color: 'золотий/чорний',
    images: {
      white: [
        'https://images.unsplash.com/photo-7_XrKXM1mms?w=600&q=80&fit=crop',
        'https://images.unsplash.com/photo-Gxvh5mH6-yo?w=600&q=80&fit=crop',
      ],
      rose: [
        'https://images.unsplash.com/photo-Gxvh5mH6-yo?w=600&q=80&fit=crop',
        'https://images.unsplash.com/photo-7_XrKXM1mms?w=600&q=80&fit=crop',
      ],
      yellow: [
        'https://images.unsplash.com/photo-7_XrKXM1mms?w=600&q=80&fit=crop',
        'https://images.unsplash.com/photo-Gxvh5mH6-yo?w=600&q=80&fit=crop',
      ],
    },
  },
]
