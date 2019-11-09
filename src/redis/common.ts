import { redis } from "./client";
import { UserResponse } from "../model/users";
import { UUID, EntityTypeName, Page } from "../model/common";
import { users } from "./users";

export interface EntityModels {
  createRequest: any;
  response: any;
}

export interface EntityFunctions<T extends EntityModels> {
  create(request: T["createRequest"]): Promise<T["response"]>;
  findAll(): Promise<Page<T["response"]>>;
  findByUuid(uuid: UUID): Promise<T["response"] | undefined>;
}

interface TypeResponseMap {
  "users": UserResponse;
}

export const entityFunctionMap = {
  users
}