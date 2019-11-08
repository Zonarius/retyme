import { Router } from "express";
import { placeHolderMeshEntity, placeHolderCommonPermissions } from "../../util/dev";
import { UserResponse } from "../../model/users";

export const authRouter = Router();

authRouter.get('/me', (req, res) => {
  res.send(me())
})

function me(): UserResponse {
  return {
    ...placeHolderMeshEntity(),
    username: "anonymous",
    rolesHash: "someHash",
    forcedPasswordChange: false,
    permissions: placeHolderCommonPermissions(),
    enabled: true,
    groups: []
  }
}