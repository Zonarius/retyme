import { Router } from "express";
import { createUser, getUsers } from "../../redis/users";
import { json } from "express";

export const usersRouter = Router();

usersRouter.get(`/`, async (req, res) => {
  res.send(await getUsers());
})

usersRouter.post(`/`, json(), async (req, res) => {
  res.send(await createUser(req.body));
})
