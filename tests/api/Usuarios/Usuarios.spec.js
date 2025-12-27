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
const Cadastro_Fixture= require('../../fixtures/Cadastro_Usuarios.json');
//const Atualiza_Cargas = require('../../fixtures/Atualiza_Balancos.json');

let id_registro
let endpoint = 'usuarios';



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

    test('02 Consulta ' + endpoint + '  Por ID', async ({ request }, testInfo) => {
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







  test('03 Consulta  Equipe ' + endpoint , async ({ request }, testInfo) => {
    const response = await Get_GenericoFiltroParam(
      request,
      testInfo.project.use.baseURL,
     endpoint +'/equipe',1
    );

    console.log('Status Code:', response.status());
    expect(response.status()).toBe(200);
  });



  test('04 Consulta  Perfil ' + endpoint , async ({ request }, testInfo) => {
    const response = await Get_GenericoFiltroParam(
      request,
      testInfo.project.use.baseURL,
     endpoint +'/perfil',1
    );

    console.log('Status Code:', response.status());
    expect(response.status()).toBe(200);
  });



  test('05 Consulta  email ' + endpoint , async ({ request }, testInfo) => {
    const response = await Get_GenericoFiltroParam(
      request,
      testInfo.project.use.baseURL,
     endpoint +'/email','User_Automacao@User_Automacao.com'
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
