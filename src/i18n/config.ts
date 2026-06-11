import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import ukCommon from './locales/uk/common.json'
import ukHome from './locales/uk/home.json'
import ukStore from './locales/uk/store.json'
import ukGoods from './locales/uk/goods.json'
import ukCart from './locales/uk/cart.json'
import ukAuth from './locales/uk/auth.json'
import ukAccount from './locales/uk/account.json'
import ukCheckout from './locales/uk/checkout.json'
import ukEnums from './locales/uk/enums.json'
import ukAbout from './locales/uk/about.json'
import ukCollections from './locales/uk/collections.json'
import ukFaq from './locales/uk/faq.json'
import ukOffer from './locales/uk/offer.json'
import ukPrivacy from './locales/uk/privacy.json'

import enCommon from './locales/en/common.json'
import enHome from './locales/en/home.json'
import enStore from './locales/en/store.json'
import enGoods from './locales/en/goods.json'
import enCart from './locales/en/cart.json'
import enAuth from './locales/en/auth.json'
import enAccount from './locales/en/account.json'
import enCheckout from './locales/en/checkout.json'
import enEnums from './locales/en/enums.json'
import enAbout from './locales/en/about.json'
import enCollections from './locales/en/collections.json'
import enFaq from './locales/en/faq.json'
import enOffer from './locales/en/offer.json'
import enPrivacy from './locales/en/privacy.json'

import plCommon from './locales/pl/common.json'
import plHome from './locales/pl/home.json'
import plStore from './locales/pl/store.json'
import plGoods from './locales/pl/goods.json'
import plCart from './locales/pl/cart.json'
import plAuth from './locales/pl/auth.json'
import plAccount from './locales/pl/account.json'
import plCheckout from './locales/pl/checkout.json'
import plEnums from './locales/pl/enums.json'
import plAbout from './locales/pl/about.json'
import plCollections from './locales/pl/collections.json'
import plFaq from './locales/pl/faq.json'
import plOffer from './locales/pl/offer.json'
import plPrivacy from './locales/pl/privacy.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      uk: {
        common: ukCommon,
        home: ukHome,
        store: ukStore,
        goods: ukGoods,
        cart: ukCart,
        auth: ukAuth,
        account: ukAccount,
        checkout: ukCheckout,
        enums: ukEnums,
        about: ukAbout,
        collections: ukCollections,
        faq: ukFaq,
        offer: ukOffer,
        privacy: ukPrivacy,
      },
      en: {
        common: enCommon,
        home: enHome,
        store: enStore,
        goods: enGoods,
        cart: enCart,
        auth: enAuth,
        account: enAccount,
        checkout: enCheckout,
        enums: enEnums,
        about: enAbout,
        collections: enCollections,
        faq: enFaq,
        offer: enOffer,
        privacy: enPrivacy,
      },
      pl: {
        common: plCommon,
        home: plHome,
        store: plStore,
        goods: plGoods,
        cart: plCart,
        auth: plAuth,
        account: plAccount,
        checkout: plCheckout,
        enums: plEnums,
        about: plAbout,
        collections: plCollections,
        faq: plFaq,
        offer: plOffer,
        privacy: plPrivacy,
      },
    },
    lng: undefined,
    fallbackLng: 'uk',
    defaultNS: 'common',
    ns: ['common', 'home', 'store', 'goods', 'cart', 'auth', 'account', 'checkout', 'enums', 'about', 'collections', 'faq', 'offer', 'privacy'],
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'way_store_lang',
    },
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
