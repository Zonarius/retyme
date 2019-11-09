import { randomUuid } from "./util/util";
import { redis } from "./redis/client";
import { users } from "./redis/users";

export async function initMesh() {
  if (await alreadyExists()) {
    return;
  }

  console.log("Bootstrapping mesh...")

  await createUsers()
  await finish();
  console.log("Bootstrapping mesh done!")
}

async function alreadyExists() {
  return redis.get("bootstrapped").then(val => val === "true")
}

function createUsers() {
  return Promise.all([
    users.create({
      username: "admin",
      password: "admin"
    }),
    users.create({
      username: "anonymous",
      password: randomUuid()
    })
  ]);
}

function finish() {
  return redis.set("bootstrapped", "true");
}