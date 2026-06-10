import type { IProduct, ringsColors } from '@/models/goodsType'
import type { ICartItem } from '@/redux/types/cartTypes'

export function buildDefaultCartItem(product: IProduct, amount = 1): ICartItem {
  const colorKeys = (Object.keys(product.images) as ringsColors[]).filter(
    k => product.images[k].length > 0
  )
  const defaultColor = colorKeys[0]
  const colorImages = colorKeys.reduce<Partial<Record<ringsColors, string>>>(
    (acc, k) => ({ ...acc, [k]: product.images[k][0] }),
    {}
  )
  return {
    id: product.id,
    title: product.name,
    amount,
    price: product.price.amount,
    img: product.images[defaultColor][0],
    color: defaultColor,
    colorImages,
    availableSizes: product.sizes,
    size: product.sizes?.[0],
  }
}
