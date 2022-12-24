import { MongoMemoryServer } from "mongodb-memory-server-core";

module.exports = async function () {
  const instance: MongoMemoryServer = (global as any).__MONGOD__;
  await instance.stop();
};
