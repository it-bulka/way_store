import Col1 from '@/assets/collection/collection-1.jpg'
import Col2 from '@/assets/collection/collection-2.jpg'
import Col3 from '@/assets/collection/collection-3.jpg'
import Col4 from '@/assets/collection/collection-4.jpg'
import Col5 from '@/assets/collection/collection-5.jpg'

export interface GalleryItemBase {
  id: string
  img: string
  productId?: string
  productCategory?: string
}

export interface CollectionBase {
  id: string
  images: string[]
  heroImage: string
  gallery: GalleryItemBase[]
  productIds: string[]
}

export const collectionsBase: CollectionBase[] = [
  {
    id: '1',
    images: [
      '/products/rings/001/white/1.webp',
      '/products/necklaces/001/white/1.webp',
      '/products/earrings/005/white/1.webp',
    ],
    heroImage: Col1,
    gallery: [
      { id: '1', img: '/products/rings/001/white/1.webp', productId: 'ring-001', productCategory: 'rings' },
      { id: '2', img: '/products/necklaces/001/white/1.webp', productId: 'necklace-001', productCategory: 'necklaces' },
      { id: '3', img: '/products/earrings/005/white/1.webp', productId: 'earring-005', productCategory: 'earrings' },
      { id: '4', img: '/products/rings/002/white/1.webp', productId: 'ring-002', productCategory: 'rings' },
      { id: '5', img: '/products/bracelets/005/white/1.webp', productId: 'bracelet-005', productCategory: 'bracelets' },
    ],
    productIds: ['ring-001', 'ring-002', 'necklace-001', 'earring-005', 'bracelet-005'],
  },
  {
    id: '2',
    images: ['/products/rings/004/rose/1.webp', '/products/earrings/001/yellow/1.webp'],
    heroImage: Col3,
    gallery: [
      { id: '1', img: '/products/rings/004/rose/1.webp', productId: 'ring-004', productCategory: 'rings' },
      { id: '2', img: '/products/earrings/001/yellow/1.webp', productId: 'earring-001', productCategory: 'earrings' },
      { id: '3', img: '/products/necklaces/004/yellow/1.webp', productId: 'necklace-004', productCategory: 'necklaces' },
      { id: '4', img: '/products/bracelets/002/yellow/1.webp', productId: 'bracelet-002', productCategory: 'bracelets' },
      { id: '5', img: '/products/rings/016/rose/1.webp', productId: 'ring-016', productCategory: 'rings' },
    ],
    productIds: ['ring-004', 'ring-016', 'necklace-004', 'bracelet-002', 'earring-001'],
  },
  {
    id: '3',
    images: [
      '/products/rings/001/white/1.webp',
      '/products/bracelets/003/white/1.webp',
      '/products/earrings/001/white/1.webp',
    ],
    heroImage: Col2,
    gallery: [
      { id: '1', img: '/products/rings/001/white/1.webp', productId: 'ring-001', productCategory: 'rings' },
      { id: '2', img: '/products/bracelets/003/white/1.webp', productId: 'bracelet-003', productCategory: 'bracelets' },
      { id: '3', img: '/products/earrings/001/white/1.webp', productId: 'earring-001', productCategory: 'earrings' },
      { id: '4', img: '/products/necklaces/003/white/1.webp', productId: 'necklace-003', productCategory: 'necklaces' },
      { id: '5', img: '/products/bracelets/004/white/1.webp', productId: 'bracelet-004', productCategory: 'bracelets' },
    ],
    productIds: ['ring-001', 'bracelet-003', 'bracelet-004', 'earring-001', 'necklace-003'],
  },
  {
    id: '4',
    images: ['/products/pendants/001/yellow/1.webp', '/products/chains/001/yellow/1.webp'],
    heroImage: Col4,
    gallery: [
      { id: '1', img: '/products/pendants/001/yellow/1.webp', productId: 'pendant-001', productCategory: 'pendants' },
      { id: '2', img: '/products/chains/001/yellow/1.webp', productId: 'chain-001', productCategory: 'chains' },
      { id: '3', img: '/products/pendants/002/yellow/1.webp', productId: 'pendant-002', productCategory: 'pendants' },
      { id: '4', img: '/products/chains/003/yellow/1.webp', productId: 'chain-003', productCategory: 'chains' },
      { id: '5', img: '/products/pendants/006/yellow/1.webp', productId: 'pendant-006', productCategory: 'pendants' },
    ],
    productIds: ['pendant-001', 'pendant-002', 'pendant-006', 'chain-001', 'chain-003'],
  },
  {
    id: '5',
    images: [
      '/products/watches/001/white/1.webp',
      '/products/cufflinks/001/yellow/1.webp',
      '/products/earrings/010/rose/1.webp',
    ],
    heroImage: Col5,
    gallery: [
      { id: '1', img: '/products/watches/001/white/1.webp', productId: 'watch-001', productCategory: 'watches' },
      { id: '2', img: '/products/cufflinks/001/yellow/1.webp', productId: 'cufflink-001', productCategory: 'cufflinks' },
      { id: '3', img: '/products/earrings/010/rose/1.webp', productId: 'earring-010', productCategory: 'earrings' },
      { id: '4', img: '/products/watches/003/white/1.webp', productId: 'watch-003', productCategory: 'watches' },
      { id: '5', img: '/products/cufflinks/003/white/1.webp', productId: 'cufflink-003', productCategory: 'cufflinks' },
    ],
    productIds: ['watch-001', 'watch-003', 'earring-010', 'cufflink-001', 'cufflink-003'],
  },
]
