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





async function Put_Empresa(request, BaseURL, payload) {
  const body = { ...payload };
  delete body.httpcode;
  delete body.cenario;

  const response = await request.put(`${BaseURL}/Empresas/${id_empresa}`, {
    data: body,
    headers: { 'Content-Type': 'application/json' },
  });

  return response;
}


async function Delete_Empresa(request, BaseURL, id_empresa) {
  const response = await request.delete(`${BaseURL}/Empresas/${id_empresa}`);
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
    Put_Empresa
};
