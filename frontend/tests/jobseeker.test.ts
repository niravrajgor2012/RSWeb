import { test, expect } from '@playwright/test';

test.describe('Job seeker portal', () => {
	test('jobseeker landing page loads', async ({ page }) => {
		await page.goto('/jobseeker');
		await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
	});

	test('jobseeker register page loads', async ({ page }) => {
		await page.goto('/jobseeker/register');
		await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
		await expect(page.locator('form')).toBeVisible();
	});

	test('jobs listing page loads', async ({ page }) => {
		await page.goto('/jobseeker/jobs');
		await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
	});

	test('job detail page loads', async ({ page }) => {
		await page.goto('/jobseeker/jobs');
		const firstJob = page.locator('a[href^="/jobseeker/jobs/"]').first();
		const count = await firstJob.count();
		if (count > 0) {
			const href = await firstJob.getAttribute('href');
			if (href) {
				await page.goto(href);
				await expect(page).toHaveURL(/\/jobseeker\/jobs\/.+/);
				await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
			}
		}
	});
});
