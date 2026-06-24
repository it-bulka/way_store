# Way — Jewelry E-Commerce

Online jewelry store for the Ukrainian market. Browse collections of rings, necklaces, bracelets, earrings and more with multi-language support (UK / EN / PL).

**Live:** [way-store.netlify.app](https://way-store.netlify.app)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript |
| Build | Vite |
| State | Redux Toolkit |
| Backend | Firebase (Firestore, Auth, Storage) |
| Routing | React Router v6 (loaders) |
| Forms | react-hook-form + yup |
| Styling | SCSS Modules |
| i18n | i18next (UK, EN, PL) |
| Payments | WayForPay |
| Testing | Vitest + Playwright |

## Quick Start

```bash
npm install
npm run dev        # http://localhost:3000
```

### Other Commands

```bash
npm run build           # production build
npm run build:analyze   # build + bundle analyzer
npm run test            # unit tests (vitest)
npm run test:watch      # unit tests in watch mode
npm run test:e2e        # e2e tests (playwright)
npm run lint            # eslint check
npm run lint:fix        # eslint auto-fix
npm run prettier:fix    # prettier auto-fix
npm run seed            # seed Firestore with test data
```

## Project Structure

```
src/
├── components/
│   ├── ui/            # Reusable presentational components
│   └── business/      # Feature components (Header, Footer, Layout)
├── pages/             # Route pages (lazy-loaded)
├── redux/
│   ├── reducers/      # Slices: cart, products, auth, user, order, filterCategory
│   ├── async/         # Async thunks (fetch, sync, auth)
│   ├── selectors/     # Memoized selectors
│   └── middleware/     # localStorage persistence
├── services/          # Firestore & API helpers
├── hooks/             # Custom React hooks
├── models/            # TypeScript interfaces & route constants
├── i18n/              # i18next config + locale files (uk/en/pl)
├── styles/            # Global SCSS variables, mixins, reset
├── utils/             # Formatting & helper functions
└── assets/            # Images, SVG icons, fonts
```

## Pages

| Route | Page |
|-------|------|
| `/` | Home (hero + stats) |
| `/store` | Product catalog with filters |
| `/store/:slug` | Product detail |
| `/checkout` | Checkout (delivery + payment) |
| `/checkout/success` | Order confirmation |
| `/account/profile` | User profile (protected) |
| `/account/purchase-history` | Order history (protected) |
| `/account/chosen` | Favorites (protected) |
| `/collections` | Collections |
| `/collaborations` | Collaborations |
| `/faq/*` | FAQ (questions, delivery, payment, contacts) |
| `/about` | About |
| `/privacy` | Privacy policy |
| `/offer` | Public offer |

## Documentation

- [Architecture](docs/architecture.md) — project structure, state management, data flow
- [Components](docs/components.md) — UI and business component conventions
- [Firebase](docs/firebase.md) — Firestore schema, collections, services
- [i18n](docs/i18n.md) — internationalization setup, adding translations
- [Testing](docs/testing.md) — unit and e2e testing guide

## License

Private project.
