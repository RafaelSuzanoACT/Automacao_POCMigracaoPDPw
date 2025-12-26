import { test, expect } from '@playwright/test';
const { 
  Post_Generico, 
  Delete_Generico,
  Put_Generico,
  Get_Generico,


  Get_Empresa_Filtro, 
  Get_Empresa_Filtro_CNPJ, 
  Get_Generico_Verificar_Nome, 
  Get_Empresa_Filtro_Nome,
  Get_Empresa_Verifica_CNPJ,

  } = require('../../support/commands');
const empresaFixture = require('../../fixtures/Cadastro_Empresa.json');
const atualizaEmpresaFixture = require('../../fixtures/Atualiza_Empresa.json');
let id_empresa ;
let Endpoint = 'Empresas'
test.describe('API Empresas', () => {

  // 🚀 Testes de POST
  empresaFixture.forEach((payloadEmpresa) => {
    test(`Cadastro de Empresas -    ${payloadEmpresa.cenario}`, async ({ request }, testInfo) => {
      
      const expectedStatus = payloadEmpresa.httpcode;
     

      const response = await Post_Generico(request, testInfo.project.use.baseURL,Endpoint, payloadEmpresa);
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
        id_empresa = body.id;
            console.log('Response Body:', body);
      }
      expect(response.status()).toBe(expectedStatus);
    });

  });




  // 🔹 Consulta todas empresas
  test('Consulta Todas Empresas', async ({ request }, testInfo) => {
    const response = await Get_Generico(request, testInfo.project.use.baseURL, Endpoint);
    const body = await response.json();

    console.log('Projeto:', testInfo.project.name);
    console.log('BaseURL:', testInfo.project.use.baseURL);
    console.log('Status Code:', response.status());
    // console.log('Response Body:', body);

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
    const response = await Get_Generico_Verificar_Nome(request, testInfo.project.use.baseURL, 'Rafael',Endpoint);
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



});
atualizaEmpresaFixture.forEach((payloadEmpresa_Atualizar, index) => {
  test(
    `Atualizar dados da empresa - ${payloadEmpresa_Atualizar.cenario}`,
    async ({ request }, testInfo) => {

      const response = await Put_Generico(
        request,

        payloadEmpresa_Atualizar,
        id_empresa,
        'Empresas',
      );

      expect(response.status()).toBe(payloadEmpresa_Atualizar.httpcode);

      const text = await response.text();
      const body = text ? JSON.parse(text) : null;

      console.log('Response Body:', body);
    }
  );
});









test('Delete Empresa', async ({ request }, testInfo) => {
  const response = await Delete_Generico(request, testInfo.project.use.baseURL, id_empresa, 'Empresas');

  console.log('Status Code:', response.status());
  console.log(id_empresa)

  let body;
  try {
    body = await response.json(); // tenta pegar o body
  } catch (err) {
    body = 'No content'; // caso não haja body
  }
  console.log('Response Body:', body);

  expect(response.status()).toBe(204);
});





