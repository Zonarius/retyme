import { createUser } from "./redis/users";
import { randomUuid } from "./util/util";
import { redis } from "./redis/client";

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
    createUser({
      username: "admin",
      password: "admin"
    }),
    createUser({
      username: "anonymous",
      password: randomUuid()
    })
  ]);
}

function finish() {
  return redis.set("bootstrapped", "true");
}