**Automação — POC Migração PDPw**

Este repositório contém os testes automatizados (Playwright) usados na POC de migração PDPw.

**Visão geral / convenções**
- Nomes de arquivos: use `NomeDaFuncionalidade.api.spec.js` para testes de API e `NomeDaFuncionalidade.web.spec.js` para testes de UI (troque `.api.` por `.web.` quando criar teste web).
- Pastas principais: `tests/api/` para testes de API e `tests/web/` para testes de interface.
- Projetos Playwright: existem projetos chamados `api` e `web` (definidos em `playwright.config.*`).

**Pré-requisitos**
- Node.js instalado (versão compatível com `package.json`).
- Dependências instaladas: execute `npm install` na raiz do workspace de testes.
- Playwright: se necessário, rode `npx playwright install` para baixar navegadores.

**Como executar os testes**

- Executar todos os testes (padrão):
```bash
npx playwright test
```

- Executar apenas o projeto WEB:
```bash
npx playwright test --project=web
```

- Executar apenas o projeto API:
```bash
npx playwright test --project=api
```

- Executar um arquivo/teste específico (exemplo):
```bash
npx playwright test tests/api/ComentariosDESSEM/ComentariosDESSEM.api.spec.js
```

- Listar os testes (útil para debug):
```bash
npx playwright test --list
```

**Opções úteis**
- Executar em modo headful (visível): `npx playwright test --headed`
- Abrir modo de depuração para um teste: `npx playwright test --debug <caminho/do/teste>`
- Gerar relatório HTML: `npx playwright show-report` (após execução)

**Observações específicas deste projeto**
- Alguns testes de API usam dados ou endpoints internos da POC; verifique variáveis de ambiente ou configurações em `playwright.config.*` quando algo falhar.
- Se a API depender de serviços locais (ex.: SQL ou API .NET), verifique se o `docker-compose.yml` do projeto raiz está em execução (arquivo: `../docker-compose.yml`).

Se algo estiver pouco claro ou você quiser que eu inclua exemplos adicionais (ex.: como rodar dentro do Docker, pipeline CI ou gerar relatórios), me diga que eu atualizo este README.
