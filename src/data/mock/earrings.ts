import type { IProduct } from '@/models/goodsType'

export const mockEarrings: IProduct[] = [
  {
    id: 'earring-001',
    name: 'Сережки WAY Hoop Gold Classic',
    prev: null,
    price: { amount: 4100, currency: 'UAH' },
    material: 'Золото 18K',
    weight: { num: 3.8, measurement: 'г' },
    color: 'золотий',
    images: {
      white: [
        'https://images.unsplash.com/photo-ZP7HXfjRVcY?w=600&q=80&fit=crop',
        'https://images.unsplash.com/photo-1584811644165-33db40dbd5b8?w=600&q=80&fit=crop',
      ],
      rose: [
        'https://images.unsplash.com/photo-pQYSjhWz4cQ?w=600&q=80&fit=crop',
        'https://images.unsplash.com/photo-ZP7HXfjRVcY?w=600&q=80&fit=crop',
      ],
      yellow: [
        'https://images.unsplash.com/photo-1584811644165-33db40dbd5b8?w=600&q=80&fit=crop',
        'https://images.unsplash.com/photo-uESNpqs3Fb4?w=600&q=80&fit=crop',
      ],
    },
  },
  {
    id: 'earring-002',
    name: 'Сережки ДІЛЬВО Diamond Stud',
    prev: '8500',
    price: { amount: 7200, currency: 'UAH' },
    material: 'Золото 18K, діаманти 0.4 кт',
    weight: { num: 2.1, measurement: 'г' },
    color: 'білий золотий',
    images: {
      white: [
        'https://images.unsplash.com/photo-pQYSjhWz4cQ?w=600&q=80&fit=crop',
        'https://images.unsplash.com/photo-ZP7HXfjRVcY?w=600&q=80&fit=crop',
      ],
      rose: [
        'https://images.unsplash.com/photo-OExX5suedaA?w=600&q=80&fit=crop',
        'https://images.unsplash.com/photo-pQYSjhWz4cQ?w=600&q=80&fit=crop',
      ],
      yellow: [
        'https://images.unsplash.com/photo-uESNpqs3Fb4?w=600&q=80&fit=crop',
        'https://images.unsplash.com/photo-1584811644165-33db40dbd5b8?w=600&q=80&fit=crop',
      ],
    },
  },
  {
    id: 'earring-003',
    name: 'Сережки WAY Drop Pearl',
    prev: null,
    price: { amount: 3800, currency: 'UAH' },
    material: 'Золото 14K, перли культивовані',
    weight: { num: 4.2, measurement: 'г' },
    color: 'золотий/білий',
    images: {
      white: [
        'https://images.unsplash.com/photo-uESNpqs3Fb4?w=600&q=80&fit=crop',
        'https://images.unsplash.com/photo-1584811644165-33db40dbd5b8?w=600&q=80&fit=crop',
      ],
      rose: [
        'https://images.unsplash.com/photo-ZP7HXfjRVcY?w=600&q=80&fit=crop',
        'https://images.unsplash.com/photo-uESNpqs3Fb4?w=600&q=80&fit=crop',
      ],
      yellow: [
        'https://images.unsplash.com/photo-pQYSjhWz4cQ?w=600&q=80&fit=crop',
        'https://images.unsplash.com/photo-OExX5suedaA?w=600&q=80&fit=crop',
      ],
    },
  },
  {
    id: 'earring-004',
    name: 'Сережки ДІЛЬВО Ruby Drop',
    prev: null,
    price: { amount: 5900, currency: 'UAH' },
    material: 'Рожеве золото 18K, рубіни 0.3 кт',
    weight: { num: 3.5, measurement: 'г' },
    color: 'рожевий золотий',
    images: {
      white: [
        'https://images.unsplash.com/photo-OExX5suedaA?w=600&q=80&fit=crop',
        'https://images.unsplash.com/photo-ZP7HXfjRVcY?w=600&q=80&fit=crop',
      ],
      rose: [
        'https://images.unsplash.com/photo-1584811644165-33db40dbd5b8?w=600&q=80&fit=crop',
        'https://images.unsplash.com/photo-OExX5suedaA?w=600&q=80&fit=crop',
      ],
      yellow: [
        'https://images.unsplash.com/photo-ZP7HXfjRVcY?w=600&q=80&fit=crop',
        'https://images.unsplash.com/photo-pQYSjhWz4cQ?w=600&q=80&fit=crop',
      ],
    },
  },
]
