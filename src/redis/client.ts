import * as red from 'redis';
import { HasUuid, UUID, EntityTypeName } from '../model/common';
import { promisify } from 'util';
const client = red.createClient();

export namespace redis {
  export const set = promisify(client.set).bind(client);
  export const get = promisify(client.get).bind(client);
  export const hget = promisify(client.hget).bind(client);
  export const hset = promisify(client.hset).bind(client);
  export const hvals = promisify(client.hvals).bind(client);

  export function setEntity(type: EntityTypeName, entity: HasUuid) {
    return hset(type, entity.uuid, JSON.stringify(entity));
  }

  export async function getEntities(type: EntityTypeName) {
    const vals = await hvals(type)
    return vals.map(parse);
  }

  export async function getEntityByUuid(type: EntityTypeName, uuid: UUID) {
    return hget(type, uuid).then(parse);
  }

  export async function script(scriptBody: string, ...args: string[]) {
    return new Promise((res, rej) => client.eval(scriptBody, args, (err, result) => {
      if (err) {
        rej(err);
      } else {
        res(result);
      }
    }))
  }

  export async function scriptJson(scriptBody: string, ...args: string[]) {
    return script(scriptBody, args.length.toString(), ...args).then(parse);
  }

  export async function getIndirectEntity(type: EntityTypeName, key: string) {
    return redis.scriptJson(`
      local uuid = redis.call('get', KEYS[2]);
      return redis.call('hget', KEYS[1], uuid);
    `, type, key)
  }
}

function parse(obj: any) {
  return JSON.parse(obj);
}