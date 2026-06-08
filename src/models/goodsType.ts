export type ringsColors = 'white' | 'rose' | 'yellow'
export type MetalsType = 'gold' | 'silver' | 'platinum' | 'stainless steel'
export type StoneType =
  | 'diamonds'
  | 'sapphires'
  | 'rubies'
  | 'amethysts'
  | 'topazes'
  | 'aquamarines'
  | 'pearls'
  | 'opals'
  | 'garnets'

export type ProductType =
  | 'rings'
  | 'necklaces'
  | 'bracelets'
  | 'earrings'
  | 'pendants'
  | 'watches'
  | 'cufflinks'
  | 'chains'

export const METAL_LABELS: Record<MetalsType, string> = {
  gold: 'Золото',
  silver: 'Срібло',
  platinum: 'Платина',
  'stainless steel': 'Нержавіюча сталь',
}

export const STONE_LABELS: Record<StoneType, string> = {
  diamonds: 'Діаманти',
  sapphires: 'Сапфіри',
  rubies: 'Рубіни',
  amethysts: 'Аметисти',
  topazes: 'Топази',
  aquamarines: 'Аквамарини',
  pearls: 'Перли',
  opals: 'Опали',
  garnets: 'Гранати',
}

export const COLOR_PALETTE: Record<ringsColors, string> = {
  white: '#D3D3D3',
  yellow: '#C0BA97',
  rose: '#DBC5C5',
}

export const COLOR_LABELS: Record<ringsColors, string> = {
  white: 'Білий',
  rose: 'Рожевий',
  yellow: 'Жовтий',
}

export const CARE_INSTRUCTIONS: Record<MetalsType, string> = {
  gold: "Уникайте контакту з парфумами та побутовою хімією. Протирайте м'якою тканиною без ворсу після носіння. Зберігайте окремо в ювелірній шкатулці.",
  silver: "Протирайте срібло спеціальною антиоксидантною тканиною. Уникайте тривалого контакту з вологою і хлором. Зберігайте в герметичній упаковці.",
  platinum: "Платина стійка, але може подряпатися. Протирайте м'якою тканиною. При подряпинах зверніться до ювеліра для полірування. Зберігайте окремо.",
  'stainless steel': "Не потребує особливого догляду. Промивайте теплою водою з нейтральним милом, насухо витирайте. Стійка до іржі та подряпин.",
}

export const DELIVERY_INFO =
  "Доставка: Нова Пошта (2–3 дні), кур'єр по Києву (1 день). Вартість — за тарифами перевізника.\n\nПовернення: протягом 14 днів від отримання у незношеному стані з оригінальною упаковкою та чеком. Обмін або повне відшкодування."

export const PRODUCT_TYPE_LABELS: Record<ProductType, string> = {
  rings: 'Каблучки',
  necklaces: 'Намисто та кольє',
  bracelets: 'Браслети',
  earrings: 'Сережки',
  pendants: 'Підвіски',
  watches: 'Годинники',
  cufflinks: 'Запонки',
  chains: 'Ланцюжки',
}

export interface IRing {
  name: string
  prev: string | null
  price: {
    amount: number
    currency: string
  }
  metal: MetalsType[]
  stones: StoneType[]
  material: string
  weight: {
    num: number
    measurement: string
  }
  color: string
  images: Record<ringsColors, string[]>
}

export interface IProduct extends IRing {
  id: string
  category: ProductType
  sizes?: number[]
}
