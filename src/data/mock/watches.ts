import type { IProduct } from '@/models/goodsType'

export const mockWatches: IProduct[] = [
  {
    id: 'watch-001',
    name: 'Годинник WAY Prestige Gold',
    prev: null,
    price: { amount: 68000, currency: 'UAH' },
    material: 'Корпус: Золото 18K, браслет: шкіра',
    weight: { num: 85, measurement: 'г' },
    color: 'золотий',
    images: {
      white: [
        'https://images.unsplash.com/photo-fjggW87EzYU?w=600&q=80&fit=crop',
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80&fit=crop',
      ],
      rose: [
        'https://images.unsplash.com/photo-gJ9b48mc5qs?w=600&q=80&fit=crop',
        'https://images.unsplash.com/photo-fjggW87EzYU?w=600&q=80&fit=crop',
      ],
      yellow: [
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80&fit=crop',
        'https://images.unsplash.com/photo-gJ9b48mc5qs?w=600&q=80&fit=crop',
      ],
    },
  },
  {
    id: 'watch-002',
    name: 'Годинник ДІЛЬВО Classic Steel',
    prev: '48000',
    price: { amount: 38500, currency: 'UAH' },
    material: 'Корпус: Нержавіюча сталь 316L, сапфірове скло',
    weight: { num: 120, measurement: 'г' },
    color: 'сріблясто-сталевий',
    images: {
      white: [
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80&fit=crop',
        'https://images.unsplash.com/photo-fjggW87EzYU?w=600&q=80&fit=crop',
      ],
      rose: [
        'https://images.unsplash.com/photo-htsyf4VLCP0?w=600&q=80&fit=crop',
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80&fit=crop',
      ],
      yellow: [
        'https://images.unsplash.com/photo-gJ9b48mc5qs?w=600&q=80&fit=crop',
        'https://images.unsplash.com/photo-htsyf4VLCP0?w=600&q=80&fit=crop',
      ],
    },
  },
]
