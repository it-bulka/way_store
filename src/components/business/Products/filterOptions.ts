import { type IOption as IDropdownOption } from '@/components/ui/Dropdown/Dropdown'
import type { StoneType, ProductType, MetalsType } from '@/models'

export type FilterTypes = MetalsType | StoneType | ProductType
export type GoodsDropdownType<T extends FilterTypes = FilterTypes> = IDropdownOption<T>[]

export const metalsOptions: GoodsDropdownType<MetalsType> = [
  { id: '1', label: 'gold', displayLabel: 'Золото', chosen: false },
  { id: '2', label: 'silver', displayLabel: 'Срібло', chosen: false },
  { id: '3', label: 'platinum', displayLabel: 'Платина', chosen: false },
  { id: '4', label: 'stainless steel', displayLabel: 'Нержавіюча сталь', chosen: false },
]

export const stonesOptions: GoodsDropdownType<StoneType> = [
  { id: '1', label: 'diamonds', displayLabel: 'Діаманти', chosen: false },
  { id: '2', label: 'sapphires', displayLabel: 'Сапфіри', chosen: false },
  { id: '3', label: 'rubies', displayLabel: 'Рубіни', chosen: false },
  { id: '4', label: 'amethysts', displayLabel: 'Аметисти', chosen: false },
  { id: '5', label: 'topazes', displayLabel: 'Топази', chosen: false },
  { id: '6', label: 'aquamarines', displayLabel: 'Аквамарини', chosen: false },
  { id: '7', label: 'pearls', displayLabel: 'Перли', chosen: false },
  { id: '8', label: 'garnets', displayLabel: 'Гранати', chosen: false },
  { id: '9', label: 'opals', displayLabel: 'Опали', chosen: false },
]

export const productOptions: GoodsDropdownType<ProductType> = [
  { id: '1', label: 'rings', displayLabel: 'Каблучки', chosen: false },
  { id: '2', label: 'necklaces', displayLabel: 'Намисто', chosen: false },
  { id: '3', label: 'bracelets', displayLabel: 'Браслети', chosen: false },
  { id: '4', label: 'earrings', displayLabel: 'Сережки', chosen: false },
  { id: '5', label: 'pendants', displayLabel: 'Підвіски', chosen: false },
  { id: '6', label: 'watches', displayLabel: 'Годинники', chosen: false },
  { id: '7', label: 'cufflinks', displayLabel: 'Запонки', chosen: false },
  { id: '8', label: 'chains', displayLabel: 'Ланцюжки', chosen: false },
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
