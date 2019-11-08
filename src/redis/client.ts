import * as red from 'redis';
import { HasUuid } from '../model/common';
import { promisify } from 'util';
const client = red.createClient();
const set = promisify(client.set).bind(client);
const hset = promisify(client.hset).bind(client);
const hvals = promisify(client.hvals).bind(client);

export type EntityTypeName = "users";

export namespace redis {
  export function setEntity(hashKey: EntityTypeName, entity: HasUuid) {
    return hset(hashKey, entity.uuid, JSON.stringify(entity));
  }

  export async function getEntities(hashKey: EntityTypeName) {
    const vals = await hvals(hashKey)
    return vals.map(s => JSON.parse(s));
  }
}
