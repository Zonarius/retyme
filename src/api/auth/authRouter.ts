import { Router, json } from "express";
import * as jwt from 'jsonwebtoken';
import { activeConfig } from "../../config";

export const authRouter = Router();

authRouter.get('/me', (req, res) => {
  res.send(req.mesh.requestUser)
})

authRouter.post(`/login`, json(), (req, res) => {
  const token = jwt.sign({ some: "thing" } as object, "somesecret", {
    expiresIn: activeConfig().security.tokenExpirationTime
  });
  res.send({ token });
})