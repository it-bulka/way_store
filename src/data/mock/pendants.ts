import type { IProduct } from '@/models/goodsType'

export const mockPendants: IProduct[] = [
  {
    id: 'pendant-001',
    name: 'Підвіска WAY Heart Diamond',
    prev: '6200',
    price: { amount: 5100, currency: 'UAH' },
    material: 'Золото 18K, діамант 0.15 кт',
    weight: { num: 1.8, measurement: 'г' },
    color: 'білий золотий',
    images: {
      white: [
        'https://images.unsplash.com/photo-UtvyPmKvb1w?w=600&q=80&fit=crop',
        'https://images.unsplash.com/photo-TxCbfMc854c?w=600&q=80&fit=crop',
      ],
      rose: [
        'https://images.unsplash.com/photo-TxCbfMc854c?w=600&q=80&fit=crop',
        'https://images.unsplash.com/photo-UtvyPmKvb1w?w=600&q=80&fit=crop',
      ],
      yellow: [
        'https://images.unsplash.com/photo-akKnxLiN1jQ?w=600&q=80&fit=crop',
        'https://images.unsplash.com/photo-TxCbfMc854c?w=600&q=80&fit=crop',
      ],
    },
  },
  {
    id: 'pendant-002',
    name: 'Підвіска ДІЛЬВО Pearl Vintage',
    prev: null,
    price: { amount: 3700, currency: 'UAH' },
    material: 'Золото 14K, перлина барокова',
    weight: { num: 2.3, measurement: 'г' },
    color: 'золотий/білий',
    images: {
      white: [
        'https://images.unsplash.com/photo-akKnxLiN1jQ?w=600&q=80&fit=crop',
        'https://images.unsplash.com/photo-UtvyPmKvb1w?w=600&q=80&fit=crop',
      ],
      rose: [
        'https://images.unsplash.com/photo-UtvyPmKvb1w?w=600&q=80&fit=crop',
        'https://images.unsplash.com/photo-akKnxLiN1jQ?w=600&q=80&fit=crop',
      ],
      yellow: [
        'https://images.unsplash.com/photo-TxCbfMc854c?w=600&q=80&fit=crop',
        'https://images.unsplash.com/photo-akKnxLiN1jQ?w=600&q=80&fit=crop',
      ],
    },
  },
]
