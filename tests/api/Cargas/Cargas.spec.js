import { test, expect } from '@playwright/test';
const { Get_Cargas,
        Get_CargasFiltroID,
        Get_CargasFiltroPeriodo,
        Get_CargasFiltroSubSistema,
        Get_CargasDataReferencia,
        Post_Cargas,
        Delete_Carga,
        Put_AtualizaCarga


} = require('../../support/commands');
const Cadastro_Cargas = require('../../fixtures/Cadastro_Cargas.json');
const Atualiza_Cargas = require('../../fixtures/Atualiza_Cargas.json');

let id_carga


test.describe('API Cargas', () => {

    Cadastro_Cargas.forEach((payloadCarga) => {
        test(`01 Cadastro de Carga ${payloadCarga.cenario}`, async ({ request }, testInfo) => {
            const expectedStatus = payloadCarga.httpcode;
            const response = await Post_Cargas(request, testInfo.project.use.baseURL, payloadCarga);
            const body = await response.json();

            console.log('Status Code:', response.status());
            console.log('Payload enviado:', payloadCarga);
            console.log('Response Body:', body);

            if (expectedStatus !== response.status()) {
                console.log(`❌ Esperado: ${expectedStatus}, Recebido: ${response.status()}`);
            } else if (body.id) {
                console.log('✅ ID retornado:', body.id);
                id_carga = body.id
            }
            expect(response.status()).toBe(expectedStatus);
        });

    });


    test('02 Consulta Todas Cargas', async ({ request }, testInfo) => {
        const response = await Get_Cargas(request, testInfo.project.use.baseURL);
        const body = await response.json();

        console.log('Status Code:', response.status());
       // console.log('Response Body:', body);

        expect(response.status()).toBe(200);
    });

    test('03 Consulta Carga Por ID', async ({ request }, testInfo) => {
        const response = await Get_CargasFiltroID(request, testInfo.project.use.baseURL,1);
        const body = await response.json();

        console.log('Status Code:', response.status());
        console.log('Response Body:', body);

        expect(response.status()).toBe(200);
    });



    test('04 Consulta Carga Por Periodo', async ({ request }, testInfo) => {
        const response = await Get_CargasFiltroPeriodo(request, testInfo.project.use.baseURL,'2025-12-22','2025-12-31');
        const body = await response.json();

        console.log('Status Code:', response.status());
        console.log('Response Body:', body);

        expect(response.status()).toBe(200);

})

    test('05 Consulta Carga Por SubSistema', async ({ request }, testInfo) => {
        const response = await Get_CargasFiltroSubSistema(request, testInfo.project.use.baseURL,'RAFAEL');
        const body = await response.json();

        console.log('Status Code:', response.status());
        console.log('Response Body:', body);

        expect(response.status()).toBe(200);

})

    test('06 Consulta Carga Por Data Referencia', async ({ request }, testInfo) => {
        const response = await Get_CargasDataReferencia(request, testInfo.project.use.baseURL,'2025-12-22');
        const body = await response.json();

        console.log('Status Code:', response.status());
        console.log('Response Body:', body);

        expect(response.status()).toBe(200);        


})


        Atualiza_Cargas.forEach((Atualiza_Cargas_Fixture, ) => {
  test(
    `08 Atualizar Carga - ${Atualiza_Cargas_Fixture.cenario}`,
    async ({ request }, testInfo) => {

      const response = await Put_AtualizaCarga(
        request,
        testInfo.project.use.baseURL,
        Atualiza_Cargas_Fixture, id_carga
        
      );

      expect(response.status()).toBe(Atualiza_Cargas_Fixture.httpcode);

      const text = await response.text();
      const body = text ? JSON.parse(text) : null;

      console.log('Response Body:', body);
    }
  );
});
   
test('09 Delete Cargas', async ({ request }, testInfo) => {
  const response = await Delete_Carga(request, testInfo.project.use.baseURL, id_carga);


  console.log('Status Code:', response.status());


  let body;
  try {
    body = await response.json(); 
  } catch (err) {
    body = 'No content'; 
  }
  console.log('Response Body:', body);

  expect(response.status()).toBe(204);
});


})