import { UUID, ISODate, MeshEntity, CommonPermissions, Page } from "../model/common";

export function placeHolderUuid(): UUID {
  return "someUuid";
}

export function placeHolderDate(): ISODate {
  return "2019-11-08T22:37:34+01:00";
}

export function placeHolderMeshEntity(): MeshEntity {
  return {
    uuid: placeHolderUuid(),
    editor: { uuid: placeHolderUuid() },
    edited: placeHolderDate(),
    creator: { uuid: placeHolderUuid() },
    created: placeHolderDate()
  }
}

export function placeHolderCommonPermissions(): CommonPermissions {
  return {
    create: false,
    read: true,
    delete: false,
    update: false
  }
}

export function emptyPage<T>(): Page<T> {
  return {
    data: [],
    _metainfo: {
      currentPage: 1,
      pageCount: 0,
      totalCount: 0
    }
  }
}

export function fullPage<T>(items: T[]): Page<T> {
  return {
    data: items,
    _metainfo: {
      currentPage: 1,
      pageCount: 1,
      totalCount: items.length
    }
  }
}