import { Products } from '@/components/business/Products/Products'
import { useParams, Outlet } from 'react-router-dom'

const Store = () => {
  const { slug } = useParams()

  if (slug) {
    return <Outlet />
  }
  return <Products />
}

export default Store
