# Firebase

## Configuration

Firebase is initialized in `src/base/firebase.ts`. The project uses:

- **Firestore** — product catalog, user profiles, orders
- **Authentication** — email/password + Google sign-in
- **Cloud Storage** — product images

## Firestore Schema

### Products

Products are organized by language and category:

```
products/
  translations/
    ukr/
      accessories/
        rings/       → documents: { name, price, material, weight, color, images, ... }
        necklaces/
        bracelets/
        earrings/
        pendants/
        watches/
        cufflinks/
        chains/
    eng/
      accessories/
        (same categories)
```

Use `PAGES.getRings('ukr')` and similar helpers from `src/models/pages.ts` to build collection paths.

### Users

```
users/{userId} → { name, email, phone, sex, birthday, address, comment }
```

### Orders

Orders are stored per user and contain items, delivery info, payment status.

## Service Layer (`src/services/`)

| Service | Purpose |
|---------|---------|
| `getDocInfo` | Fetch a single document by ID |
| `getDocsInfo` | Fetch multiple documents |
| `getSubcollectionDocs` | Query subcollection with Firestore filters |
| `getSubcollectionDocsPaged` | Paginated subcollection query |
| `getNextDoc` | Fetch next document (pagination cursor) |
| `getCollRef` | Get collection reference |
| `getCollectionById` | Fetch collection document by ID |
| `setUserData` | Create/update user profile |
| `createOrderDoc` | Create a new order |
| `saveSubscriber` | Save email subscription |
| `chosenFirestore` | Sync favorites to Firestore |
| `searchProducts` | Full-text product search |
| `novaposhta` | Nova Poshta API for delivery |
| `changePassword` | Firebase Auth password change |

## Usage Example

```typescript
import { getSubcollectionDocs } from '@/services'
import { where } from 'firebase/firestore'

const products = await getSubcollectionDocs<IProduct>({
  slugs: ['products', 'translations', 'ukr', 'accessories', 'rings'],
  queries: [where('metal', 'array-contains-any', ['gold'])]
})
```
