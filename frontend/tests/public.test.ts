import { test, expect } from '@playwright/test';

test.describe('Public pages', () => {
	test('home page loads', async ({ page }) => {
		await page.goto('/');
		await expect(page).toHaveTitle(/RSQuare|R Square|HR/i);
		await expect(page.locator('nav')).toBeVisible();
		await expect(page.locator('footer')).toBeVisible();
	});

	test('about page loads', async ({ page }) => {
		await page.goto('/about');
		await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
	});

	test('services page loads', async ({ page }) => {
		await page.goto('/services');
		await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
	});

	test('services detail page loads', async ({ page }) => {
		await page.goto('/services');
		const firstService = page.locator('a[href^="/services/"]').first();
		await firstService.click();
		await expect(page).toHaveURL(/\/services\/.+/);
		await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
	});

	test('clients page loads', async ({ page }) => {
		await page.goto('/clients');
		await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
	});

	test('contact page loads', async ({ page }) => {
		await page.goto('/contact');
		await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
		await expect(page.locator('form')).toBeVisible();
	});

	test('management page loads', async ({ page }) => {
		await page.goto('/management');
		await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
	});

	test('media page loads', async ({ page }) => {
		await page.goto('/media');
		await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
	});

	test('sitemap page loads', async ({ page }) => {
		await page.goto('/sitemap');
		await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
	});
});
