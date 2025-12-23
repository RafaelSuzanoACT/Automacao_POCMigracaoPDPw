import { test, expect } from '@playwright/test';

const {
  Get_Gestao_Equipe_Nome,
  Get_Gestao_Equipe_Membros,
  Get_Gestao_Equipe_Filtro,
  Get_Generico_Verificar_Nome,
  Post_Generico,
  Get_Generico,
  Delete_Generico,
  Put_Generico
} = require('../../support/commands');

const GestaoEquipeFixture = require('../../fixtures/Cadastro_GestaoEquipe.json');
const Atualiza_GestaoEquipeFixture = require('../../fixtures/Atualiza_GestaoEquipe.json');

let id_equipe;

test.describe('API Gestão de Equipe', () => {

  // 🔹 POST - Criar Equipe
  GestaoEquipeFixture.forEach((payloadEquipe) => {
    test(`01 POST - ${payloadEquipe.cenario}`, async ({ request }, testInfo) => {
      const response = await Post_Generico(
        request,
        testInfo.project.use.baseURL,
        'EquipesPdp',
        payloadEquipe
      );

      const body = await response.json();

      console.log('Projeto:', testInfo.project.name);
      console.log('BaseURL:', testInfo.project.use.baseURL);
      console.log('Status Code:', response.status());
      console.log('Payload enviado:', payloadEquipe);
      console.log('Response Body:', body);

      if (body?.id) {
        id_equipe = body.id;
        console.log('✅ ID da equipe:', id_equipe);
      }

      expect(response.status()).toBe(payloadEquipe.httpcode);
    });
  });

  // 🔹 GET - Todas as Equipes
  test('02 GET - Consulta todas Equipes', async ({ request }, testInfo) => {
    const response = await Get_Generico(
      request,
      testInfo.project.use.baseURL,
      'EquipesPdp'
    );

    console.log('Status Code:', response.status());
    expect(response.status()).toBe(200);
  });

  // 🔹 GET - Filtro por Nome
  test('03 GET - Consulta Equipe por Nome', async ({ request }, testInfo) => {
    const response = await Get_Gestao_Equipe_Nome(
      request,
      testInfo.project.use.baseURL,
      'Automacao_Eq01'
    );

    const body = await response.json();
    console.log('Status Code:', response.status());
    console.log('Response Body:', body);

    expect(response.status()).toBe(200);
  });

  // 🔹 GET - Membros da Equipe
  test('04 GET - Consulta Membros da Equipe', async ({ request }, testInfo) => {
    const response = await Get_Gestao_Equipe_Membros(
      request,
      testInfo.project.use.baseURL,
      id_equipe
    );

    const body = await response.json();
    console.log('Status Code:', response.status());
    console.log('Response Body:', body);

    expect(response.status()).toBe(200);
  });

  // 🔹 GET - Equipe por ID
  test('05 GET - Consulta Equipe por ID', async ({ request }, testInfo) => {
    const response = await Get_Gestao_Equipe_Filtro(
      request,
      testInfo.project.use.baseURL,
      id_equipe
    );

    const body = await response.json();
    console.log('Status Code:', response.status());
    console.log('Response Body:', body);

    expect(response.status()).toBe(200);
  });

  // 🔹 GET - Verificar Nome
  test('06 GET - Verificar Nome da Equipe', async ({ request }, testInfo) => {
    const response = await Get_Generico_Verificar_Nome(
      request,
      testInfo.project.use.baseURL,
      'EquipesPdp',
      'rafael'
    );

    const body = await response.json();
    console.log('Status Code:', response.status());
    console.log('Response Body:', body);

    expect(response.status()).toBe(200);
  });

  // 🔹 PUT - Atualizar Equipe
  Atualiza_GestaoEquipeFixture.forEach((payloadAtualizacao) => {
    test(`07 PUT - Atualizar Equipe | ${payloadAtualizacao.cenario}`, async ({ request }, testInfo) => {
      const response = await Put_Generico(
        request,
        testInfo.project.use.baseURL,
        payloadAtualizacao,
        id_equipe,
        'EquipesPdp'
      );

      const text = await response.text();
      const body = text ? JSON.parse(text) : null;

      console.log('Status Code:', response.status());
      console.log('Response Body:', body);

      expect(response.status()).toBe(payloadAtualizacao.httpcode);
    });
  });

  // 🔹 DELETE - Remover Equipe
  test('08 DELETE - Remover Equipe', async ({ request }, testInfo) => {
    const response = await Delete_Generico(
      request,
      testInfo.project.use.baseURL,
      id_equipe,
      'EquipesPdp'
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
