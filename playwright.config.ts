import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },
  fullyParallel: true,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    // Base URL used in page.goto('/')
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000',

    // Common options for all tests
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 0,
    trace: 'retain-on-failure',
  },

  // Start the frontend automatically before running tests.
  // Adjust the command if your frontend workspace name or scripts differ.
  webServer: {
    command: 'npm --workspace=@magajico/frontend run dev',
    port: 3000,
    timeout: 120_000,
    reuseExistingServer: !process.env.CI,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
});