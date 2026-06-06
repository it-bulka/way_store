import type { IProduct } from '@/models/goodsType'

export const mockProducts: IProduct[] = [
  // ─── RINGS ────────────────────────────────────────────────────────────────
  {
    id: 'ring-001',
    name: 'Каблучка ДІЛЬВО Emerald Diamond',
    prev: '7200',
    price: { amount: 5800, currency: 'UAH' },
    material: 'Золото 18K, діамант 0.35 кт',
    weight: { num: 3.2, measurement: 'г' },
    color: 'золотий',
    images: {
      white: [
        'https://images.unsplash.com/photo-NhrcL_C0sFA?w=600&q=80&fit=crop',
        'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80&fit=crop',
      ],
      rose: [
        'https://images.unsplash.com/photo-Pxexdj3Q09g?w=600&q=80&fit=crop',
        'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80&fit=crop',
      ],
      yellow: [
        'https://images.unsplash.com/photo-ZYet8yoepik?w=600&q=80&fit=crop',
        'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&q=80&fit=crop',
      ],
    },
    sizes: [15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19, 20],
  },
  {
    id: 'ring-002',
    name: 'Каблучка WAY Sapphire Royal',
    prev: null,
    price: { amount: 9400, currency: 'UAH' },
    material: 'Золото 18K, сапфір 0.5 кт',
    weight: { num: 4.1, measurement: 'г' },
    color: 'білий золотий',
    images: {
      white: [
        'https://images.unsplash.com/photo-V3RCa8hZqPc?w=600&q=80&fit=crop',
        'https://images.unsplash.com/photo-NhrcL_C0sFA?w=600&q=80&fit=crop',
      ],
      rose: [
        'https://images.unsplash.com/photo-Pxexdj3Q09g?w=600&q=80&fit=crop',
        'https://images.unsplash.com/photo-V3RCa8hZqPc?w=600&q=80&fit=crop',
      ],
      yellow: [
        'https://images.unsplash.com/photo-zZLhoEwGCeM?w=600&q=80&fit=crop',
        'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80&fit=crop',
      ],
    },
    sizes: [15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19],
  },
  {
    id: 'ring-003',
    name: 'Каблучка WAY Classic Band',
    prev: null,
    price: { amount: 3600, currency: 'UAH' },
    material: 'Золото 14K',
    weight: { num: 2.8, measurement: 'г' },
    color: 'жовтий золотий',
    images: {
      white: [
        'https://images.unsplash.com/photo-WHUG4KXCbuI?w=600&q=80&fit=crop',
        'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&q=80&fit=crop',
      ],
      rose: [
        'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80&fit=crop',
        'https://images.unsplash.com/photo-WHUG4KXCbuI?w=600&q=80&fit=crop',
      ],
      yellow: [
        'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&q=80&fit=crop',
        'https://images.unsplash.com/photo-ZYet8yoepik?w=600&q=80&fit=crop',
      ],
    },
    sizes: [15, 16, 17, 18, 19, 20, 21],
  },
  {
    id: 'ring-004',
    name: 'Каблучка ДІЛЬВО Ruby Passion',
    prev: '12500',
    price: { amount: 10200, currency: 'UAH' },
    material: 'Золото 18K, рубін 0.7 кт',
    weight: { num: 4.6, measurement: 'г' },
    color: 'рожевий золотий',
    images: {
      white: [
        'https://images.unsplash.com/photo-zZLhoEwGCeM?w=600&q=80&fit=crop',
        'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80&fit=crop',
      ],
      rose: [
        'https://images.unsplash.com/photo-V3RCa8hZqPc?w=600&q=80&fit=crop',
        'https://images.unsplash.com/photo-Pxexdj3Q09g?w=600&q=80&fit=crop',
      ],
      yellow: [
        'https://images.unsplash.com/photo-NhrcL_C0sFA?w=600&q=80&fit=crop',
        'https://images.unsplash.com/photo-ZYet8yoepik?w=600&q=80&fit=crop',
      ],
    },
    sizes: [15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5],
  },
  {
    id: 'ring-005',
    name: 'Каблучка WAY Eternity Diamonds',
    prev: null,
    price: { amount: 18700, currency: 'UAH' },
    material: 'Платина 950, діаманти 1.2 кт',
    weight: { num: 5.3, measurement: 'г' },
    color: 'платиновий',
    images: {
      white: [
        'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80&fit=crop',
        'https://images.unsplash.com/photo-NhrcL_C0sFA?w=600&q=80&fit=crop',
      ],
      rose: [
        'https://images.unsplash.com/photo-Pxexdj3Q09g?w=600&q=80&fit=crop',
        'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&q=80&fit=crop',
      ],
      yellow: [
        'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80&fit=crop',
        'https://images.unsplash.com/photo-WHUG4KXCbuI?w=600&q=80&fit=crop',
      ],
    },
    sizes: [15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19],
  },
  {
    id: 'ring-006',
    name: 'Каблучка WAY Silver Minimal',
    prev: '2800',
    price: { amount: 2200, currency: 'UAH' },
    material: 'Срібло 925',
    weight: { num: 2.1, measurement: 'г' },
    color: 'срібний',
    images: {
      white: [
        'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&q=80&fit=crop',
        'https://images.unsplash.com/photo-WHUG4KXCbuI?w=600&q=80&fit=crop',
      ],
      rose: [
        'https://images.unsplash.com/photo-zZLhoEwGCeM?w=600&q=80&fit=crop',
        'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80&fit=crop',
      ],
      yellow: [
        'https://images.unsplash.com/photo-ZYet8yoepik?w=600&q=80&fit=crop',
        'https://images.unsplash.com/photo-NhrcL_C0sFA?w=600&q=80&fit=crop',
      ],
    },
    sizes: [15, 16, 17, 18, 19, 20],
  },

  // ─── NECKLACES ────────────────────────────────────────────────────────────
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

  // ─── BRACELETS ────────────────────────────────────────────────────────────
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

  // ─── EARRINGS ─────────────────────────────────────────────────────────────
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

  // ─── PENDANTS ─────────────────────────────────────────────────────────────
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

  // ─── WATCHES ──────────────────────────────────────────────────────────────
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

  // ─── CUFFLINKS ────────────────────────────────────────────────────────────
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

  // ─── CHAINS ───────────────────────────────────────────────────────────────
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
