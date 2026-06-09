import { useLoaderData } from 'react-router-dom'
import Collection from '@/pages/Collaboration/Collection'
import { collections } from '@/data/collections'
import NotFound from '@/pages/NotFound/NotFound'

type CollectionItem = typeof collections[number]

const CollectionDetail = () => {
  const collection = useLoaderData() as CollectionItem | null

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
