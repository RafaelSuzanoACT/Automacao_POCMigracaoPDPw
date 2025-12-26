import { test, expect } from '@playwright/test';
const {
    
        Get_FiltroPeriodo,
   
        Get_GenericoFiltroID,
        Post_Generico, 
        Get_Generico,
        
        Delete_Generico,
        Put_Generico,


} = require('../../support/commands');
const Cadastro_Fixture= require('../../fixtures/Cadastro_DadosEnergeticos.json');
//const Atualiza_Cargas = require('../../fixtures/Atualiza_DadosEnergeticos.json');

let id_
let endpoint = 'DadosEnergeticos';


test.describe('API '+ endpoint, () => {

  // 🔹 POST - Criar Equipe
  Cadastro_Fixture.forEach((payloadEquipe) => {
    test(`01 POST Cadastro - ${endpoint} - ${payloadEquipe.cenario}`, async ({ request }, testInfo) => {
      const response = await Post_Generico(
        request,
        testInfo.project.use.baseURL,
        endpoint,
        payloadEquipe
      );

      const body = await response.json();

      console.log('Projeto:', testInfo.project.name);
      console.log('BaseURL:', testInfo.project.use.baseURL);
      console.log('Status Code:', response.status());
      console.log('Payload enviado:', payloadEquipe);
      console.log('Response Body:', body);

      if (body?.id) {
        id_ = body.id;
        console.log('✅ ID :',id_);
      }

      expect(response.status()).toBe(payloadEquipe.httpcode);
    });
    });
  test('02 GET Consulta todos ' + endpoint, async ({ request }, testInfo) => {
    const response = await Get_Generico(
      request,
      testInfo.project.use.baseURL,
      endpoint
    );

    const body = await response.json();
    console.log('Status Code:', response.status());
    console.log('Response Body:', body);

  });

      test('03 Consulta ' + endpoint + ' Periodo', async ({ request }, testInfo) => {
    const response = await Get_FiltroPeriodo(
      request,
        testInfo.project.use.baseURL,
        endpoint+'/periodo','2025-12-01'  ,'2025-12-31'
    );
    const body = await response.json();
    console.log('Response Body:', body);
    console.log('Status Code:', response.status());
    expect(response.status()).toBe(200);        
});

    test('04 Consulta ' + endpoint + '  Por ID', async ({ request }, testInfo) => {
    const response = await Get_GenericoFiltroID(
      request,
      testInfo.project.use.baseURL,
     id_,  endpoint,
    );
    const body = await response.json();
    console.log('Response Body:', body);
    console.log('Status Code:', response.status());
    expect(response.status()).toBe(200);        
});


  });
