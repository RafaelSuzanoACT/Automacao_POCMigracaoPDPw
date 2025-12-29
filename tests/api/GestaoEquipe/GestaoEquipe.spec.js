import { test, expect } from '@playwright/test';

const {
  Get_Gestao_Equipe_Filtro,
  Get_Generico_Verificar_Nome,
  Post_Generico,
  Get_Generico,
  Delete_Generico,
  Put_Generico
} = require('../../support/commands');

const GestaoEquipeFixture = require('../../fixtures/Cadastro_GestaoEquipe.json');
const Atualiza_GestaoEquipeFixture = require('../../fixtures/Atualiza_GestaoEquipe.json');

let id_registro;
const endpoint = 'EquipesPdp';

test.describe('API Gestão de Equipe', () => {

  // 🔹 Pré-condição: Criar equipe
  test.beforeAll(async ({ request }, testInfo) => {
    const payloadEquipe = GestaoEquipeFixture[0];

    const response = await Post_Generico(
      request,
      testInfo.project.use.baseURL,
      endpoint,
      payloadEquipe
    );

    expect(response.status()).toBe(payloadEquipe.httpcode);

    const body = await response.json();
    expect(body?.id).toBeTruthy();

    id_registro = body.id;
    console.log(`✅ Equipe criada com ID: ${id_registro}`);
  });

  // 🔹 GET - Todas as Equipes
  test(`02 GET Consulta todos ${endpoint}`, async ({ request }, testInfo) => {
    const response = await Get_Generico(
      request,
      testInfo.project.use.baseURL,
      endpoint
    );

    expect(response.status()).toBe(200);
  });

  // 🔹 GET - Filtro por Nome
  test('03 GET - Consulta Equipe por Nome', async ({ request }, testInfo) => {
    const response = await Get_Generico_Verificar_Nome(
      request,
      testInfo.project.use.baseURL,
      endpoint,
      'Automacao_Eq01'
    );

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);
  });

  // 🔹 GET - Membros da Equipe
  test('04 GET - Consulta Membros da Equipe', async ({ request }, testInfo) => {
    expect(id_registro).toBeTruthy();

    const response = await Get_Generico(
      request,
      testInfo.project.use.baseURL,
      `${endpoint}/${id_registro}/Membros`
    );

    expect(response.status()).toBe(200);
  });

  // 🔹 GET - Equipe por ID
  test('05 GET - Consulta Equipe por ID', async ({ request }, testInfo) => {
    expect(id_registro).toBeTruthy();

    const response = await Get_Gestao_Equipe_Filtro(
      request,
      testInfo.project.use.baseURL,
      id_registro
    );

    expect(response.status()).toBe(200);
  });

  // 🔹 PUT - Atualizar Equipe
  Atualiza_GestaoEquipeFixture.forEach((payloadAtualizacao) => {
    test(`07 PUT - Atualizar Equipe | ${payloadAtualizacao.cenario}`, async ({ request }, testInfo) => {
      expect(id_registro).toBeTruthy();

      const response = await Put_Generico(
        request,
        testInfo.project.use.baseURL,
        payloadAtualizacao,
        id_registro,
        endpoint
      );

      expect(response.status()).toBe(payloadAtualizacao.httpcode);
    });
  });

  // 🔹 DELETE - Remover Equipe
  test('08 DELETE - Remover Equipe', async ({ request }, testInfo) => {
    expect(id_registro).toBeTruthy();

    const response = await Delete_Generico(
      request,
      testInfo.project.use.baseURL,
      id_registro,
      endpoint
    );

    expect(response.status()).toBe(204);
  });

});
