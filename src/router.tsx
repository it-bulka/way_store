import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from 'react-router-dom'
import { App } from '@/App'
import { Layout } from '@/components/business/Layout/Layout'
import {
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
  ChosenGoods,
  PurchaseHistory,
  Collaborations,
  Collection,
  Collections,
  NotFound,
} from '@/pages'

import { colabGallery, colabInfo, colabTitle } from '@/data/collaboration'
import { colGallery, colInfo, colTitle } from '@/data/collection'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />

      <Route element={<Layout />}>
        <Route path="store" element={<Store />} />
        <Route path="goods" element={<Goods />} />

        <Route path="faq" element={<Faq />}>
          <Route path="questions" element={<Questions />} />
          <Route path="delivery" element={<Delivery />} />
          <Route path="payment" element={<Payment />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="*" element={<Navigate to="questions" />} />
        </Route>
        <Route path="account" element={<Account />}>
          <Route path="profile" element={<Profile />} />
          <Route path="purchase-history" element={<PurchaseHistory />} />
          <Route path="chosen" element={<ChosenGoods />} />
        </Route>
      </Route>

      <Route path="collaborations" element={<Collaborations />}>
        <Route
          path=":slug"
          element={<Collection gallery={colabGallery} title={colabTitle} info={colabInfo} />}
        />
      </Route>

      <Route path="collections" element={<Collections />}>
        <Route
          path=":slug"
          element={<Collection gallery={colGallery} title={colTitle} info={colInfo} />}
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
)
