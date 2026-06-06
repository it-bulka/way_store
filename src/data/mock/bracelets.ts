import type { IProduct } from '@/models/goodsType'

export const mockBracelets: IProduct[] = [
  {
    id: 'bracelet-001',
    name: 'Браслет WAY Gold Link',
    prev: null,
    price: { amount: 5400, currency: 'UAH' },
    material: 'Золото 18K',
    weight: { num: 9.2, measurement: 'г' },
    color: 'золотий',
    images: {
      white: [
        'https://images.unsplash.com/photo-oO0JAOJhquk?w=600&q=80&fit=crop',
        'https://images.unsplash.com/photo-1534482421-64566f976cfa?w=600&q=80&fit=crop',
      ],
      rose: [
        'https://images.unsplash.com/photo-Z3GHeY0NXGg?w=600&q=80&fit=crop',
        'https://images.unsplash.com/photo-oO0JAOJhquk?w=600&q=80&fit=crop',
      ],
      yellow: [
        'https://images.unsplash.com/photo-1534482421-64566f976cfa?w=600&q=80&fit=crop',
        'https://images.unsplash.com/photo-AoZrJQ80KCc?w=600&q=80&fit=crop',
      ],
    },
  },
  {
    id: 'bracelet-002',
    name: 'Браслет ДІЛЬВО Tennis Diamond',
    prev: '22000',
    price: { amount: 19500, currency: 'UAH' },
    material: 'Золото 18K, діаманти 2.0 кт',
    weight: { num: 10.7, measurement: 'г' },
    color: 'білий золотий',
    images: {
      white: [
        'https://images.unsplash.com/photo-C-XcZckjKQM?w=600&q=80&fit=crop',
        'https://images.unsplash.com/photo-oO0JAOJhquk?w=600&q=80&fit=crop',
      ],
      rose: [
        'https://images.unsplash.com/photo-AoZrJQ80KCc?w=600&q=80&fit=crop',
        'https://images.unsplash.com/photo-C-XcZckjKQM?w=600&q=80&fit=crop',
      ],
      yellow: [
        'https://images.unsplash.com/photo-oO0JAOJhquk?w=600&q=80&fit=crop',
        'https://images.unsplash.com/photo-Z3GHeY0NXGg?w=600&q=80&fit=crop',
      ],
    },
  },
  {
    id: 'bracelet-003',
    name: 'Браслет WAY Charm Vintage',
    prev: null,
    price: { amount: 3200, currency: 'UAH' },
    material: 'Срібло 925',
    weight: { num: 7.5, measurement: 'г' },
    color: 'срібний',
    images: {
      white: [
        'https://images.unsplash.com/photo-AoZrJQ80KCc?w=600&q=80&fit=crop',
        'https://images.unsplash.com/photo-1534482421-64566f976cfa?w=600&q=80&fit=crop',
      ],
      rose: [
        'https://images.unsplash.com/photo-oO0JAOJhquk?w=600&q=80&fit=crop',
        'https://images.unsplash.com/photo-AoZrJQ80KCc?w=600&q=80&fit=crop',
      ],
      yellow: [
        'https://images.unsplash.com/photo-Z3GHeY0NXGg?w=600&q=80&fit=crop',
        'https://images.unsplash.com/photo-C-XcZckjKQM?w=600&q=80&fit=crop',
      ],
    },
  },
  {
    id: 'bracelet-004',
    name: 'Браслет ДІЛЬВО Bangle Rose Gold',
    prev: '7800',
    price: { amount: 6400, currency: 'UAH' },
    material: 'Рожеве золото 18K',
    weight: { num: 11.3, measurement: 'г' },
    color: 'рожевий золотий',
    images: {
      white: [
        'https://images.unsplash.com/photo-Z3GHeY0NXGg?w=600&q=80&fit=crop',
        'https://images.unsplash.com/photo-AoZrJQ80KCc?w=600&q=80&fit=crop',
      ],
      rose: [
        'https://images.unsplash.com/photo-1534482421-64566f976cfa?w=600&q=80&fit=crop',
        'https://images.unsplash.com/photo-Z3GHeY0NXGg?w=600&q=80&fit=crop',
      ],
      yellow: [
        'https://images.unsplash.com/photo-C-XcZckjKQM?w=600&q=80&fit=crop',
        'https://images.unsplash.com/photo-oO0JAOJhquk?w=600&q=80&fit=crop',
      ],
    },
  },
]
