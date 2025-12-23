
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

const CadastroFixture = require('../../fixtures/Cadastro_RestricoesUG.json');
const Atualiza_Fixture = require('../../fixtures/Atualiza_RestricoesUG.json');
let id_RestricaoUG;



test.describe('RestricoesUG', () => {

  CadastroFixture.forEach((payload) => {
    test(`01 Cadastro de Restricao - ${payload.cenario}`, async ({ request }, testInfo) => {
      const response = await Post_Generico(
        request,
        testInfo.project.use.baseURL,
        'RestricoesUG',
        payload
      );

      const body = await response.json();


      console.log('Status Code:', response.status());
      console.log('Payload enviado:', payload);
      console.log('Response Body:', body);
   
        console.log('Response Body:', body);


      if (body?.id) {
        id_RestricaoUG = body.id;
        console.log('✅ ID ', id_RestricaoUG);
      }

      expect(response.status()).toBe(payload.httpcode);
    });
  });


    test('02 Consulta Arquivos Restricao', async ({ request }, testInfo) => {
    const response = await Get_Generico(
      request,
      testInfo.project.use.baseURL,
      'RestricoesUG'
    );
    const body = await response.json();
    console.log('Response Body:', body);
    console.log('Status Code:', response.status());
    expect(response.status()).toBe(200);        
});


    test('03 Consulta Arquivos Restricao Por ID', async ({ request }, testInfo) => {
    const response = await Get_GenericoFiltroID(
      request,
      testInfo.project.use.baseURL,
     id_RestricaoUG,  'RestricoesUG',
    );
    const body = await response.json();
    console.log('Response Body:', body);
    console.log('Status Code:', response.status());
    expect(response.status()).toBe(200);        
});


    test('04 Consulta Arquivos Restricao Unidade Geradora', async ({ request }, testInfo) => {
    const response = await Get_GenericoFiltroID(
      request,
        testInfo.project.use.baseURL,
        id_RestricaoUG,  'RestricoesUG/unidade',
    );
    const body = await response.json();
    console.log('Response Body:', body);
    console.log('Status Code:', response.status());
    expect(response.status()).toBe(200);        
});


    test('05 Consulta Arquivos Restricao Motivo', async ({ request }, testInfo) => {
    const response = await Get_GenericoFiltroID(
      request,
        testInfo.project.use.baseURL,
        0,  'RestricoesUG/motivo',
    )
    const body = await response.json();
    console.log('Response Body:', body);
    console.log('Status Code:', response.status());
    expect(response.status()).toBe(200);        
});


    test('06 Consulta Arquivos Restricao Ativas', async ({ request }, testInfo) => {
    const response = await Get_GenericoFiltroParam(
      request,
        testInfo.project.use.baseURL,
        'RestricoesUG/ativas?dataReferencia=','2025-12-25'  
    );
    const body = await response.json();
    console.log('Response Body:', body);
    console.log('Status Code:', response.status());
    expect(response.status()).toBe(200);        
});
//


    test('07 Consulta Arquivos Restricao Periodo', async ({ request }, testInfo) => {
    const response = await Get_FiltroPeriodo(
      request,
        testInfo.project.use.baseURL,
        'RestricoesUG/periodo','2025-12-01'  ,'2025-12-31'
    );
    const body = await response.json();
    console.log('Response Body:', body);
    console.log('Status Code:', response.status());
    expect(response.status()).toBe(200);        
});
1


   test(`07 PUT - Atualizar Equipe | ${Atualiza_Fixture.cenario}`, async ({ request }, testInfo) => {
      const response = await Put_Generico(
        request,
        testInfo.project.use.baseURL,
        payloadAtualizacao,
        id_RestricaoUG,
        'RestricoesUG'
      );

      const text = await response.text();
      const body = text ? JSON.parse(text) : null;

      console.log('Status Code:', response.status());
      console.log('Response Body:', body);

      expect(response.status()).toBe(Atualiza_Fixture.httpcode);
    });
  });



 test('09 DELETE - RestricaoUG', async ({ request }, testInfo) => {
    const response = await Delete_Generico(
      request,
      testInfo.project.use.baseURL,
      id_RestricaoUG,
      'RestricoesUG'
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

