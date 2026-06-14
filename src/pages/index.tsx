import { lazy } from 'react'

const Home = lazy(() => import('./Home/Home'))
const Store = lazy(() => import('./Store/Store'))
const Goods = lazy(() => import('./Goods/Goods'))
const Faq = lazy(() => import('./FAQ/FAQ'))
const Questions = lazy(() => import('./FAQ/Questions').then(m => ({ default: m.Questions })))
const Delivery = lazy(() => import('./FAQ/Delivery').then(m => ({ default: m.Delivery })))
const Payment = lazy(() => import('./FAQ/Payment').then(m => ({ default: m.Payment })))
const Contacts = lazy(() => import('./FAQ/Contacts').then(m => ({ default: m.Contacts })))
const Account = lazy(() => import('./Account/Account'))
const Profile = lazy(() => import('./Account/Profile/Profile'))
const PurchaseHistory = lazy(() => import('./Account/PurchaseHistory/PurchaseHistory'))
const ChosenGoods = lazy(() => import('./Account/ChosenGoods/ChosenGoods'))
const Collaborations = lazy(() => import('./Collaborations/Collaborations'))
const Collection = lazy(() => import('./Collaboration/Collection'))
const CollaborationDetail = lazy(() => import('./Collaboration/CollaborationDetail'))
const Collections = lazy(() => import('./Collections/Collections'))
const CollectionDetail = lazy(() => import('./Collections/CollectionDetail'))
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
  Questions,
  Delivery,
  Payment,
  Contacts,
  Account,
  Profile,
  PurchaseHistory,
  ChosenGoods,
  Collaborations,
  Collections,
  CollectionDetail,
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
