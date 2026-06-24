# Components

## Directory Structure

```
src/components/
├── ui/           # Reusable, presentational (no business logic)
└── business/     # Feature-specific (connected to Redux, routing, etc.)
```

## UI Components (`src/components/ui/`)

Pure presentational components. Accept props, render UI, no side effects.

| Component | Purpose |
|-----------|---------|
| `Input` | Text input with `IRegister<T>` pattern for react-hook-form |
| `Select` | Dropdown select with form register support |
| `Button` | Styled button with variants |
| `Modal` | Overlay modal with `useControlModal` hook |
| `Checkbox` / `RadioBtn` | Form controls |
| `TextField` | Multi-line text input |
| `Accordion` | Collapsible content sections |
| `Tooltip` | Hover tooltip |
| `AppLink` | Styled `<Link>` wrapper |
| `Breadcrumbs` | Navigation breadcrumbs |
| `PageNav` | Pagination controls |
| `Sidebar` | Category sidebar for store |
| `Cart` | Cart drawer (CartHeader, CartItem, CartFooter) |
| `SearchBar` | Search input |
| `SearchDropdown` | Search results dropdown |
| `RangeSlider` | Price range filter |
| `ColorPicker` | Color variant selector |
| `SizeSelector` | Size picker for products |
| `ImgTabs` | Image gallery with tabs |
| `Loader` | Loading spinner |
| `ErrorBoundary` | React error boundary |
| `Absent` | Empty state placeholder |
| `Info` | Informational message |
| `Toast` / `ToastContainer` | Notification toasts |
| `Typography` | Text component with variants |
| `PageMeta` | `<Helmet>` wrapper for SEO meta tags |
| `AuthModal` | Login/register/password recovery modal |
| `SubscriptionModal` | Email subscription modal |
| `OrderStatusBadge` | Order status label |
| `NotAuthModal` | Prompt to sign in |
| `Portal` | React portal wrapper |
| `CollectionInfo` | Collection detail card |

## Business Components (`src/components/business/`)

Connected to Redux, routing, or external services.

| Component | Purpose |
|-----------|---------|
| `Header` | Site header with nav, auth controls, cart button |
| `Footer` | Site footer |
| `Layout` | Page layout wrapper (Header + Outlet + Footer) |
| `ProtectedRoute` | Auth guard — redirects if not signed in |
| `Products` | Product grid with pagination and filters |
| `ProductsList` | Renders list of product cards |
| `SearchContainer` | Search with results |
| `CookiePopUp` | GDPR cookie consent banner |
| `Form` | Profile form sections (InfoForm, AddressForm, PasswordForm) |

## Patterns

### Form Primitives (IRegister)

All form inputs use the `IRegister<T>` pattern from `src/models/form.ts`:

```tsx
<Input register={register} name="email" label="Email" error={errors.email?.message} />
```

### SCSS Modules

```tsx
import cls from './Component.module.scss'
import classnames from 'classnames'

<div className={classnames(cls.root, { [cls.active]: isActive }, [className])} />
```

### Modal Pattern

```tsx
const { isModalOpen, openModal, closeModal } = useControlModal(false)

<Modal isOpened={isModalOpen} close={closeModal} overlay="on">
  {/* content */}
</Modal>
```
