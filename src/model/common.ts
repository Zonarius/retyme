export type UUID = string;
export type ISODate = string;

export interface HasUuid {
  uuid: UUID;
}

export interface HasName {
  name: string;
}

export interface HasCreator {
  creator: HasUuid;
  created: ISODate;
}

export interface HasEditor {
  editor: HasUuid;
  edited: ISODate;
}

export type NamedEntity = HasUuid & HasName;

export type GroupReference = NamedEntity;

export interface MeshEntity extends HasUuid, HasCreator, HasEditor {}

export const commonPermissionTypes = ["create", "read", "update", "delete"] as const;
export const nodePermissionTypes = [...commonPermissionTypes, "readPublished", "publish"] as const;

export type CommonPermissions = {
  [K in (typeof commonPermissionTypes)[number]]: boolean
}

export type NodePermissions = {
  [K in (typeof nodePermissionTypes)[number]]: boolean
}

export interface Page<T> {
  data: T[];
  _metainfo: {
    currentPage: number;
    pageCount: number;
    totalCount: number;
  }
}
