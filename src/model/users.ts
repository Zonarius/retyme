import { MeshEntity, GroupReference, CommonPermissions } from "./common";

export interface UserResponse extends MeshEntity {
  username: string;
  enabled: boolean;
  rolesHash: string;
  groups: GroupReference[]
  forcedPasswordChange: boolean;
  permissions: CommonPermissions;
}

export interface CreateUserRequest {
  username: string;
  password: string;
}