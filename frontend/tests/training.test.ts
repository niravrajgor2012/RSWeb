import { test, expect } from '@playwright/test';

test.describe('Training portal', () => {
	test('training page loads', async ({ page }) => {
		await page.goto('/training');
		await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
	});

	test('course detail page loads', async ({ page }) => {
		await page.goto('/training');
		const firstCourse = page.locator('a[href^="/training/courses/"]').first();
		await firstCourse.click();
		await expect(page).toHaveURL(/\/training\/courses\/.+/);
		await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
	});
});
