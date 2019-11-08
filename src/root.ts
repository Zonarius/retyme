import { Router } from "express";

export const rootRouter = Router();

rootRouter.get('/', (req, res) => res.send(version()))

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
