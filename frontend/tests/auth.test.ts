import { test, expect } from '@playwright/test';

test.describe('Auth', () => {
	test('login page loads with role selector', async ({ page }) => {
		await page.goto('/auth/login');
		await expect(page.getByRole('heading', { name: 'Welcome Back' })).toBeVisible();
		await expect(page.getByRole('button', { name: /Employer/i }).first()).toBeVisible();
		await expect(page.getByRole('button', { name: /Institute/i })).toBeVisible();
		await expect(page.getByRole('button', { name: /Faculty/i })).toBeVisible();
		await expect(page.getByRole('button', { name: /Continue as/i })).toBeVisible();
	});

	test('login advances to credentials step and accepts input', async ({ page }) => {
		await page.goto('/auth/login');
		await page.waitForLoadState('networkidle');
		await page.locator('button.btn-primary').click();
		// Allow Svelte to flush state update and re-render
		await page.waitForTimeout(2500);
		await expect(page.locator('input[type="email"]')).toBeVisible();
		await expect(page.locator('input[type="password"]')).toBeVisible();
		await page.locator('input[type="email"]').fill('test@rsquarehr.com');
		await expect(page.locator('input[type="email"]')).toHaveValue('test@rsquarehr.com');
	});
});
