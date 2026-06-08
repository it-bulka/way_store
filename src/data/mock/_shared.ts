import type { ringsColors } from '@/models/goodsType'

type ImageRecord = Record<ringsColors, string[]>

export const imgs = (
  category: string,
  num: number,
  colorCounts: Partial<Record<ringsColors, number>>,
): ImageRecord => {
  const p = String(num).padStart(3, '0')
  const urls = (color: string, count: number) =>
    Array.from({ length: count }, (_, i) => `/products/${category}/${p}/${color}/${i + 1}.webp`)
  return {
    white:  colorCounts.white  ? urls('white',  colorCounts.white)  : [],
    rose:   colorCounts.rose   ? urls('rose',   colorCounts.rose)   : [],
    yellow: colorCounts.yellow ? urls('yellow', colorCounts.yellow) : [],
  }
}
