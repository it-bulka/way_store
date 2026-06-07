import { test, expect } from '@playwright/test'
import { seedCart, MOCK_CART_ITEM } from './helpers'

test.describe('Cart flow: вибір товару → кошик → checkout', () => {
  test.beforeEach(async ({ page }) => {
    await seedCart(page, [MOCK_CART_ITEM])
    // Reload so Redux picks up the seeded localStorage value
    await page.goto('/')
  })

  test('pre-seeded item appears in cart panel', async ({ page }) => {
    await page.getByRole('button', { name: /кошик/i }).click()

    const cartDialog = page.getByRole('dialog', { name: 'Ваш кошик' })
    await expect(cartDialog).toBeVisible()
    await expect(cartDialog.getByText(MOCK_CART_ITEM.title)).toBeVisible()
  })

  test('cart shows correct total amount badge on header button', async ({ page }) => {
    const cartBtn = page.getByRole('button', { name: /кошик/i })
    await expect(cartBtn.getByText('1')).toBeVisible()
  })

  test('checkout button navigates to /checkout', async ({ page }) => {
    await page.getByRole('button', { name: /кошик/i }).click()
    await page.getByRole('dialog', { name: 'Ваш кошик' }).waitFor()

    await page.getByRole('button', { name: /Оформити замовлення/i }).click()

    await expect(page).toHaveURL('/checkout')
  })

  test('pressing Escape closes the cart', async ({ page }) => {
    await page.getByRole('button', { name: /кошик/i }).click()
    const cartDialog = page.getByRole('dialog', { name: 'Ваш кошик' })
    await cartDialog.waitFor()

    await page.keyboard.press('Escape')

    await expect(cartDialog).not.toBeVisible()
  })
})
