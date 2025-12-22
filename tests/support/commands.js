async function Get_Health(request, BaseURL) {
  const response = await request.get(BaseURL + '/Health');
  return response;
}

async function Get_ArquivosDadger(request, BaseURL) {
  const response = await request.get(BaseURL + '/ArquivosDadger');
  return response;
}

async function Get_Empresa(request, BaseURL) {
  const response = await request.get(BaseURL + '/Empresas');
  return response;
}

async function Get_Empresa_Filtro(request, BaseURL, id_empresa) {
  const response = await request.get(`${BaseURL}/Empresas/${id_empresa}`);
  return response;
}


async function Get_Empresa_Filtro_CNPJ(request, BaseURL, cnpj) {
  const response = await request.get(`${BaseURL}/Empresas/cnpj/${cnpj}`);
  return response;
}

async function Get_Empresa_Filtro_Nome(request, BaseURL, nome) {
  const response = await request.get(`${BaseURL}/Empresas/nome/${nome}`);
  return response;
}


async function Get_Empresa_Verifica_Nome(request, BaseURL, nome) {
  const response = await request.get(`${BaseURL}/Empresas/verificar-nome/${nome}`);
  return response;
}

async function Get_Empresa_Verifica_CNPJ(request, BaseURL, cnpj) {
  const response = await request.get(`${BaseURL}/Empresas/verificar-cnpj/${cnpj}`);
  return response;
}
 





async function Post_Empresa(request, BaseURL, payload) {
  const body = { ...payload };
  delete body.httpcode;
  delete body.cenario;

  const response = await request.post(`${BaseURL}/Empresas`, {
    data: body,
    headers: { 'Content-Type': 'application/json' },
  });

  return response;
}




async function Put_Empresa(request, BaseURL, payload, id_empresa) {
  const body = { ...payload };
  delete body.httpcode;
  delete body.cenario;
  delete body.mensagem;

  const response = await request.put(`${BaseURL}/Empresas/${id_empresa}`, {
    data: body,
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json',
    },
  });

  return response;
}

async function Delete_Empresa(request, BaseURL, id_empresa) {
  const response = await request.delete(`${BaseURL}/Empresas/${id_empresa}`);
  return response;
}


// Gestao Equipe

async function Get_Gestao_Equipe(request, BaseURL) {
  const url = `/EquipesPdp`;
  const response = await request.get(`${BaseURL}${url}`);
  console.log('URL Requisição:', `${BaseURL}${url}`);
  

  return response;
}


async function Get_Gestao_Equipe_Nome(request, BaseURL, nome) {
  const url = `/EquipesPdp/nome/${nome}`;
  const response = await request.get(`${BaseURL}${url}`);
  console.log('URL Requisição:', `${BaseURL}${url}`);



  return response;
}

async function Get_Gestao_Equipe_Membros(request, BaseURL, id_equipe) {
  const url = `/EquipesPdp/${id_equipe}/membros`;
  const response = await request.get(`${BaseURL}${url}`);
  console.log('URL Requisição:', `${BaseURL}${url}`);


  return response;
}

async function Get_Gestao_Equipe_Filtro(request, BaseURL, id_equipe) {
  const url = `/EquipesPdp/${id_equipe}`;
  const response = await request.get(`${BaseURL}${url}`);
  console.log('URL Requisição:', `${BaseURL}${url}`);
  return response;
}


async function Get_Gestao_Equipe_Verificar_Nome(request, BaseURL, nome) {
  const url = `/EquipesPdp/verificar-nome?nome=${nome}`;
  const response = await request.get(`${BaseURL}${url}`);
  console.log('URL Requisição:', `${BaseURL}${url}`);
  return response;
}


async function Post_GestaoEquipes(request, BaseURL, payload) {
  const body = { ...payload };
  delete body.httpcode;
  delete body.cenario;

  const response = await request.post(`${BaseURL}/EquipesPdp`, {
    data: body,
    headers: { 'Content-Type': 'application/json' },
  });

  return response;
}




async function Put_AtualizaGestaoEquipe(request, BaseURL, payload, id_equipe) {
  const body = { ...payload };
  delete body.httpcode;
  delete body.cenario;
  delete body.mensagem;

  const response = await request.put(`${BaseURL}/EquipesPdp/${id_equipe}`, {
    data: body,
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json',
    },
  });

  return response;
}


async function Delete_GestaoEquipe(request, BaseURL, id_equipe) {

  
  const url = `${BaseURL}/EquipesPdp/${id_equipe}`;
  const response = await request.delete(`${url}`);
  console.log('URL Requisição:', `${url}`);

  return response;
}


//Tipos de TiposUsina


async function Get_TiposUsina(request, BaseURL) {
  const url = `/TiposUsina`;
  const response = await request.get(`${BaseURL}${url}`);
  console.log('URL Requisição:', `${BaseURL}${url}`);
  

  return response;
}


async function Get_TiposUsinaPorID(request, BaseURL,ID_TiposUsina) {
  const url = `/TiposUsina/${ID_TiposUsina}`;
  const response = await request.get(`${BaseURL}${url}`);
  console.log('URL Requisição:', `${BaseURL}${url}`);
  

  return response;
}


