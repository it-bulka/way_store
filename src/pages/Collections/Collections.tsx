import { useTranslation } from 'react-i18next'
import { CollectionInfo } from '@/components/ui/CollectionInfo/CollectionInfo'
import { useCollections } from '@/hooks/useCollections'
import { Outlet, useParams } from 'react-router-dom'
import { Layout } from '@/components/business/Layout/Layout'
import { PageMeta } from '@/components/ui/PageMeta/PageMeta'

export const Collections = () => {
  const { t } = useTranslation('collections')
  const { slug } = useParams()
  const collections = useCollections()

  if (slug) {
    return <Outlet />
  }

  return (
    <Layout>
      <PageMeta title={t('meta.title')} />
      {collections.map(({ id, title, content, images }) => (
        <CollectionInfo title={title} content={content} images={images} key={id} id={id} />
      ))}
    </Layout>
  )
}

export default Collections
