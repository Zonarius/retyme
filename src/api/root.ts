import { Router } from "express";
import { authRouter } from "./auth/authRouter";
import { usersRouter } from "./users/userRouter";

export const rootRouter = Router();

rootRouter.get('/', (req, res) => res.send(version()))

rootRouter.use('/auth', authRouter);
rootRouter.use('/users', usersRouter);

export interface VersionResponse {
  meshVersion: string;
  meshNodeName: string;
  databaseVendor: "redis";
  databaseVersion: string;
}

function version(): VersionResponse {
  return {
    meshVersion: "1.1.0",
    meshNodeName: "FIXME",
    databaseVendor: "redis",
    databaseVersion: "???"
  }
}
