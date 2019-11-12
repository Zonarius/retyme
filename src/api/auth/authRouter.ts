import { Router } from "express";
import * as jwt from 'jsonwebtoken';
import { validateJson } from "../../util/validate";
import { activeConfig } from "../../config";

export const authRouter = Router();

authRouter.get('/me', (req, res) => {
  res.send(req.mesh.requestUser)
})

authRouter.post(`/login`, validateJson("loginRequest"), (req, res) => {
  const expiresIn = activeConfig().security.tokenExpirationTime;
  const token = jwt.sign({ userUuid: "thing" } as object, "somesecret", {
    expiresIn: expiresIn
  });
  res.cookie("mesh.token", token, {
    maxAge: expiresIn * 1000
  })
  res.send({ token });
})