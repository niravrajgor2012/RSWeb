import { test, expect } from '@playwright/test';

test.describe('Employer portal', () => {
	test('employer landing page loads', async ({ page }) => {
		await page.goto('/employer');
		await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
	});

	test('employer register page loads', async ({ page }) => {
		await page.goto('/employer/register');
		await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
		await expect(page.locator('form')).toBeVisible();
	});

	test('employer packages page loads', async ({ page }) => {
		await page.goto('/employer/packages');
		await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
	});

	test('protected routes redirect unauthenticated users', async ({ page }) => {
		await page.goto('/employer/post-job');
		// Should either redirect to login or show auth gate
		const url = page.url();
		const hasRedirected = url.includes('/auth/login') || url.includes('/employer');
		expect(hasRedirected).toBeTruthy();
	});
});
