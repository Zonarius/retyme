import { redis } from "./client";
import { CreateUserRequest, DbUser, UserResponse } from "../model/users";
import { createBase } from "../util/util";
import { Page } from "../model/common";
import { fullPage } from "../util/dev";

export async function createUser(request: CreateUserRequest) {
  const user: DbUser = {
    ...createBase(),
    username: request.username,
    enabled: true,
    forcedPasswordChange: false
  }

  await redis.setEntity("users", user);

  return user;
}

export async function getUsers(): Promise<Page<UserResponse>> {
  const vals = await redis.getEntities("users");
  return fullPage(vals);
}