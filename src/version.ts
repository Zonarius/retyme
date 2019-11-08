import { RequestHandler } from "express";

export interface VersionResponse {
  meshVersion: string;
  meshNodeName: string;
  databaseVendor: "redis";
  databaseVersion: string;
}

export const handleVersion: RequestHandler = (req, res) => {
  res.send(version())
};

function version(): VersionResponse {
  return {
    meshVersion: "1.1.0",
    meshNodeName: "FIXME",
    databaseVendor: "redis",
    databaseVersion: "???"
  }
}