import { Products } from '@/components/business/Products/Products'
import { useParams, Outlet, useNavigation } from 'react-router-dom'
import { GoodsPageSkeleton } from '@/pages/Goods/GoodsPageSkeleton'
import { PageMeta } from '@/components/ui/PageMeta/PageMeta'

const Store = () => {
  const { slug } = useParams()
  const { state, location: pendingLocation } = useNavigation()

  const isLoadingProduct =
    state === 'loading' && /^\/store\/[^/]+$/.test(pendingLocation?.pathname ?? '')

  if (isLoadingProduct) return <GoodsPageSkeleton />
  if (slug) return <Outlet />
  return (
    <>
      <PageMeta
        title="Магазин"
        description="Обирайте ювелірні прикраси з колекції Way: каблучки, намисто, браслети, сережки."
      />
      <Products />
    </>
  )
}

export default Store
