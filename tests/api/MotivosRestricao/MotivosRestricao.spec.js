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
const datasets_motivos = ['PROGRAMADA', 'EMERGENCIAL',' MANUTEN��O'];

//const Atualiza_Fixture = require('../../fixtures/Atualiza_DadosEnergeticos.json');

let id_
let endpoint = 'MotivosRestricao';


test.describe('API ' + endpoint , () => {

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
  test('03 GET Consulta todos ' + endpoint + 'Ativos', async ({ request }, testInfo) => {
    const response = await Get_Generico(
      request,
      testInfo.project.use.baseURL,
      endpoint+'/ativos'
    );

    const body = await response.json();
    console.log('Status Code:', response.status());
    console.log('Response Body:', body);

  });



  datasets_motivos.forEach((tipo) => {
    test(`04 GET Consulta todos Moivo - ${endpoint} + ${tipo}`, async ({ request }, testInfo) => {
      const response = await Get_Generico(
        request,
        testInfo.project.use.baseURL,
        endpoint + '/categoria/' + tipo
      );
  
      const body = await response.json();
      console.log('Dataset:', tipo);
      console.log('Status Code:', response.status());
      console.log('Response Body:', body);
    });
  });

    test('05 Consulta ' + endpoint + '  Por ID', async ({ request }, testInfo) => {
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


test('07 DELETE - Remover' + endpoint + ' Por ID', async ({ request }, testInfo) => {
    expect(id_).toBeDefined();

    const response = await Delete_Generico(
      request,
      testInfo.project.use.baseURL,
      id_,
      endpoint
    );

    console.log('Status Code:', response.status());

    expect([200, 204]).toContain(response.status());
  });


  });
