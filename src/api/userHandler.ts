import { Router } from "express";
import { getUserByName } from "../redis/users";

export const userHandler = Router();

userHandler.use(async (req, res, next) => {
  const user = await getUserByName('anonymous');
  if (!user) {
    console.error(`Could not find anonymous user`)
    res.sendStatus(500);
    return;
  }
  req.mesh.requestUser = user;
  next();
})