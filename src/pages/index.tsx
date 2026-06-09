import { lazy } from 'react'

const Home = lazy(() => import('./Home/Home'))
const Store = lazy(() => import('./Store/Store'))
const Goods = lazy(() => import('./Goods/Goods'))
const Faq = lazy(() => import('./FAQ/FAQ'))
export { Questions } from './FAQ/Questions'
export { Delivery } from './FAQ/Delivery'
export { Payment } from './FAQ/Payment'
export { Contacts } from './FAQ/Contacts'
const Account = lazy(() => import('./Account/Account'))
const Profile = lazy(() => import('./Account/Profile/Profile'))
const PurchaseHistory = lazy(() => import('./Account/PurchaseHistory/PurchaseHistory'))
const ChosenGoods = lazy(() => import('./Account/ChosenGoods/ChosenGoods'))
const Collaborations = lazy(() => import('./Collaborations/Collaborations'))
const Collection = lazy(() => import('./Collaboration/Collection'))
const CollaborationDetail = lazy(() => import('./Collaboration/CollaborationDetail'))
const Collections = lazy(() => import('./Collections/Collections'))
const About = lazy(() => import('./About/About'))
const NotFound = lazy(() => import('./NotFound/NotFound'))
const Privacy = lazy(() => import('./Privacy/Privacy'))
const Offer = lazy(() => import('./Offer/Offer'))
const Checkout = lazy(() => import('./Checkout/Checkout'))
const CheckoutSuccess = lazy(() => import('./CheckoutSuccess/CheckoutSuccess'))
const OrderDetail = lazy(() => import('./Account/OrderDetail/OrderDetail'))

export {
  Home,
  Store,
  Goods,
  Faq,
  Account,
  Profile,
  PurchaseHistory,
  ChosenGoods,
  Collaborations,
  Collections,
  Collection,
  CollaborationDetail,
  About,
  NotFound,
  Privacy,
  Offer,
  Checkout,
  CheckoutSuccess,
  OrderDetail,
}
