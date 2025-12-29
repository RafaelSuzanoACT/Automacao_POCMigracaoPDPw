
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

const CadastroFixture = require('../../fixtures/Cadastro_ParadasUG.json');
const Atualiza_Fixture = require('../../fixtures/Atualiza_ParadasUG.json');
let id_registro;
let endpoint =  "ParadasUG"


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


    test('03 Consulta ' + endpoint + ' Por ID', async ({ request }, testInfo) => {
    const response = await Get_GenericoFiltroID(
      request,
      testInfo.project.use.baseURL,
     id_registro,  endpoint,
    );
    const body = await response.json();
    console.log('Response Body:', body);
    console.log('Status Code:', response.status());
    expect(response.status()).toBe(200);        
});


    test('04 Consulta ' + endpoint + ' programada ', async ({ request }, testInfo) => {
    const response = await Get_Generico(
      request,
        testInfo.project.use.baseURL,
        endpoint + '/programadas',
    );
    const body = await response.json();
    console.log('Response Body:', body);
    console.log('Status Code:', response.status());
    expect(response.status()).toBe(200);        
});


    test('05 Consulta ' + endpoint + ' por Unidade Geradora', async ({ request }, testInfo) => {
    const response = await Get_GenericoFiltroID(
      request,
        testInfo.project.use.baseURL,
        1,  'ParadasUG/unidade',
    )
    const body = await response.json();
    console.log('Response Body:', body);
    console.log('Status Code:', response.status());
    expect(response.status()).toBe(200);        
});



    test('06 Consulta ' + endpoint + ' nao programada ', async ({ request }, testInfo) => {
    const response = await Get_Generico(
      request,
        testInfo.project.use.baseURL,
  
        endpoint + '/nao-programadas',
    );
    const body = await response.json();
    console.log('Response Body:', body);
    console.log('Status Code:', response.status());
    expect(response.status()).toBe(200);        
});



    test('07 Consulta ' + endpoint + ' Ativas', async ({ request }, testInfo) => {
    const response = await Get_Generico(
      request,
        testInfo.project.use.baseURL,
        endpoint + '/ativas?dataReferencia=2025-12-25',
    );
    const body = await response.json();
    console.log('Response Body:', body);
    console.log('Status Code:', response.status());
    expect(response.status()).toBe(200);        
});
//


    test('08 Consulta ' + endpoint + ' Periodo', async ({ request }, testInfo) => {
    const response = await Get_FiltroPeriodo(
      request,
        testInfo.project.use.baseURL,
          endpoint + '/periodo','2025-12-01'  ,'2025-12-31'
    );
    const body = await response.json();
    console.log('Response Body:', body);
    console.log('Status Code:', response.status());
    expect(response.status()).toBe(200);        
});

    test('09 Consulta ' + endpoint + ' Unidade Geradora', async ({ request }, testInfo) => {
    const response = await Get_Generico(
      request,
        testInfo.project.use.baseURL,
        endpoint + '/unidade/1',
    );
    const body = await response.json();
    console.log('Response Body:', body);
    console.log('Status Code:', response.status());
    expect(response.status()).toBe(200);        
});
//


  Atualiza_Fixture.forEach((payloadAtualizacao) => {
    test(` 10 PUT - Atualizar ${endpoint} | ${payloadAtualizacao.cenario}`, async ({ request }, testInfo) => {
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

 test('11 DELETE -' + endpoint, async ({ request }, testInfo) => {
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