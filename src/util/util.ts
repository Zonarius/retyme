import { UUID, HasUuid, HasCreator, HasEditor, ISODate } from "../model/common";
import { placeHolderUuid } from "./dev";
import { Request } from "express-serve-static-core";

export interface MeshRequest<T> extends Request {
  body: T
}

export function randomUuid(): UUID {
  return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export function now(): ISODate {
  return new Date().toISOString();
}

export function createBase(): HasUuid & HasCreator & HasEditor {
  const created = now();
  const creator = { uuid: placeHolderUuid() };
  return {
    uuid: randomUuid(),
    created,
    creator,
    edited: created,
    editor: creator
  }
}

export function coalesce<T1, T2>(f1: () => T1, f2: () => T2): T1 | T2 | undefined {
  var value: any;
  for (const f of arguments) {
    value = f();
    if (value != null) {
      return value;
    }
  }
}