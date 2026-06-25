import { Products } from '@/components/business/Products/Products'
import { useParams, Outlet, useNavigation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { GoodsPageSkeleton } from '@/pages/Goods/GoodsPageSkeleton'
import { PageMeta } from '@/components/ui/PageMeta/PageMeta'

const Store = () => {
  const { slug } = useParams()
  const { state, location: pendingLocation } = useNavigation()
  const { t } = useTranslation('store')

  const isFirstProductLoad =
    state === 'loading' &&
    !slug &&
    /^\/store\/[^/]+$/.test(pendingLocation?.pathname ?? '')

  if (isFirstProductLoad) return <GoodsPageSkeleton />
  if (slug) return <Outlet />
  return (
    <>
      <PageMeta title={t('meta.title')} description={t('meta.description')} />
      <Products />
    </>
  )
}

export default Store
