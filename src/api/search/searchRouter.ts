import { Router } from "express";

export const searchRouter = Router();

searchRouter.get('/status', (req, res) => {
  res.send({
    available: false
  })
})