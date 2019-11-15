import * as bcrypt from 'bcrypt';

import { Router } from "express";
import * as jwt from 'jsonwebtoken';
import { validateJson } from "../../util/validate";
import { activeConfig } from "../../config";
import { getDbUserByName } from "../../redis/users";
import { MeshRequest } from "../../util/util";

export const authRouter = Router();

authRouter.get('/me', (req, res) => {
  res.send(req.mesh.requestUser)
})

interface LoginRequest {
  username: string;
  password: string;
}

authRouter.post(`/login`, validateJson("loginRequest"), async (req: MeshRequest<LoginRequest>, res) => {
  const user = await getDbUserByName(req.body.username);

  if (!user) {
    res.sendStatus(401);
    return;
  }

  const matches = await bcrypt.compare(req.body.password, user.password);

  if (!matches) {
    res.sendStatus(401);
    return;
  }

  const expiresIn = activeConfig().security.tokenExpirationTime;
  const token = jwt.sign({ userUuid: user.uuid } as object, "somesecret", {
    expiresIn: expiresIn
  });
  res.cookie("mesh.token", token, {
    maxAge: expiresIn * 1000
  })
  res.send({ token });
})