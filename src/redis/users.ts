import * as bcrypt from 'bcrypt';

import { redis } from "./client";
import { CreateUserRequest, DbUser, UserResponse } from "../model/users";
import { createBase } from "../util/util";
import { Page, UUID } from "../model/common";
import { fullPage, placeHolderCommonPermissions } from "../util/dev";
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
      password: await bcrypt.hash(request.password, 10),
      ...createBase()
    }

    await Promise.all([
      redis.setEntity("users", user),
      redis.set(`user.byname:${user.username}`, user.uuid)
    ]);
  
    return toUserResponse(user);
  },
  async findAll() {
    const vals = await redis.getEntities("users");
    return fullPage(vals);
  },
  async findByUuid(uuid: UUID) {
    return toUserResponse(await redis.getEntityByUuid("users", uuid));
  },
  async delete() {

  }
}

export function toUserResponse(user: DbUser): UserResponse {
  const {password, ...rest} = user;
  return {
    ...rest,
    rolesHash: "someHash",
    groups: [],
    permissions: placeHolderCommonPermissions()
  };
}

export async function getUserByName(name: string): Promise<DbUser | undefined> {
  return redis.getIndirectEntity("users", `user.byname:${name}`)
}