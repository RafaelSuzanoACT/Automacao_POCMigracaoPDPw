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
const Cadastro_Fixture= require('../../fixtures/Cadastro_Intercambios.json');
const  Atualiza_Fixture= require('../../fixtures/Atualiza_Intercambios.json');

let id_registro
let endpoint = 'Intercambios';
const Dataset_SubsitemaOrigem = ['SE','S','NE','N']


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


  test('05 GET Consulta SubSistema ' + endpoint, async ({ request }, testInfo) => {
    const response = await Get_Generico(
      request,
      testInfo.project.use.baseURL,
      endpoint+'?origem=N&destino=NE'
    );

    const body = await response.json();
    console.log('Status Code:', response.status());
    console.log('Response Body:', body);

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




  test('07 Consulta SubSistema Data ' + endpoint , async ({ request }, testInfo) => {
    const response = await Get_GenericoFiltroParam(
      request,
      testInfo.project.use.baseURL,
     endpoint +'/data','2024-12-25'
    );

    console.log('Status Code:', response.status());
    expect(response.status()).toBe(200);
  });


Dataset_SubsitemaOrigem.forEach((tipo) => {
    test(`08 GET Consulta SubSistema Origem  - ${endpoint} + ${tipo}`, async ({ request }, testInfo) => {
      const response = await Get_Generico(
        request,
        testInfo.project.use.baseURL,
        endpoint + '/origem/' + tipo
      );
  
      const body = await response.json();
      console.log('Dataset:', tipo);
      console.log('Status Code:', response.status());
      console.log('Response Body:', body);
    });
  })



Dataset_SubsitemaOrigem.forEach((tipo) => {
    test(`09 GET Consulta SubSistema Destino  - ${endpoint} + ${tipo}`, async ({ request }, testInfo) => {
      const response = await Get_Generico(
        request,
        testInfo.project.use.baseURL,
        endpoint + '/destino/' + tipo
      );
  
      const body = await response.json();
      console.log('Dataset:', tipo);
      console.log('Status Code:', response.status());
      console.log('Response Body:', body);
    });
  })



  test('10 Consulta por Data ' + endpoint , async ({ request }, testInfo) => {
    const response = await Get_GenericoFiltroParam(
      request,
      testInfo.project.use.baseURL,
     endpoint +'/data','2024-12-25'
     
    );
    const body = await response.json();
    console.log('Response Body:', body);
    console.log('Status Code:', response.status());
    expect(response.status()).toBe(200);

  });

      test('11 Consulta ' + endpoint + ' Periodo', async ({ request }, testInfo) => {
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
      test('12 Consulta entre especificio entre subsistemas e data ' + endpoint + ' Periodo', async ({ request }, testInfo) => {
    const response = await Get_Generico(
      request,
      testInfo.project.use.baseURL,
      endpoint+ '/origem/N/destino/NE/data/2024-12-25'
    );

    const body = await response.json();
    console.log('Status Code:', response.status());
    console.log('Response Body:', body);

  });


  Atualiza_Fixture.forEach((payloadAtualizacao) => {
    test(` 13 PUT - Atualizar ${endpoint} | ${payloadAtualizacao.cenario}`, async ({ request }, testInfo) => {
      const response = await Put_Generico(
        request,
        testInfo.project.use.baseURL,
        payloadAtualizacao,
        id_registro,
        endpoint
      );

      const text = await response.text();
      const body = text ? JSON.parse(text) : null;

      console.log('Status Code:', response.status());
      console.log('Payload enviado:', payloadAtualizacao);
      console.log('Response Body:', body);
      

      expect(response.status()).toBe(payloadAtualizacao.httpcode);
    });
  });

  
test('14 Delete ' + endpoint, async ({ request }, testInfo) => {
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



