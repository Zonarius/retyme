import { redis } from "./client";
import { CreateUserRequest, DbUser, UserResponse } from "../model/users";
import { createBase } from "../util/util";
import { Page } from "../model/common";
import { fullPage } from "../util/dev";

export async function createUser(request: CreateUserRequest) {
  const user: DbUser = {
    username: request.username,
    enabled: true,
    forcedPasswordChange: false,
    ...createBase()
  }

  await Promise.all([
    redis.setEntity("users", user),
    redis.set(`user.byname:${user.username}`, user.uuid)
  ]);

  return user;
}

export async function getUsers(): Promise<Page<UserResponse>> {
  const vals = await redis.getEntities("users");
  return fullPage(vals);
}

export async function getUserByName(name: string): Promise<UserResponse | null> {
  return redis.getIndirectEntity("users", `user.byname:${name}`)
}