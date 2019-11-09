import { Router } from "express";

export const authRouter = Router();

authRouter.get('/me', (req, res) => {
  res.send(req.mesh.requestUser)
})