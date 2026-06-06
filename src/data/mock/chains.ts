import type { IProduct } from '@/models/goodsType'

export const mockChains: IProduct[] = [
  {
    id: 'chain-001',
    name: 'Ланцюжок WAY Gold Figaro',
    prev: '5600',
    price: { amount: 4800, currency: 'UAH' },
    material: 'Золото 18K',
    weight: { num: 6.8, measurement: 'г' },
    color: 'золотий',
    images: {
      white: [
        'https://images.unsplash.com/photo-R_pIyT1KF80?w=600&q=80&fit=crop',
        'https://images.unsplash.com/photo-Ct-7svw082I?w=600&q=80&fit=crop',
      ],
      rose: [
        'https://images.unsplash.com/photo-Ct-7svw082I?w=600&q=80&fit=crop',
        'https://images.unsplash.com/photo-XScO9eVrQ-o?w=600&q=80&fit=crop',
      ],
      yellow: [
        'https://images.unsplash.com/photo-XScO9eVrQ-o?w=600&q=80&fit=crop',
        'https://images.unsplash.com/photo-R_pIyT1KF80?w=600&q=80&fit=crop',
      ],
    },
  },
]
