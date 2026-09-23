import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  fullyParallel: false,
  workers: 1,
  reporter: [
    ['line'],
    ['./src/reporters/glassmorphism.reporter.ts']
  ],
  use: {
    baseURL: 'https://parabank.parasoft.com',
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 10000,
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://parabank.parasoft.com',
      },
    },
  ],
});