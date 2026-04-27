import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	webServer: {
		command: 'npm run dev',
		url: 'http://localhost:5173',
		reuseExistingServer: true,
		timeout: 120000
	},
	testDir: 'tests',
	testMatch: '**/*.test.ts',
	fullyParallel: true,
	reporter: [['html', { open: 'never' }], ['list']],
	use: {
		baseURL: 'http://localhost:5173',
		trace: 'on-first-retry',
		screenshot: 'only-on-failure'
	},
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] }
		}
	]
});
