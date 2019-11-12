import * as bcrypt from 'bcrypt';

import { redis } from "./client";
import { CreateUserRequest, DbUser, UserResponse } from "../model/users";
import { createBase } from "../util/util";
import { Page, UUID } from "../model/common";
import { fullPage } from "../util/dev";
import { EntityFunctions, EntityModels } from "./common";

interface UserModels extends EntityModels {
  createRequest: CreateUserRequest;
  response: UserResponse;
}

export const users: EntityFunctions<UserModels> = {
  async create(request: CreateUserRequest) {
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
  
    return user as any;
  },
  async findAll() {
    const vals = await redis.getEntities("users");
    return fullPage(vals);
  },
  async findByUuid(uuid: UUID) {
    return redis.getEntityByUuid("users", uuid);
  },
  async delete() {

  }
}

export async function getUserByName(name: string): Promise<UserResponse | undefined> {
  return redis.getIndirectEntity("users", `user.byname:${name}`)
}