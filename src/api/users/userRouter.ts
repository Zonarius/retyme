import { Router } from "express";
import { emptyPage } from "../../util/dev";

export const usersRouter = Router();

usersRouter.get(`/`, (req, res) => {
  res.send(emptyPage());
})

usersRouter.post(`/`, (req, res) => {
  console.log("Creating user")
  res.send();
})