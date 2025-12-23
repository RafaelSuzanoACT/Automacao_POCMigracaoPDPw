
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

const GestaoEquipeFixture = require('../../fixtures/Cadastro_ArquivosDadger.json');
const Atualiza_Fixture = require('../../fixtures/Atualiza_ArquivosDadger.json');
let id_arqD;
let body;
test.describe('Arquivos Dadger API', () => {


  // 🔹 Cria o recurso antes dos testes dependentes
  test.beforeAll(async ({ request }, testInfo) => {
    const payload = GestaoEquipeFixture[0];

    const response = await Post_Generico(
      request,
      testInfo.project.use.baseURL,
      'ArquivosDadger',
      payload
    );

    const body = await response.json();

    console.log('📦 Payload enviado:', payload);
    console.log('📥 Response Body:', body);

    expect(response.status()).toBe(payload.httpcode);
    expect(body).toHaveProperty('id');

    id_arqD = body.id;
    console.log('✅ ID ArquivosDadger criado:', id_arqD);
  });

  // 🔹 GET - Consulta ArquivosDadger
  test('01 Consulta Arquivos Dadger', async ({ request }, testInfo) => {
    const response = await Get_Generico(
      request,
      testInfo.project.use.baseURL,
      'ArquivosDadger'
    );

    console.log('Status Code:', response.status());
    expect(response.status()).toBe(200);
  });

   test('02 Consulta Arquivos Dadger Filtro', async ({ request }, testInfo) => {
    const response = await Get_GenericoFiltroID(
      request,
      testInfo.project.use.baseURL,
     'ArquivosDadger', id_arqD,
    );

    console.log('Status Code:', response.status());
    expect(response.status()).toBe(200);
  });


     test('03 Consulta Arquivos Processados True', async ({ request }, testInfo) => {
    const response = await Get_GenericoFiltroParam(
      request,
      testInfo.project.use.baseURL,
      'ArquivosDadger/processados?processado=','true'
    );

    console.log('Status Code:', response.status());
    expect(response.status()).toBe(200);
  });

    test('04 Consulta Arquivos Processados False', async ({ request }, testInfo) => {
    const response = await Get_GenericoFiltroParam(
      request,
      testInfo.project.use.baseURL,
     'ArquivosDadger/processados?processado=','false'
    );
    const body = await response.json();
    console.log('Response Body:', body);
    console.log('Status Code:', response.status());
    expect(response.status()).toBe(200);


  });


    test('05 Consulta ArquivosDadger Semana', async ({ request }, testInfo) => {
    const response = await Get_GenericoFiltroParam(
      request,
      testInfo.project.use.baseURL,
     'ArquivosDadger/semana/',1
    );
   const body = await response.json();
    console.log('Response Body:', body);
    console.log('Status Code:', response.status());
    expect(response.status()).toBe(200);
  });

    test('06 Consulta ArquivosDadger Periodo', async ({ request }, testInfo) => {
    const response = await Get_FiltroPeriodo(
      request,
      testInfo.project.use.baseURL,
     'ArquivosDadger/periodo','2025-12-12','2025-12-31'
    );

    console.log('Status Code:', response.status());
    const body = await response.json();
    console.log('Response Body:', body);
    expect(response.status()).toBe(200);
  });


  test('07 Consulta Arquivos Dadger Por nome', async ({ request }, testInfo) => {
    const response = await Get_GenericoFiltroParam(
      request,
      testInfo.project.use.baseURL,
      'ArquivosDadger/nome/','string'
    );

    console.log('Status Code:', response.status());
       const body = await response.json();
    console.log('Response Body:', body);
    expect(response.status()).toBe(200);
  });



  // 🔹 PUT - Atualizar ArquivosDadger
  Atualiza_Fixture.forEach((payloadAtualizacao) => {
    test(` 08 PUT - Atualizar ArquivosDadger | ${payloadAtualizacao.cenario}`, async ({ request }, testInfo) => {
      const response = await Put_Generico(
        request,
        testInfo.project.use.baseURL,
        payloadAtualizacao,
        id_arqD,
        'ArquivosDadger'
      );

      const text = await response.text();
      const body = text ? JSON.parse(text) : null;

      console.log('Status Code:', response.status());
      console.log('Response Body:', body);

      expect(response.status()).toBe(payloadAtualizacao.httpcode);
    });
  });



  test('09 Atualizar  Arquivos Dadger processar', async ({ request }, testInfo) => {
    const response = await Patch_Generico(
      request,
      testInfo.project.use.baseURL,
      'ArquivosDadger/nome/', id_arqD
    );

    console.log('Status Code:', response.status());
      

    expect(response.status()).toBe(200);
  });


    test('10 DELETE - Remover ArquivosDadger', async ({ request }, testInfo) => {
    const response = await Delete_Generico(
      request,
      testInfo.project.use.baseURL,
      id_arqD,
      'ArquivosDadger'
    );

   console.log('Status Code:', response.status());
   console.log('Response Body:', body);
    
    try {
      body = await response.json();
    } catch {
      body = 'No content';
    }

    console.log('Response Body:', body);
    expect(response.status()).toBe(204);
  });

});

