import { test, expect } from '@playwright/test';
import SwaggerParser from '@apidevtools/swagger-parser';
import { validateSchema } from '../../../utils/schemaValidator.js';

test('Contrato - GET /api/Health', async ({ request }) => {
  const api = await SwaggerParser.parse(
    'http://localhost:5001/swagger/v1/swagger.json'
  );

  const response200 =
    api.paths['/api/Health']
      .get.responses['200'];

  const response = await request.get('/api/Health');
  expect(response.status()).toBe(200);

  // 🔹 Se NÃO existir content, o contrato é só status code
  if (!response200.content) {
    console.log('Contrato sem body definido no Swagger');
    return;
  }

  // 🔹 Se existir content, valida normalmente
  const contentTypes = Object.keys(response200.content);
  const contentType = contentTypes[0];
  const schema = response200.content[contentType].schema;

  const body = contentType.includes('json')
    ? await response.json()
    : await response.text();

  await validateSchema(body, schema);
});
