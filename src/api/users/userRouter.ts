import { Router } from "express";
import { emptyPage } from "../../util/dev";
import { createUser, getUsers } from "../../redis/users";
import { json } from "body-parser";

export const usersRouter = Router();

usersRouter.get(`/`, async (req, res) => {
  res.send(await getUsers());
})

usersRouter.post(`/`, json(), async (req, res) => {
  res.send(await createUser(req.body));
})