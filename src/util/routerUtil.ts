import { EntityTypeName } from "../model/common";
import { Router, json } from "express";
import { entityFunctionMap } from "../redis/common";

export function entityRouter(type: EntityTypeName) {
  const router = Router();
  const entityFunctions = entityFunctionMap[type];

  router.get(`/`, async (req, res) => {
    res.send(await entityFunctions.findAll());
  })
  
  router.get(`/:uuid`, async (req, res) => {
    const entity = await entityFunctions.findByUuid(req.params.uuid);
    if (!entity) {
      return res.sendStatus(404);
    }
    res.send(entity);
  })
  
  router.post(`/`, json(), async (req, res) => {
    res.send(await entityFunctions.create(req.body));
  })
  return router;
}