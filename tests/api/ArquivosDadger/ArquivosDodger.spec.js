// @ts-check
import { test, expect } from '@playwright/test';
import {Get_ArquivosDadger} from '../../support/commands';



test.describe('ArquivosDadger', () => {
  test('Get_ArquivosDadger', async ({ request }, testInfo) => {
    const response = await Get_ArquivosDadger(request, testInfo.project.use.baseURL); 

    console.log('Projeto:', testInfo.project.name);
    console.log('BaseURL:', testInfo.project.use.baseURL);
    console.log('Status Code:', response.status());
    expect(response.status()).toBe(200);
   // expect(response.body['status']()).toBe('Healthy');

  });


  
});

