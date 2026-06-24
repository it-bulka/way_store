# Testing

## Unit Tests (Vitest)

Configuration: `vitest.config.ts`

```bash
npm run test          # run once
npm run test:watch    # watch mode
```

### Test Files

Unit tests are co-located with source files using the `.test.ts` suffix:

```
src/redux/reducers/cartSlice.test.ts
src/redux/reducers/authSlice.test.ts
src/redux/reducers/orderSlice.test.ts
src/redux/reducers/filterCategorySlice.test.ts
src/redux/reducers/productsSlice.test.ts
src/redux/reducers/userSlice.test.ts
src/utils/formatNumberIntoGroups.test.ts
src/utils/storage.test.ts
src/utils/data.test.ts
```

Primary focus: Redux slice reducers and utility functions.

### Environment

Uses `happy-dom` as the test environment (configured in `vitest.config.ts`).

## E2E Tests (Playwright)

Configuration: `playwright.config.ts`

```bash
npm run test:e2e
```

### Test Files

```
e2e/cart.spec.ts    # Cart flow tests
e2e/auth.spec.ts    # Authentication flow tests
e2e/helpers.ts      # Shared test utilities
```

## Seeding Test Data

```bash
npm run seed            # seed Firestore
npm run seed:local      # seed local only
npm run seed:fresh      # clear + seed local
```

Seed script: `scripts/seedFirestore.ts` with mock data from `scripts/mockData.ts`.
