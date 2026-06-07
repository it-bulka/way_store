import { test, expect } from '@playwright/test'

test.describe('Auth flow: реєстрація → вхід → профіль', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('clicking "Увійти" opens auth modal with login tab active', async ({ page }) => {
    await page.getByRole('button', { name: 'Увійти' }).click()

    const modal = page.getByRole('dialog')
    await expect(modal).toBeVisible()
    await expect(modal.getByText('ВХІД')).toBeVisible()
    await expect(modal.getByLabel(/e-mail/i)).toBeVisible()
    await expect(modal.getByLabel(/пароль/i)).toBeVisible()
  })

  test('switching to register tab shows register form', async ({ page }) => {
    await page.getByRole('button', { name: 'Увійти' }).click()
    await page.getByRole('dialog').waitFor()

    await page.getByRole('button', { name: 'РЕЄСТРАЦІЯ' }).click()

    await expect(page.getByText("ІМ'Я")).toBeVisible()
  })

  test('pressing Escape closes auth modal', async ({ page }) => {
    await page.getByRole('button', { name: 'Увійти' }).click()
    const modal = page.getByRole('dialog')
    await modal.waitFor()

    await page.keyboard.press('Escape')

    await expect(modal).not.toBeVisible()
  })

  test('login form shows validation errors on empty submit', async ({ page }) => {
    await page.getByRole('button', { name: 'Увійти' }).click()
    await page.getByRole('dialog').waitFor()

    await page.getByRole('button', { name: 'УВІЙТИ' }).click()

    // At least one validation error message should appear
    const errors = page.locator('[role="alert"]')
    await expect(errors.first()).toBeVisible()
  })

  test('register form shows validation errors on empty submit', async ({ page }) => {
    await page.getByRole('button', { name: 'Увійти' }).click()
    await page.getByRole('dialog').waitFor()

    await page.getByRole('button', { name: 'РЕЄСТРАЦІЯ' }).click()
    await page.getByRole('button', { name: 'ЗАРЕЄСТРУВАТИСЬ' }).click()

    const errors = page.locator('[role="alert"]')
    await expect(errors.first()).toBeVisible()
  })

  test('unauthenticated user is redirected from /account/profile to /', async ({ page }) => {
    await page.goto('/account/profile')
    await expect(page).toHaveURL('/')
  })
})
