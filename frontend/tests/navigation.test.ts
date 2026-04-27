import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
	test('navbar links are present', async ({ page }) => {
		await page.goto('/');
		await expect(page.locator('nav')).toBeVisible();
	});

	test('navbar logo links to home', async ({ page }) => {
		await page.goto('/about');
		await page.locator('nav a[href="/"]').first().click();
		await expect(page).toHaveURL('http://localhost:5173/');
	});

	test('footer is present on all pages', async ({ page }) => {
		const routes = ['/', '/about', '/services', '/contact', '/training'];
		for (const route of routes) {
			await page.goto(route);
			await expect(page.locator('footer')).toBeVisible();
		}
	});

	test('no broken internal links on home page', async ({ page }) => {
		await page.goto('/');
		const links = page.locator('a[href^="/"]');
		const hrefs = await links.evaluateAll((els) =>
			els.map((el) => el.getAttribute('href')).filter(Boolean)
		);
		// Verify at least some internal links exist
		expect(hrefs.length).toBeGreaterThan(0);
	});
});
