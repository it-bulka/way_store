import 'i18next'
import type ukCommon from './locales/uk/common.json'
import type ukHome from './locales/uk/home.json'
import type ukStore from './locales/uk/store.json'
import type ukGoods from './locales/uk/goods.json'
import type ukCart from './locales/uk/cart.json'
import type ukAuth from './locales/uk/auth.json'
import type ukAccount from './locales/uk/account.json'
import type ukCheckout from './locales/uk/checkout.json'
import type ukEnums from './locales/uk/enums.json'
import type ukAbout from './locales/uk/about.json'
import type ukCollections from './locales/uk/collections.json'
import type ukFaq from './locales/uk/faq.json'
import type ukOffer from './locales/uk/offer.json'
import type ukPrivacy from './locales/uk/privacy.json'

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common'
    resources: {
      common: typeof ukCommon
      home: typeof ukHome
      store: typeof ukStore
      goods: typeof ukGoods
      cart: typeof ukCart
      auth: typeof ukAuth
      account: typeof ukAccount
      checkout: typeof ukCheckout
      enums: typeof ukEnums
      about: typeof ukAbout
      collections: typeof ukCollections
      faq: typeof ukFaq
      offer: typeof ukOffer
      privacy: typeof ukPrivacy
    }
  }
}
