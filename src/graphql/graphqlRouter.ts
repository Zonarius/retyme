import { Router } from "express";
import * as fs from 'fs';
import * as path from 'path';
import { graphql, buildSchema } from "graphql";
import { MeshRequest } from "../util/util";
import { validateJson } from "../util/validate";
import { users, findUserByName } from "../redis/users";


export const graphqlRouter = Router();

const rootValue = {
  user({uuid, name}: {uuid: string | undefined, name: string | undefined}) {
    if (uuid) {
      return users.findByUuid(uuid)
    }
    if (name) {
      return findUserByName(name)
    }
    return null;
  }
}

const schema = buildSchema(fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"))

interface GraphQLRequest {
  query: string
}

graphqlRouter.post('/', validateJson("graphqlRequest"), async (req: MeshRequest<GraphQLRequest>, res) => {
  const result = await graphql({
    contextValue: req,
    source: req.body.query,
    schema,
    rootValue
  });

  res.send(result);
})
