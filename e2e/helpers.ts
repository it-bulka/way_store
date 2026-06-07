import type { Page } from '@playwright/test'

export interface CartItem {
  id: string
  title: string
  amount: number
  price: number
  img: string
  size?: number
}

export const MOCK_CART_ITEM: CartItem = {
  id: 'e2e-ring-1',
  title: 'Золотий перстень',
  amount: 1,
  price: 5000,
  img: '',
}

/** Pre-seed cart state via localStorage so Redux initialises with it */
export async function seedCart(page: Page, items: CartItem[]): Promise<void> {
  await page.goto('/')
  await page.evaluate((data) => {
    localStorage.setItem('cart', JSON.stringify(data))
  }, items)
}

/** Intercept Firebase Auth REST API and return a mock successful response */
export async function mockFirebaseAuth(page: Page): Promise<void> {
  await page.route('**/identitytoolkit.googleapis.com/**', (route) => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        idToken: 'mock-id-token',
        email: 'test@example.com',
        localId: 'mock-uid-123',
        registered: true,
      }),
    })
  })
}
