import { Router } from "express";
import { authRouter } from "./auth/authRouter";
import { usersRouter } from "./users/userRouter";
import { userHandler } from "./userHandler";
import { searchRouter } from "./search/searchRouter";
import { projectsRouter } from "./projects/projectsRouter";
import { graphqlRouter } from "../graphql/graphqlRouter";

export const rootRouter = Router();

rootRouter.use(userHandler)

rootRouter.get('/', (req, res) => res.send(version()))
rootRouter.use('/auth', authRouter);
rootRouter.use('/users', usersRouter);
rootRouter.use('/search', searchRouter);
rootRouter.use('/projects', projectsRouter);

// Project routes
rootRouter.use('/:project/graphql', graphqlRouter)

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
