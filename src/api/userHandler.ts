import { Router } from "express";
import cookieParser from 'cookie-parser';
import * as jwt from 'jsonwebtoken';
import { Request } from "express-serve-static-core";

import { getDbUserByName, toUserResponse, users } from "../redis/users";
import { coalesce } from "../util/util";
import { UserResponse } from "../model/users";

export const userHandler = Router();

userHandler.use(cookieParser(), async (req, res, next) => {
  const token = getToken(req);
  var user: UserResponse | undefined;
  try {
    const {userUuid} = jwt.verify(token, "somesecret") as any;
    user = await users.findByUuid(userUuid);
  } catch { }

  if (!user) {
    const dbUser = await getDbUserByName("anonymous");
    if (!dbUser) {
      console.error(`Could not find anonymous user`)
      res.sendStatus(500);
      return;
    }
    user = toUserResponse(dbUser);
  }

  req.mesh.requestUser = user;
  next();
})

const bearerRegex = /Bearer (.*)/.compile();
function getToken(req: Request) {
  return coalesce(
    () => {
      const header = req.header("Authorization");
      if (!header) return;
      const result = bearerRegex.exec(header);
      if (!result) return;
      const groups = result.groups;
      if (!groups) return;
      return groups[1];
    },
    () => req.cookies["mesh.token"]
  )
}