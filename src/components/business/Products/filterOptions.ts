import { type IOption as IDropdownOption } from '@/components/ui/Dropdown/Dropdown'
import type { StoneType, ProductType, MetalsType } from '@/models'

export type FilterTypes = MetalsType | StoneType | ProductType
export type GoodsDropdownType<T extends FilterTypes = FilterTypes> = IDropdownOption<T>[]

export const metalsOptions: GoodsDropdownType<MetalsType> = [
  { id: '1', label: 'gold', chosen: false },
  { id: '2', label: 'silver', chosen: false },
  { id: '3', label: 'platinum', chosen: false },
  { id: '4', label: 'stainless steel', chosen: false },
]

export const stonesOptions: GoodsDropdownType<StoneType> = [
  { id: '1', label: 'diamonds', chosen: false },
  { id: '2', label: 'sapphires', chosen: false },
  { id: '3', label: 'rubies', chosen: false },
  { id: '4', label: 'amethysts', chosen: false },
  { id: '5', label: 'topazes', chosen: false },
  { id: '6', label: 'aquamarines', chosen: false },
  { id: '7', label: 'pearls', chosen: false },
  { id: '8', label: 'garnets', chosen: false },
  { id: '9', label: 'opals', chosen: false },
]

export const productOptions: GoodsDropdownType<ProductType> = [
  { id: '1', label: 'rings', chosen: false },
  { id: '2', label: 'necklaces', chosen: false },
  { id: '3', label: 'bracelets', chosen: false },
  { id: '4', label: 'earrings', chosen: false },
  { id: '5', label: 'pendants', chosen: false },
  { id: '6', label: 'watches', chosen: false },
  { id: '7', label: 'cufflinks', chosen: false },
  { id: '8', label: 'chains', chosen: false },
]

export const categoryTitles: Record<ProductType, string> = {
  rings: 'КАБЛУЧКИ',
  necklaces: 'НАМИСТО',
  bracelets: 'БРАСЛЕТИ',
  earrings: 'СЕРЕЖКИ',
  pendants: 'ПІДВІСКИ',
  watches: 'ГОДИННИКИ',
  cufflinks: 'ЗАПОНКИ',
  chains: 'ЛАНЦЮЖКИ',
}
