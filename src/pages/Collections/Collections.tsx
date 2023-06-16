import { CollectionInfo } from '@/components/ui/CollectionInfo/CollectionInfo'
import { collections } from '@/data/collections'
import { Outlet, useParams } from 'react-router-dom'
import { Layout } from '@/components/business/Layout/Layout'

export const Collections = () => {
  const { slug } = useParams()
  if (slug) {
    return <Outlet />
  }

  return (
    <Layout>
      {collections?.map(({ id, title, data, images }) => (
        <CollectionInfo title={title} data={data} images={images} key={id} id={id} />
      ))}
    </Layout>
  )
}

export default Collections
