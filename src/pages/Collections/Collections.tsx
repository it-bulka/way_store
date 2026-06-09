import { CollectionInfo } from '@/components/ui/CollectionInfo/CollectionInfo'
import { collections } from '@/data/collections'
import { Outlet, useParams } from 'react-router-dom'
import { Layout } from '@/components/business/Layout/Layout'
import { PageMeta } from '@/components/ui/PageMeta/PageMeta'

export const Collections = () => {
  const { slug } = useParams()
  if (slug) {
    return <Outlet />
  }

  return (
    <Layout>
      <PageMeta title="Колекції" />
      {collections?.map(({ id, title, content, images }) => (
        <CollectionInfo title={title} content={content} images={images} key={id} id={id} />
      ))}
    </Layout>
  )
}

export default Collections
