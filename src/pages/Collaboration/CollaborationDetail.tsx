import { useLoaderData } from 'react-router-dom'
import Collection from './Collection'
import { collabs } from '@/data/collabs'
import NotFound from '@/pages/NotFound/NotFound'

type CollabItem = typeof collabs[number]

const CollaborationDetail = () => {
  const collab = useLoaderData() as CollabItem | null

  if (!collab) return <NotFound />

  return (
    <Collection
      title={collab.title}
      info={collab.detailInfo}
      gallery={collab.gallery}
      heroImage={collab.heroImage}
    />
  )
}

export default CollaborationDetail
