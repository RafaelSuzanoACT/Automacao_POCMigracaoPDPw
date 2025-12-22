import { test, expect } from '@playwright/test';
const { Get_TiposUsina, Get_TiposUsinaNome, Get_TiposUsina_VerificarNome, Get_TiposUsinaPorID,Put_TipoUsina,
    Post_TiposUsina, Delete_TiposUsina } = require('../../support/commands');
const Cadastro_TiposUsina = require('../../fixtures/Cadastro_TiposUsina.json');
const atualizaTiposUsina = require('../../fixtures/Atualiza_TiposUsina.json');
let ID_TiposUsina
test.describe('API TiposUsina', () => {



    Cadastro_TiposUsina.forEach((payloadTiposUsina) => {
        test(`01 Enviar POST para ${payloadTiposUsina.cenario}`, async ({ request }, testInfo) => {
            const expectedStatus = payloadTiposUsina.httpcode;
            const response = await Post_TiposUsina(request, testInfo.project.use.baseURL, payloadTiposUsina);
            const body = await response.json();
            console.log('Projeto:', testInfo.project.name);
            console.log('BaseURL:', testInfo.project.use.baseURL);
            console.log('Status Code:', response.status());
            console.log('Payload enviado:', payloadTiposUsina);
            console.log('Response Body:', body);

            if (expectedStatus !== response.status()) {
                console.log(`❌ Esperado: ${expectedStatus}, Recebido: ${response.status()}`);
            } else if (body.id) {
                console.log('✅ ID retornado:', body.id);
                ID_TiposUsina = body.id
            }
            expect(response.status()).toBe(expectedStatus);
        });

    });


    test('02 Consulta Todos os TiposUsina', async ({ request }, testInfo) => {
        const response = await Get_TiposUsina(request, testInfo.project.use.baseURL);
        const body = await response.json();
        console.log('Status Code:', response.status());
        // console.log('Response Body:', body);

        expect(response.status()).toBe(200);
    });


    test('03 Consulta TiposUsina por Nome', async ({ request }, testInfo) => {
        const response = await Get_TiposUsinaNome(request, testInfo.project.use.baseURL, 'Nuclear');
        const body = await response.json();
        console.log('Status Code:', response.status());
        console.log('Response Body:', body);

        expect(response.status()).toBe(200);
    });
    test('04 Verificar Nome TiposUsina', async ({ request }, testInfo) => {
        const response = await Get_TiposUsina_VerificarNome(request, testInfo.project.use.baseURL, 'Nuclear');
        const body = await response.json();
        console.log('Status Code:', response.status());
        console.log('Response Body:', body);

        expect(response.status()).toBe(200);
    });

    test('05 Verificar Nome Tipos Usina por ID', async ({ request }, testInfo) => {
        const response = await Get_TiposUsinaPorID(request, testInfo.project.use.baseURL, ID_TiposUsina);
        const body = await response.json();
        console.log('Status Code:', response.status());
        console.log('Response Body:', body);

        expect(response.status()).toBe(200);
    });


    atualizaTiposUsina.forEach((PayloadAtualiza_TiposUsinaFixture, ) => {
    test(`06 Atualizar Tipos Usina - ${PayloadAtualiza_TiposUsinaFixture.cenario}`,
    async ({ request }, testInfo) => {

      const response = await Put_TipoUsina(
        request,
        testInfo.project.use.baseURL,
        PayloadAtualiza_TiposUsinaFixture, ID_TiposUsina
        
      );

      expect(response.status()).toBe(PayloadAtualiza_TiposUsinaFixture.httpcode);

      const text = await response.text();
      const body = text ? JSON.parse(text) : null;

      console.log('Response Body:', body);
    }
  );
});




    test('07 Delete Tipos Usina', async ({ request }, testInfo) => {
        const response = await Delete_TiposUsina(request, testInfo.project.use.baseURL, ID_TiposUsina);
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
})    