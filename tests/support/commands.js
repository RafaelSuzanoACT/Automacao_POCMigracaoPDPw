async function Get_Health(request,BaseURL) {
  const response = await request.get(BaseURL + '/Health'); // atenção ao case
  return response; // NÃO faça await aqui
}

module.exports = { Get_Health };