async function Get_TiposUsinaNome(request, BaseURL, nome) {
  const url = `/TiposUsina/nome/${nome}`;
  const response = await request.get(`${BaseURL}${url}`);
  console.log('URL Requisição:', `${BaseURL}${url}`);
  

  return response;
}

async function Get_TiposUsina_VerificarNome(request, BaseURL, nome) {
  const url = `/EquipesPdp/verificar-nome?nome=${nome}`;
  const response = await request.get(`${BaseURL}${url}`);
  console.log('URL Requisição:', `${BaseURL}${url}`);
  return response;
}


async function Post_TiposUsina(request, BaseURL, payload) {
  const body = { ...payload };
  delete body.httpcode;
  delete body.cenario;
  console.log('URL Requisição:', `${BaseURL}/TiposUsina`);
  const response = await request.post(`${BaseURL}/TiposUsina`, {
    data: body,
    headers: { 'Content-Type': 'application/json' },
  });

  return response;
}



async function Put_TipoUsina(request, BaseURL, payload, id_tiposusina) {
  const body = { ...payload };
  delete body.httpcode;
  delete body.cenario;
  delete body.mensagem;

  const response = await request.put(`${BaseURL}/TiposUsina/${id_tiposusina}`, {
    data: body,
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json',
    },
  });

  return response;
}



async function Delete_TiposUsina(request, BaseURL, id_tiposusina) {
  const response = await request.delete(`${BaseURL}/TiposUsina/${id_tiposusina}`);
  return response;
}




// Cargas



async function Get_Cargas(request, BaseURL) {
  const url = `/Cargas`;
  const response = await request.get(`${BaseURL}${url}`);
  console.log('URL Requisição:', `${BaseURL}${url}`);
  

  return response;
}

async function Get_CargasFiltroID(request, BaseURL, ID_Carga) {
  const url = `/Cargas/${ID_Carga}`;
  const response = await request.get(`${BaseURL}${url}`);
  console.log('URL Requisição:', `${BaseURL}${url}`);
  

  return response;
}


async function Get_CargasFiltroPeriodo(request, BaseURL, dtini,dtfim) {
  const url = `/Cargas/periodo?dtini=${dtini}&dtfim=${dtfim}`;
  const response = await request.get(`${BaseURL}${url}`);
  console.log('URL Requisição:', `${BaseURL}${url}`);
  

  return response;
}


async function Get_CargasFiltroSubSistema(request, BaseURL, subsistemaId) {
  const url = `/Cargas/subsistema/${subsistemaId}`;
  const response = await request.get(`${BaseURL}${url}`);
  console.log('URL Requisição:', `${BaseURL}${url}`);
  

  return response;
}



//dataReferencia

async function Get_CargasDataReferencia(request, BaseURL, dataReferencia) {
  const url = `/Cargas/data/${dataReferencia}`;
  const response = await request.get(`${BaseURL}${url}`);
  console.log('URL Requisição:', `${BaseURL}${url}`);
    return response;
}

async function Post_Cargas(request, BaseURL, payload) {
  const body = { ...payload };
  delete body.httpcode;
  delete body.cenario;
  console.log('URL Requisição:', `${BaseURL}/Cargas`);
  const response = await request.post(`${BaseURL}/Cargas`, {
    data: body,
    headers: { 'Content-Type': 'application/json' },
  });

  return response;
}

async function Delete_Carga(request, BaseURL, id_carga) {

  
  const url = `${BaseURL}/Cargas/${id_carga}`;
  const response = await request.delete(`${url}`);
  console.log('URL Requisição:', `${url}`);

  return response;
}

async function Put_AtualizaCarga(request, BaseURL, payload, id_carga) {
  const body = { ...payload };
  delete body.httpcode;
  delete body.cenario;
  delete body.mensagem;

  const response = await request.put(`${BaseURL}/Cargas/${id_carga}`, {
    data: body,
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json',
    },

  });

  return response;
}
// ✅ Exportando todas as funções de uma vez
module.exports = {
  Get_Health,
  Get_ArquivosDadger,
    
    Get_Empresa,
    Get_Empresa_Filtro,
    Post_Empresa,
    Delete_Empresa,
    Get_Empresa_Filtro_CNPJ,
    Get_Empresa_Filtro_Nome,
    Get_Empresa_Verifica_Nome,
    Get_Empresa_Verifica_CNPJ,
    Put_Empresa,

    Get_Gestao_Equipe,
    Get_Gestao_Equipe_Nome,
    Get_Gestao_Equipe_Membros,
    Get_Gestao_Equipe_Filtro,
    Get_Gestao_Equipe_Verificar_Nome,
    Post_GestaoEquipes,
    Delete_GestaoEquipe,
    Put_AtualizaGestaoEquipe,


    Get_TiposUsina,
    Get_TiposUsinaNome,
    Get_TiposUsina_VerificarNome,
    Get_TiposUsinaPorID,
    Post_TiposUsina,
    Delete_TiposUsina,
    Put_TipoUsina,
    

    Get_Cargas,
    Get_CargasFiltroID,
    Get_CargasFiltroPeriodo,
    Get_CargasFiltroSubSistema,
    Get_CargasDataReferencia,
    Post_Cargas,
    Delete_Carga,
    Put_AtualizaCarga


    
};
