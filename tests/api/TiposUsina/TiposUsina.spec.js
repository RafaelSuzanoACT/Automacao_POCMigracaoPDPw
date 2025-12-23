import { test, expect } from '@playwright/test';

const {
  Post_Generico,
  Get_Generico,
  Put_Generico,
  Delete_Generico,
  Get_TiposUsinaNome,
  Get_Generico_Verificar_Nome,
  Get_TiposUsinaPorID
} = require('../../support/commands');

const Cadastro_TiposUsina = require('../../fixtures/Cadastro_TiposUsina.json');
const Atualiza_TiposUsina = require('../../fixtures/Atualiza_TiposUsina.json');

let ID_TiposUsina;

test.describe('API TiposUsina', () => {

  /**
   * 🔹 01 - POST (Cria OU reaproveita se já existir)
   */
  Cadastro_TiposUsina.forEach((payloadTiposUsina) => {
    test(`01 POST - Cadastro TiposUsina | ${payloadTiposUsina.cenario}`, async ({ request }, testInfo) => {

      const response = await Post_Generico(
        request,
        testInfo.project.use.baseURL,
        'TiposUsina',
        payloadTiposUsina
      );

      console.log('URL Requisição:', `${testInfo.project.use.baseURL}/TiposUsina`);
      console.log('Status Code:', response.status());

      // ✅ Criado com sucesso
      if (response.status() === 201) {
        const body = await response.json();
        ID_TiposUsina = body.id;
        console.log('✅ Criado ID_TiposUsina:', ID_TiposUsina);
      }

      // ♻️ Já existe → busca pelo nome
      if (response.status() === 400) {
        console.log('ℹ️ Tipo de Usina já existe. Buscando por nome...');

        const getResponse = await Get_TiposUsinaNome(
          request,
          testInfo.project.use.baseURL,
          payloadTiposUsina.nome
        );

        const body = await getResponse.json();
        ID_TiposUsina = body.id;

        console.log('♻️ Reutilizando ID_TiposUsina:', ID_TiposUsina);
      }

      expect([201, 400]).toContain(response.status());
      expect(ID_TiposUsina).toBeDefined();
    });
  });

  /**
   * 🔹 02 - GET Todos
   */
  test('02 GET - Consulta Todos os TiposUsina', async ({ request }, testInfo) => {
    const response = await Get_Generico(
      request,
      testInfo.project.use.baseURL,
      'TiposUsina'
    );

    console.log('URL Requisição:', `${testInfo.project.use.baseURL}/TiposUsina`);
    console.log('Status Code:', response.status());

    expect(response.status()).toBe(200);
  });

  /**
   * 🔹 03 - GET por Nome
   */
  test('03 GET - Consulta TiposUsina por Nome', async ({ request }, testInfo) => {
    const response = await Get_TiposUsinaNome(
      request,
      testInfo.project.use.baseURL,
      'Nuclear'
    );

    const body = await response.json();

    console.log('Status Code:', response.status());
    console.log('Response Body:', body);

    expect(response.status()).toBe(200);
  });

  /**
   * 🔹 04 - Verificar Nome (endpoint sem body)
   */
  test('04 GET - Verificar Nome TiposUsina', async ({ request }, testInfo) => {
    const response = await Get_Generico_Verificar_Nome(
      request,
      testInfo.project.use.baseURL,
      'TiposUsina',
      'Nuclear'
    );

 
    console.log('Status Code:', response.status());

    // Endpoint pode retornar 200 ou 204 sem body
    expect([200, 204]).toContain(response.status());
  });

  /**
   * 🔹 05 - GET por ID
   */
  test('05 GET - Consulta TiposUsina por ID', async ({ request }, testInfo) => {
    expect(ID_TiposUsina).toBeDefined();

    const response = await Get_TiposUsinaPorID(
      request,
      testInfo.project.use.baseURL,
      ID_TiposUsina
    );

    const body = await response.json();

    console.log('Status Code:', response.status());
    console.log('Response Body:', body);

    expect(response.status()).toBe(200);
  });

  /**
   * 🔹 06 - PUT Atualizar
   */
  Atualiza_TiposUsina.forEach((payloadAtualizacao) => {
    test(`06 PUT - Atualizar TiposUsina | ${payloadAtualizacao.cenario}`, async ({ request }, testInfo) => {

      expect(ID_TiposUsina).toBeDefined();

      const response = await Put_Generico(
        request,
        testInfo.project.use.baseURL,
        payloadAtualizacao,
        ID_TiposUsina,
        'TiposUsina'
      );

      const text = await response.text();
      const body = text ? JSON.parse(text) : null;

      console.log('Status Code:', response.status());
      console.log('Response Body:', body);

      expect(response.status()).toBe(payloadAtualizacao.httpcode);
    });
  });

  /**
   * 🔹 07 - DELETE
   */
  test('07 DELETE - Remover TiposUsina', async ({ request }, testInfo) => {
    expect(ID_TiposUsina).toBeDefined();

    const response = await Delete_Generico(
      request,
      testInfo.project.use.baseURL,
      ID_TiposUsina,
      'TiposUsina'
    );

    console.log('Status Code:', response.status());

    expect([200, 204]).toContain(response.status());
  });

});
