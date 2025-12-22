import { test, expect } from '@playwright/test';
const { Get_Gestao_Equipe,
    Get_Gestao_Equipe_Nome,
    Get_Gestao_Equipe_Membros,
    Get_Gestao_Equipe_Filtro,
    Get_Gestao_Equipe_Verificar_Nome,
    Post_GestaoEquipes,
    Delete_GestaoEquipe,Put_AtualizaGestaoEquipe
} = require('../../support/commands');
const GestaoEquipeFixture = require('../../fixtures/Cadastro_GestaoEquipe.json');
const Atualiza_GestaoEquipeFixture = require('../../fixtures/Atualiza_GestaoEquipe.json');

let id_equipe

test.describe('API Gestao de Equipe', () => {


    GestaoEquipeFixture.forEach((payloadEquipe) => {
        test(`01 Enviar POST para ${payloadEquipe.cenario}`, async ({ request }, testInfo) => {
            const expectedStatus = payloadEquipe.httpcode;
            const response = await Post_GestaoEquipes(request, testInfo.project.use.baseURL, payloadEquipe);
            const body = await response.json();
            console.log('Projeto:', testInfo.project.name);
            console.log('BaseURL:', testInfo.project.use.baseURL);
            console.log('Status Code:', response.status());
            console.log('Payload enviado:', payloadEquipe);
            console.log('Response Body:', body);

            if (expectedStatus !== response.status()) {
                console.log(`❌ Esperado: ${expectedStatus}, Recebido: ${response.status()}`);
            } else if (body.id) {
                console.log('✅ ID retornado:', body.id);
                id_equipe = body.id
            }
            expect(response.status()).toBe(expectedStatus);
        });

    });



    test('02 Consulta Todas Equipes', async ({ request }, testInfo) => {
        const response = await Get_Gestao_Equipe(request, testInfo.project.use.baseURL);
        const body = await response.json();

        console.log('Status Code:', response.status());
       // console.log('Response Body:', body);

        expect(response.status()).toBe(200);
    });

    // 🔹 Consulta equipe específica por nome
    test('03 Consulta Equipe Filtro', async ({ request }, testInfo) => {
        const response = await Get_Gestao_Equipe_Nome(request, testInfo.project.use.baseURL, 'Automacao_Eq01');
        const body = await response.json();


        console.log('Status Code:', response.status());
        console.log('Response Body:', body);

        expect(response.status()).toBe(200);
    });

    test('04 Consulta Equipe Membros', async ({ request }, testInfo) => {
        const response = await Get_Gestao_Equipe_Membros(request, testInfo.project.use.baseURL, id_equipe);
        const body = await response.json();

        console.log('Status Code:', response.status());
        console.log('Response Body:', body);

        expect(response.status()).toBe(200);
    });

    //Get_Gestao_Equipe_Filtro
    test('05 Consulta Equipe Por ID', async ({ request }, testInfo) => {
        const response = await Get_Gestao_Equipe_Filtro(request, testInfo.project.use.baseURL, id_equipe);
        const body = await response.json();



        console.log('Status Code:', response.status());
        console.log('Response Body:', body);

        expect(response.status()).toBe(200);


    });

    //Get_Gestao_Equipe_Verificar_Nome
    test('06 Consulta Equipe Verificar Nome', async ({ request }, testInfo) => {
        const response = await Get_Gestao_Equipe_Verificar_Nome(request, testInfo.project.use.baseURL, 'rafael');
        const body = await response.json();



        console.log('Status Code:', response.status());
        console.log('Response Body:', body);

        expect(response.status()).toBe(200);


    });

        Atualiza_GestaoEquipeFixture.forEach((PayloadAtualiza_GestaoEquipeFixture, ) => {
  test(
    `07 Atualizar Gestao Equipe - ${PayloadAtualiza_GestaoEquipeFixture.cenario}`,
    async ({ request }, testInfo) => {

      const response = await Put_AtualizaGestaoEquipe(
        request,
        testInfo.project.use.baseURL,
        PayloadAtualiza_GestaoEquipeFixture, id_equipe
        
      );

      expect(response.status()).toBe(PayloadAtualiza_GestaoEquipeFixture.httpcode);

      const text = await response.text();
      const body = text ? JSON.parse(text) : null;

      console.log('Response Body:', body);
    }
  );
});


    test('08 Delete Equipe', async ({ request }, testInfo) => {
        const response = await Delete_GestaoEquipe(request, testInfo.project.use.baseURL, id_equipe);


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