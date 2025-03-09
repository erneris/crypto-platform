import { test, expect } from '@playwright/test'
import * as crypto from 'node:crypto'

const email = crypto.randomBytes(20).toString('hex') + '@gmail.com'

test('main', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Getting started' })).toBeVisible()
})

test('signup', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('list').getByRole('link', { name: 'Sign up' }).click()

  await page.getByTestId('firstName').click()
  await page.getByTestId('firstName').fill('testname')
  await page.getByTestId('lastName').click()
  await page.getByTestId('lastName').fill('testlastname')

  await page.locator('input[type="email"]').click()
  await page.locator('input[type="email"]').fill(email)
  await page.locator('#password').click()
  await page.locator('#password').fill('testtest')

  await page.getByRole('button', { name: 'Sign up' }).click()
  await expect(page.getByTestId('successMessage')).toBeVisible()
})

test('already sign up', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('list').getByRole('link', { name: 'Sign up' }).click()

  await page.getByTestId('firstName').click()
  await page.getByTestId('firstName').fill('testname')
  await page.getByTestId('lastName').click()
  await page.getByTestId('lastName').fill('testlastname')

  await page.locator('input[type="email"]').click()
  await page.locator('input[type="email"]').fill(email)
  await page.locator('#password').click()
  await page.locator('#password').fill('testtest')

  await page.getByRole('button', { name: 'Sign up' }).click()
  await expect(page.getByTestId('errorMessage')).toBeVisible()
})

test('login', async ({ page }) => {
  await page.goto('/login')
  await page.locator('input[type="email"]').click()
  await page.locator('input[type="email"]').fill(email)
  await page.locator('#password').click()
  await page.locator('#password').fill('testtest')
  await page.getByRole('button', { name: 'Log in' }).click()
  await page.getByRole('heading', { name: 'Balance: 1000$' }).click()
  await expect(page.getByRole('main')).toContainText('testname testlastname')
})

test('login wrong password', async ({ page }) => {
  await page.goto('/login')
  await page.locator('input[type="email"]').click()
  await page.locator('input[type="email"]').fill(email)
  await page.locator('#password').click()
  await page.locator('#password').fill('wrong')
  await page.getByRole('button', { name: 'Log in' }).click()
  await expect(page.getByTestId('errorMessage')).toBeVisible()
})

test('log out', async ({ page }) => {
  await page.goto('/login')
  await page.locator('input[type="email"]').click()
  await page.locator('input[type="email"]').fill(email)
  await page.locator('#password').click()
  await page.locator('#password').fill('testtest')
  await page.getByRole('button', { name: 'Log in' }).click()
  await page.getByRole('link', { name: 'Log out' }).click()
  await expect(page.getByRole('heading', { name: 'Getting started' })).toBeVisible()
})

test('buy without login returns to main page', async ({ page }) => {
  await page.goto('/buy')
  await expect(page.getByRole('heading', { name: 'Log in to your account' })).toBeVisible()
})

test('sell without login returns to main page', async ({ page }) => {
  await page.goto('/sell')
  await expect(page.getByRole('heading', { name: 'Log in to your account' })).toBeVisible()
})
