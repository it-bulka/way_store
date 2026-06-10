import { Products } from '@/components/business/Products/Products'
import { useParams, Outlet, useNavigation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { GoodsPageSkeleton } from '@/pages/Goods/GoodsPageSkeleton'
import { PageMeta } from '@/components/ui/PageMeta/PageMeta'

const Store = () => {
  const { slug } = useParams()
  const { state, location: pendingLocation } = useNavigation()
  const { t } = useTranslation('store')

  const isLoadingProduct =
    state === 'loading' && /^\/store\/[^/]+$/.test(pendingLocation?.pathname ?? '')

  if (isLoadingProduct) return <GoodsPageSkeleton />
  if (slug) return <Outlet />
  return (
    <>
      <PageMeta title={t('meta.title')} description={t('meta.description')} />
      <Products />
    </>
  )
}

export default Store
