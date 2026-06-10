import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from 'react-router-dom'
import { App } from '@/components/App.tsx'
import { Layout } from '@/components/business/Layout/Layout'
import { ProtectedRoute } from '@/components/business/ProtectedRoute/ProtectedRoute'
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
  CollaborationDetail,
  Collections,
  CollectionDetail,
  About,
  NotFound,
  Privacy,
  Offer,
  Checkout,
  CheckoutSuccess,
  OrderDetail,
} from '@/pages'

import { goodsLoader } from '@/pages/Goods/goodsLoader'
import { GoodsError } from '@/pages/Goods/GoodsError'
import { orderLoader } from '@/pages/Account/OrderDetail/OrderDetail'
import { collaborationLoader } from '@/pages/Collaboration/collaborationLoader'
import { collectionLoader } from '@/pages/Collections/collectionLoader'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />

      <Route element={<Layout />}>
        <Route path="store" element={<Store />}>
          <Route
            path=":slug"
            element={<Goods />}
            loader={goodsLoader}
            errorElement={<GoodsError />}
          />
        </Route>
        <Route path="goods" element={<Goods />} />

        <Route path="faq" element={<Faq />}>
          <Route path="questions" element={<Questions />} />
          <Route path="delivery" element={<Delivery />} />
          <Route path="payment" element={<Payment />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="*" element={<Navigate to="questions" />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="account" element={<Account />}>
            <Route index element={<Navigate to="profile" replace />} />
            <Route path="profile" element={<Profile />} />
            <Route path="purchase-history" element={<PurchaseHistory />} />
            <Route path="chosen" element={<ChosenGoods />} />
          </Route>
          <Route
            path="account/purchase-history/:orderId"
            element={<OrderDetail />}
            loader={orderLoader}
          />
        </Route>

        <Route path="about" element={<About />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="offer" element={<Offer />} />
        <Route path="checkout">
          <Route index element={<Checkout />} />
          <Route path="success" element={<CheckoutSuccess />} />
        </Route>
      </Route>

      <Route path="collaborations" element={<Collaborations />}>
        <Route path=":slug" element={<CollaborationDetail />} loader={collaborationLoader} />
      </Route>

      <Route path="collections" element={<Collections />}>
        <Route path=":slug" element={<CollectionDetail />} loader={collectionLoader} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
)
