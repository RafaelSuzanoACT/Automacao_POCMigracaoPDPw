import { test, expect } from '@playwright/test';
const {
    
        Get_FiltroPeriodo,
   
        Get_GenericoFiltroID,
        Post_Generico, 
        Get_Generico,
        
        Delete_Generico,
        Put_Generico,
        Get_GenericoFiltroParam


} = require('../../support/commands');
const Cadastro_Fixture= require('../../fixtures/Cadastro_Balancos.json');
//const Atualiza_Cargas = require('../../fixtures/Atualiza_Balancos.json');

let id_registro
let endpoint = 'Balancos';
const Dataset_SubsitemaID = ['SE','S','NE','N']


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
        id_registro = body.id;
        console.log('✅ ID :',id_registro);
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
     id_registro,  endpoint,
    );
    const body = await response.json();
    console.log('Response Body:', body);
    console.log('Status Code:', response.status());
    expect(response.status()).toBe(200);        
});




Dataset_SubsitemaID.forEach((tipo) => {
    test(`05 GET Consulta Tipos  - ${endpoint} + ${tipo}`, async ({ request }, testInfo) => {
      const response = await Get_Generico(
        request,
        testInfo.project.use.baseURL,
        endpoint + '/subsistema/' + tipo
      );
  
      const body = await response.json();
      console.log('Dataset:', tipo);
      console.log('Status Code:', response.status());
      console.log('Response Body:', body);
    });
  });


  test('06 Consulta por Data ' + endpoint , async ({ request }, testInfo) => {
    const response = await Get_GenericoFiltroParam(
      request,
      testInfo.project.use.baseURL,
     endpoint +'/data','2024-12-25'
    );

    console.log('Status Code:', response.status());
    expect(response.status()).toBe(200);
  });


  test('06 Consulta SubSistema Data' + endpoint , async ({ request }, testInfo) => {
    const response = await Get_GenericoFiltroParam(
      request,
      testInfo.project.use.baseURL,
     endpoint +'/subsistema/SE/data','2024-12-25'
    );

    console.log('Status Code:', response.status());
    expect(response.status()).toBe(200);
  });



test('09 Delete ' + endpoint, async ({ request }, testInfo) => {
    const response = await Delete_Generico(request, testInfo.project.use.baseURL, id_registro, endpoint);
  
    console.log('Status Code:', response.status());
    console.log(id_registro)
  
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
