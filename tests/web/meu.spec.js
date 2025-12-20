import { test, expect } from '@playwright/test';

test('Acessa Menu', async ({ page }, testInfo) => {
  console.log('Projeto:', testInfo.project.name);
  console.log('BaseURL:', testInfo.project.use.baseURL);


  await page.goto('/');


  await page.waitForLoadState('networkidle');


  const screenshot = await page.screenshot({ fullPage: true });


  await testInfo.attach('Tela carregada', {
    body: screenshot,
    contentType: 'image/png',
  });
});
