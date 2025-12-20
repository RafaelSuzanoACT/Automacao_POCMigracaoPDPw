// @ts-check
import { test, expect } from '@playwright/test';
import { Get_Health } from '../../support/commands';



test.describe('Comentarios DESSEM API Tests', () => {
  test('Health Endpoint', async ({ request }, testInfo) => {
    const response = await Get_Health(request, testInfo.project.use.baseURL); 

    console.log('Projeto:', testInfo.project.name);
    console.log('BaseURL:', testInfo.project.use.baseURL);
    console.log('Status Code:', response.status());


    expect(response.status()).toBe(200);
   // expect(response.body['status']()).toBe('Healthy');

  });
});

