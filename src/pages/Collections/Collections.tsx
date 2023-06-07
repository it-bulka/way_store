import { CollectionInfo } from '@/components/ui/CollectionInfo/CollectionInfo'
import { collections } from '@/data/collections'

export const Collections = () => {
  return (
    <div>
      {collections?.map(({ id, title, data, images }) => (
        <CollectionInfo title={title} data={data} images={images} key={id} />
      ))}
    </div>
  )
}
