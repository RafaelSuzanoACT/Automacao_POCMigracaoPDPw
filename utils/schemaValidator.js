import Ajv from 'ajv';

const ajv = new Ajv({ strict: false, allErrors: true });

export function validateSchema(data, schema) {
  const validate = ajv.compile(schema);
  const valid = validate(data);

  if (!valid) {
    throw new Error(
      'Schema inválido:\n' +
      JSON.stringify(validate.errors, null, 2)
    );
  }
}
