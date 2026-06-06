import { lazy } from 'react'

const Home = lazy(() => import('./Home/Home'))
const Store = lazy(() => import('./Store/Store'))
const Goods = lazy(() => import('./Goods/Goods'))
const Faq = lazy(() => import('./FAQ/FAQ'))
export { Contacts, Delivery, Payment, Questions } from './FAQ/FAQ'
const Account = lazy(() => import('./Account/Account'))
const Profile = lazy(() => import('./Account/Profile/Profile'))
const PurchaseHistory = lazy(() => import('./Account/PurchaseHistory/PurchaseHistory'))
const ChosenGoods = lazy(() => import('./Account/ChosenGoods/ChosenGoods'))
const Collaborations = lazy(() => import('./Collaborations/Collaborations'))
const Collection = lazy(() => import('./Collaboration/Collection'))
const Collections = lazy(() => import('./Collections/Collections'))
const About = lazy(() => import('./About/About'))
const NotFound = lazy(() => import('./NotFound/NotFound'))
const Privacy = lazy(() => import('./Privacy/Privacy'))
const Offer = lazy(() => import('./Offer/Offer'))

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
  About,
  NotFound,
  Privacy,
  Offer,
}
