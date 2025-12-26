async function Get_Health(request, BaseURL) {
  const response = await request.get(BaseURL + '/Health');
  return response;
}

async function Get_ArquivosDadger(request, BaseURL) {
  const response = await request.get(BaseURL + '/ArquivosDadger');
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




async function Get_Empresa_Verifica_CNPJ(request, BaseURL, cnpj) {
  const response = await request.get(`${BaseURL}/Empresas/verificar-cnpj/${cnpj}`);
  return response;
}


async function Get_Gestao_Equipe_Nome(request, BaseURL, nome) {
  const url = `/EquipesPdp/nome/${nome}`;
  const response = await request.get(`${BaseURL}${url}`);
 

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


async function Get_Generico_Verificar_Nome(request, BaseURL, Endpoint, nome) {
  const url = `/${Endpoint}/verificar-nome/${nome}`;
  console.log('URL Requisição:', `${BaseURL}${url}`);
  const response = await request.get(`${BaseURL}${url}`);

  return response;
}


//Tipos de TiposUsina


async function Get_Generico(request, BaseURL, Endpoint) {
  const url = "/" + Endpoint;
  const response = await request.get(`${BaseURL}${url}`);
  console.log('URL Requisição:', `${BaseURL}${url}`);


  return response;
}


async function Get_TiposUsinaPorID(request, BaseURL, ID_TiposUsina) {
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


async function Delete_Generico(request, BaseURL, id, Endpoint) {

  const url = `${BaseURL}/${Endpoint}/${id}`
  console.log('URL Requisição:', url);
  const response = await request.delete(url, {
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json',
    },
  })

  return response;
}



// Cargas



async function Get_CargasFiltroID(request, BaseURL, ID_Carga) {
  const url = `/Cargas/${ID_Carga}`;
  const response = await request.get(`${BaseURL}${url}`);
  console.log('URL Requisição:', `${BaseURL}${url}`);


  return response;
}


async function Get_CargasFiltroPeriodo(request, BaseURL, dtini, dtfim) {
  const url = `/Cargas/periodo?dtini=${dtini}&dtfim=${dtfim}`;
  const response = await request.get(`${BaseURL}${url}`);
  console.log('URL Requisição:', `${BaseURL}${url}`);


  return response;
}



async function Get_FiltroPeriodo(request, BaseURL, endpoint, dtini, dtfim) {
  const url = `/${endpoint}/?dataInicio=${dtini}&dataFim=${dtfim}`;

  console.log('URL Requisição:', `${BaseURL}${url}`);

  const response = await request.get(`${BaseURL}${url}`);
  return response;
}

module.exports = { Get_FiltroPeriodo };

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





async function Post_Generico(request, BaseURL, Endpoint, payload) {
  const body = { ...payload };
  delete body.httpcode;
  delete body.cenario;
  console.log('URL Requisição:', `${BaseURL}/${Endpoint}`);
  const response = await request.post(`${BaseURL}/${Endpoint}`, {
    data: body,
    headers: { 'Content-Type': 'application/json' },
  });

  return response;
}


async function Put_Generico(request, BaseURL, payload, id_, Endpoint) {
  const body = { ...payload };
  delete body.httpcode;
  delete body.cenario;
  delete body.mensagem;
  let url = `${BaseURL}/${Endpoint}/${id_}`
  console.log('URL Requisição:', url);
  const response = await request.put(url, {
    data: body,
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json',
    },
  });

  return response;
}



async function Get_GenericoFiltroID(request, BaseURL, id_, Endpoint) {
  const url = `/${Endpoint}/${id_}`;
  console.log('URL Requisição:', `${BaseURL}${url}`);

  const response = await request.get(`${BaseURL}${url}`);
  

  return response;
}

async function Get_GenericoFiltroParam(request, BaseURL, Endpoint, id_) {
  const url = `/${Endpoint}/${id_}`;
  console.log('URL Requisição:', `${BaseURL}${url}`);
  const response = await request.get(`${BaseURL}${url}`);
    return response;
}


async function Patch_Generico(request, BaseURL, Endpoint, id_) {
  const url = `/${Endpoint}${id_}+/processar`;
  console.log('URL Requisição:', `${BaseURL}${url}`);
  const response = await request.patch(`${BaseURL}${url}`);
    return response;
}


// ✅ Exportando todas as funções de uma vez
module.exports = {
  Post_Generico,
  Get_Generico,
  Put_Generico,
  Delete_Generico,
  Get_Generico_Verificar_Nome,
  Get_GenericoFiltroID,
  Get_GenericoFiltroParam,
  Patch_Generico,

  
  Get_FiltroPeriodo,

  Get_Health,
  Get_ArquivosDadger,


  Get_Empresa_Filtro,


  Get_Empresa_Filtro_CNPJ,
  Get_Empresa_Filtro_Nome,

  Get_Empresa_Verifica_CNPJ,



  Get_Gestao_Equipe_Nome,
  Get_Gestao_Equipe_Membros,
  Get_Gestao_Equipe_Filtro,







  Get_TiposUsinaNome,
  Get_TiposUsinaPorID,

  Get_CargasFiltroID,
  Get_CargasFiltroPeriodo,
  Get_CargasFiltroSubSistema,
  Get_CargasDataReferencia,




};

