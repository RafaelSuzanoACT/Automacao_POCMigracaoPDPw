
import { test, expect } from '@playwright/test';

const {
  Post_Generico,
  Get_Generico,
  Put_Generico,
  Delete_Generico,
  Get_GenericoFiltroID,
  Get_GenericoFiltroParam,
  Get_FiltroPeriodo,
  Patch_Generico

} = require('../../support/commands');

const CadastroFixture = require('../../fixtures/Cadastro_UnidadesGeradoras.json');
const Atualiza_Fixture = require('../../fixtures/Atualiza_UnidadesGeradoras.json');
let id_registro;
let endpoint =  "UnidadesGeradoras"


test.describe(endpoint, () => {

  CadastroFixture.forEach((payload) => {
    test(`01 POST Cadastro - ${endpoint} - ${payload.cenario}`, async ({ request }, testInfo) => {
      const response = await Post_Generico(
        request,
        testInfo.project.use.baseURL,
        endpoint,
        payload
      );

      const body = await response.json();


      console.log('Status Code:', response.status());
      console.log('Payload enviado:', payload);

   
        console.log('Response Body:', body);


      if (body?.id) {
        id_registro = body.id;
        console.log('✅ ID ', id_registro);
      }

      expect(response.status()).toBe(payload.httpcode);
    });
  });


    test('02 Consulta ' + endpoint   , async ({ request }, testInfo) => {
    const response = await Get_Generico(
      request,
      testInfo.project.use.baseURL,
      endpoint
    );
    const body = await response.json();
    console.log('Response Body:', body);
    console.log('Status Code:', response.status());
    expect(response.status()).toBe(200);        
});
    test('03 Consulta ' + endpoint + '  Por ID', async ({ request }, testInfo) => {
    const response = await Get_GenericoFiltroID(
      request,
      testInfo.project.use.baseURL,
     1003,  endpoint,
    );
    const body = await response.json();
    console.log('Response Body:', body);
    console.log('Status Code:', response.status());
    expect(response.status()).toBe(200);        
});


    test('05 Consulta ' + endpoint  + 'Ativas'  , async ({ request }, testInfo) => {
    const response = await Get_Generico(
      request,
      testInfo.project.use.baseURL,
      endpoint +'/Ativas'
    );
    const body = await response.json();
    console.log('Response Body:', body);
    console.log('Status Code:', response.status());
    expect(response.status()).toBe(200);        
});


  test('06 Consulta ' + endpoint  +  'Usina ', async ({ request }, testInfo) => {
    const response = await Get_GenericoFiltroParam(
      request,
      testInfo.project.use.baseURL,
     endpoint +'/status','string'
    );
    console.log('Status Code:', response.status());
    expect(response.status()).toBe(200);
  });   


      test('07 Consulta  Usina' + endpoint + '  Por ID', async ({ request }, testInfo) => {
    const response = await Get_GenericoFiltroID(
      request,
      testInfo.project.use.baseURL,
     2,  endpoint+'/usina',
    );
    const body = await response.json();
    console.log('Response Body:', body);
    console.log('Status Code:', response.status());
    expect(response.status()).toBe(200);        
});

  Atualiza_Fixture.forEach((payloadAtualizacao) => {
    test(` 08 PUT - Atualizar ${endpoint} | ${payloadAtualizacao.cenario}`, async ({ request }, testInfo) => {
      const response = await Put_Generico(
        request,
        testInfo.project.use.baseURL,
        payloadAtualizacao,
        id_registro,
        endpoint
      );

      const text = await response.text();
      const body = text ? JSON.parse(text) : null;

      console.log('Status Code:', response.status());
      console.log('Payload enviado:', payloadAtualizacao);
      console.log('Response Body:', body);
      

      expect(response.status()).toBe(payloadAtualizacao.httpcode);
    });
  })




test('09 DELETE -' + endpoint, async ({ request }, testInfo) => {
    const response = await Delete_Generico(
      request,
      testInfo.project.use.baseURL,
      id_registro,
      endpoint
    );

    console.log('Status Code:', response.status());

    let body;
    try {
      body = await response.json();
    } catch {
      body = 'No content';
    }

    console.log('Response Body:', body);
    expect(response.status()).toBe(204);
  });

  });