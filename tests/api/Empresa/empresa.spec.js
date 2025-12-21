import { test, expect } from '@playwright/test';
const { Post_Empresa, Get_Empresa, Get_Empresa_Filtro, Delete_Empresa, Get_Empresa_Filtro_CNPJ, Get_Empresa_Verifica_Nome, Get_Empresa_Filtro_Nome,
  Get_Empresa_Verifica_CNPJ } = require('../../support/commands');
const empresaFixture = require('../../fixtures/Cadastro_Empresa.json');
const atualizaEmpresaFixture = require('../../fixtures/Atualiza_Empresa.json');
let id_empresa
test.describe('API /Empresas', () => {

  // 🚀 Testes de POST
  empresaFixture.forEach((payloadEmpresa) => {
    test(`Enviar POST para ${payloadEmpresa.Cenario}`, async ({ request }, testInfo) => {
      const expectedStatus = payloadEmpresa.httpcode;
      const response = await Post_Empresa(request, testInfo.project.use.baseURL, payloadEmpresa);

      const body = await response.json();

  
      console.log('Projeto:', testInfo.project.name);
      console.log('BaseURL:', testInfo.project.use.baseURL);
      console.log('Status Code:', response.status());
      console.log('Payload enviado:', payloadEmpresa);
      console.log('Response Body:', body);

      if (expectedStatus !== response.status()) {
        console.log(`❌ Esperado: ${expectedStatus}, Recebido: ${response.status()}`);
      } else if (body.id) {
        console.log('✅ ID retornado:', body.id);
        id_empresa = body.id
      }
      expect(response.status()).toBe(expectedStatus);

    });


    


  });

  // 🔹 Consulta todas empresas
  test('Consulta Todas Empresas', async ({ request }, testInfo) => {
    const response = await Get_Empresa(request, testInfo.project.use.baseURL);
    const body = await response.json();

    console.log('Projeto:', testInfo.project.name);
    console.log('BaseURL:', testInfo.project.use.baseURL);
    console.log('Status Code:', response.status());
    console.log('Response Body:', body);

    expect(response.status()).toBe(200);
  });

  // 🔹 Consulta empresa específica por ID
  test('Consulta Empresa Filtro', async ({ request }, testInfo) => {
    const response = await Get_Empresa_Filtro(request, testInfo.project.use.baseURL, id_empresa);
    const body = await response.json();

    console.log('Projeto:', testInfo.project.name);
    console.log('BaseURL:', testInfo.project.use.baseURL);
    console.log('Status Code:', response.status());
    console.log('Response Body:', body);

    expect(response.status()).toBe(200);
  });


  test('Consulta Empresa Filtro CNPJ  ', async ({ request }, testInfo) => {
    const response = await Get_Empresa_Filtro_CNPJ(request, testInfo.project.use.baseURL, '51147753952888');
    const body = await response.json();

    console.log('Projeto:', testInfo.project.name);
    console.log('BaseURL:', testInfo.project.use.baseURL);
    console.log('Status Code:', response.status());
    console.log('Response Body:', body);

    expect(response.status()).toBe(200);
  });

  test('Consulta Empresa Filtro Nome  ', async ({ request }, testInfo) => {
    const response = await Get_Empresa_Filtro_Nome(request, testInfo.project.use.baseURL, 'Rafael');
    const body = await response.json();

    console.log('Projeto:', testInfo.project.name);
    console.log('BaseURL:', testInfo.project.use.baseURL);
    console.log('Status Code:', response.status());
    console.log('Response Body:', body);

    expect(response.status()).toBe(200);
  });


  test('Verifica Nome da Empresa  ', async ({ request }, testInfo) => {
    const response = await Get_Empresa_Verifica_Nome(request, testInfo.project.use.baseURL, 'Rafael', id_empresa);
    const body = await response.json();

    console.log('Projeto:', testInfo.project.name);
    console.log('BaseURL:', testInfo.project.use.baseURL);
    console.log('Status Code:', response.status());
    console.log('Response Body:', body);

    expect(response.status()).toBe(200);
  });

  test('Verifica Nome da CNPJ  ', async ({ request }, testInfo) => {
    const response = await Get_Empresa_Verifica_CNPJ(request, testInfo.project.use.baseURL, '51147753952888');
    const body = await response.json();

    console.log('Projeto:', testInfo.project.name);
    console.log('BaseURL:', testInfo.project.use.baseURL);
    console.log('Status Code:', response.status());
    console.log('Response Body:', body);

    expect(response.status()).toBe(200);
  });



  test('Delete Empresa', async ({ request }, testInfo) => {
    const response = await Delete_Empresa(request, testInfo.project.use.baseURL, id_empresa);

    console.log('Projeto:', testInfo.project.name);
    console.log('BaseURL:', testInfo.project.use.baseURL);
    console.log('Status Code:', response.status());


    let body;
    try {
      body = await response.json(); // tenta pegar o body
    } catch (err) {
      body = 'No content'; // caso não haja body
    }
    console.log('Response Body:', body);

    expect(response.status()).toBe(204);
  });






});
