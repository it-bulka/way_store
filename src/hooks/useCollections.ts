import { useTranslation } from 'react-i18next'
import { collectionsBase, type CollectionBase } from '@/data/collectionsBase'

export interface CollectionItem extends CollectionBase {
  title: string
  content: string[]
  detailInfo: string
  gallery: (CollectionBase['gallery'][number] & { alt: string })[]
}

export function useCollections(): CollectionItem[] {
  const { t } = useTranslation('collections')
  const td = t as unknown as (key: string, opts?: object) => string
  const tArr = t as unknown as (key: string, opts: { returnObjects: true }) => string[]

  return collectionsBase.map(base => {
    const id = base.id
    return {
      ...base,
      title: td(`items.${id}.title`),
      content: tArr(`items.${id}.content`, { returnObjects: true }),
      detailInfo: tArr(`items.${id}.detailParagraphs`, { returnObjects: true }).join('\n\n'),
      gallery: base.gallery.map(g => ({
        ...g,
        alt: td(`items.${id}.gallery.${g.id}`),
      })),
    }
  })
}

export function useCollection(id: string): CollectionItem | null {
  const { t } = useTranslation('collections')
  const td = t as unknown as (key: string, opts?: object) => string
  const tArr = t as unknown as (key: string, opts: { returnObjects: true }) => string[]

  const base = collectionsBase.find(c => c.id === id)
  if (!base) return null

  return {
    ...base,
    title: td(`items.${id}.title`),
    content: tArr(`items.${id}.content`, { returnObjects: true }),
    detailInfo: tArr(`items.${id}.detailParagraphs`, { returnObjects: true }).join('\n\n'),
    gallery: base.gallery.map(g => ({
      ...g,
      alt: td(`items.${id}.gallery.${g.id}`),
    })),
  }
}
