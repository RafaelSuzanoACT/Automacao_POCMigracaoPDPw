// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ],

  projects: [
    /* ========= WEB ========= */
    {
      name: 'web',
      testDir: 'tests/web',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:3000',
      },
    },

    /* ========= API ========= */
    {
      name: 'api',
      testDir: 'tests/api',
      use: {
        baseURL: 'http://localhost:5001/api',
      },
    },
  ],
});
