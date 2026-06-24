# Architecture

## Overview

Way Store is a single-page application built with React 18 and TypeScript. Vite handles bundling with manual chunk splitting for vendor libraries (react, firebase, redux, i18n, forms).

## Layers

```
Browser
  └─ React Router v6 (createBrowserRouter + loaders)
       └─ Pages (lazy-loaded via React.lazy)
            ├─ Business Components (Header, Footer, Layout, ProtectedRoute)
            │    └─ UI Components (Input, Button, Modal, Select, etc.)
            ├─ Redux Toolkit (global state)
            │    ├─ Slices: cart, products, auth, user, order, filterCategory
            │    ├─ Async Thunks → Firestore services
            │    └─ Middleware: localStorage sync for cart
            └─ Firebase SDK
                 ├─ Firestore (products, users, orders)
                 ├─ Auth (email/password, Google sign-in)
                 └─ Storage (product images)
```

## Routing

Routes are defined in `src/router.tsx` using `createBrowserRouter` with `createRoutesFromElements`. Key patterns:

- **Loaders** — `goodsLoader`, `orderLoader`, `collaborationLoader`, `collectionLoader` pre-fetch data before rendering
- **Layout wrapper** — most pages are wrapped in `<Layout />` (Header + Footer)
- **Protected routes** — `<ProtectedRoute />` redirects unauthenticated users
- **Lazy loading** — all pages are exported via `React.lazy` from `src/pages/index.tsx`

## State Management

Redux Toolkit with 6 slices:

| Slice | Purpose |
|-------|---------|
| `authSlice` | Firebase Auth state (user auth info, loading, errors) |
| `userSlice` | User profile data from Firestore |
| `productsSlice` | Product listings + chosen/favorites |
| `cartSlice` | Shopping cart items |
| `orderSlice` | Orders (create, fetch history) |
| `filterCategorySlice` | Active filters (metal, stones, product type, price range) |

**Typed hooks**: always use `useAppDispatch` / `useAppSelector` from `src/hooks/reduxHooks.ts`.

**Selectors** are in `src/redux/selectors/` — one file per domain.

**Async thunks** are in `src/redux/async/` — each thunk calls a Firestore service and dispatches the result.

**Middleware**: `localStorageMW` persists cart state to localStorage.

## Path Aliases

`@/` is aliased to `src/` via Vite config:

```typescript
import { Something } from '@/components/ui/Something'
```

## Build Optimization

Manual chunks in `vite.config.ts` split vendor code:

- `vendor-react` — react, react-dom, react-router-dom
- `vendor-firebase` — firebase SDK modules
- `vendor-redux` — @reduxjs/toolkit, react-redux
- `vendor-i18n` — i18next ecosystem
- `vendor-forms` — react-hook-form, yup

## Styling

- SCSS Modules per component (`Component.module.scss`)
- Global variables in `src/styles/_global.scss`
- Mixins in `src/styles/_mixin.scss`
- Both files are auto-imported via Vite's `additionalData`
- `classnames` library for conditional class composition
