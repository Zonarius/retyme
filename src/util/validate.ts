import Ajv from 'ajv';
import * as fs from 'fs-extra';
import * as path from 'path';
import { RequestHandler } from 'express-serve-static-core';
import { json } from 'express';

export type MeshJsonSchema = keyof typeof schemas;

const ajv = new Ajv();
const parseJson = json();

const schemas = {
  'userCreateRequest': '/user/userCreateRequest.json',
  'loginRequest': '/auth/loginRequest.json',
  'graphqlRequest': '/graphqlRequest.json'
}

const loadSchemas = Promise.all(Object.keys(schemas)
  .map(schemaName => fs.readJSON(path.join("jsonSchema", (schemas as any)[schemaName]))
  .then(schema => ajv.addSchema(schema, schemaName))))

export function validateJson(jsonSchema: MeshJsonSchema): RequestHandler {
  return (req, res, next) => parseJson(req, res, async () => {
    await loadSchemas;
    const valid = ajv.validate(jsonSchema, req.body);
    if (!valid) {
      res.statusCode = 400;
      res.send({
        errors: ajv.errors
      })
    } else {
      next();
    }
  })
}