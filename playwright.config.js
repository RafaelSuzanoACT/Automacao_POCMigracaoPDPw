// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  /* 🔹 Relatórios */
  reporter: [
    ['list'], // resumo detalhado no terminal
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ],



  /* 🔹 Evidências */
  use: {
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },

  /* 🔹 Projetos */
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
