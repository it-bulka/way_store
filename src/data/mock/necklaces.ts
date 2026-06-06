import type { IProduct } from '@/models/goodsType'

export const mockNecklaces: IProduct[] = [
  {
    id: 'necklace-001',
    name: 'Намисто WAY Gold Venice',
    prev: null,
    price: { amount: 6200, currency: 'UAH' },
    material: 'Золото 18K',
    weight: { num: 8.4, measurement: 'г' },
    color: 'золотий',
    images: {
      white: [
        'https://images.unsplash.com/photo-aldDZePniqg?w=600&q=80&fit=crop',
        'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80&fit=crop',
      ],
      rose: [
        'https://images.unsplash.com/photo-Dli2lIXQiJc?w=600&q=80&fit=crop',
        'https://images.unsplash.com/photo-aldDZePniqg?w=600&q=80&fit=crop',
      ],
      yellow: [
        'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80&fit=crop',
        'https://images.unsplash.com/photo-y2ErhoE92KA?w=600&q=80&fit=crop',
      ],
    },
  },
  {
    id: 'necklace-002',
    name: 'Кольє ДІЛЬВО Heart Diamond',
    prev: '9800',
    price: { amount: 8100, currency: 'UAH' },
    material: 'Золото 18K, діамант 0.2 кт',
    weight: { num: 4.2, measurement: 'г' },
    color: 'білий золотий',
    images: {
      white: [
        'https://images.unsplash.com/photo-Z0KoI2aysro?w=600&q=80&fit=crop',
        'https://images.unsplash.com/photo-y2ErhoE92KA?w=600&q=80&fit=crop',
      ],
      rose: [
        'https://images.unsplash.com/photo-y2ErhoE92KA?w=600&q=80&fit=crop',
        'https://images.unsplash.com/photo-Z0KoI2aysro?w=600&q=80&fit=crop',
      ],
      yellow: [
        'https://images.unsplash.com/photo-aldDZePniqg?w=600&q=80&fit=crop',
        'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80&fit=crop',
      ],
    },
  },
  {
    id: 'necklace-003',
    name: 'Намисто WAY Pearl Classic',
    prev: null,
    price: { amount: 4500, currency: 'UAH' },
    material: 'Срібло 925, перли прісноводні',
    weight: { num: 12.6, measurement: 'г' },
    color: 'срібний/білий',
    images: {
      white: [
        'https://images.unsplash.com/photo-vv2vIFeNEMg?w=600&q=80&fit=crop',
        'https://images.unsplash.com/photo-aldDZePniqg?w=600&q=80&fit=crop',
      ],
      rose: [
        'https://images.unsplash.com/photo-Z0KoI2aysro?w=600&q=80&fit=crop',
        'https://images.unsplash.com/photo-vv2vIFeNEMg?w=600&q=80&fit=crop',
      ],
      yellow: [
        'https://images.unsplash.com/photo-Dli2lIXQiJc?w=600&q=80&fit=crop',
        'https://images.unsplash.com/photo-y2ErhoE92KA?w=600&q=80&fit=crop',
      ],
    },
  },
  {
    id: 'necklace-004',
    name: 'Кольє WAY Diamond Solitaire',
    prev: null,
    price: { amount: 14300, currency: 'UAH' },
    material: 'Золото 18K, діамант 0.5 кт',
    weight: { num: 3.8, measurement: 'г' },
    color: 'білий золотий',
    images: {
      white: [
        'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80&fit=crop',
        'https://images.unsplash.com/photo-aldDZePniqg?w=600&q=80&fit=crop',
      ],
      rose: [
        'https://images.unsplash.com/photo-y2ErhoE92KA?w=600&q=80&fit=crop',
        'https://images.unsplash.com/photo-Z0KoI2aysro?w=600&q=80&fit=crop',
      ],
      yellow: [
        'https://images.unsplash.com/photo-vv2vIFeNEMg?w=600&q=80&fit=crop',
        'https://images.unsplash.com/photo-Dli2lIXQiJc?w=600&q=80&fit=crop',
      ],
    },
  },
]
