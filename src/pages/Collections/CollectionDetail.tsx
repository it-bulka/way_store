import { useLoaderData } from 'react-router-dom'
import Collection from '@/pages/Collaboration/Collection'
import { useCollection } from '@/hooks/useCollections'
import type { CollectionBase } from '@/data/collectionsBase'
import NotFound from '@/pages/NotFound/NotFound'

const CollectionDetail = () => {
  const base = useLoaderData() as CollectionBase | null
  const collection = useCollection(base?.id ?? '')

  if (!collection) return <NotFound />

  return (
    <Collection
      title={collection.title}
      info={collection.detailInfo}
      gallery={collection.gallery}
      heroImage={collection.heroImage}
    />
  )
}

export default CollectionDetail
