import { UUID, Page } from "../model/common";
import { users } from "./users";

export interface EntityModels {
  createRequest: any;
  response: any;
}

export interface EntityFunctions<T extends EntityModels> {
  create(request: T["createRequest"]): Promise<T["response"]>;
  findAll(): Promise<Page<T["response"]>>;
  findByUuid(uuid: UUID): Promise<T["response"] | undefined>;
  delete(uuid: UUID): Promise<void>;
}

export const entityFunctionMap = {
  users
}