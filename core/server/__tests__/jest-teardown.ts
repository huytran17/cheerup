import { MongoMemoryServer } from "mongodb-memory-server-core";

module.exports = async function () {
  const mongo_instance: MongoMemoryServer = (global as any).__MONGOD__;
  await mongo_instance.stop();
};
