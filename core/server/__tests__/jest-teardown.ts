import { MongoMemoryServer } from "mongodb-memory-server-core";
import { clearDatabase, closeConnection } from "../__tests__/jest-mongo";

module.exports = async function ({
  watch,
  watchAll,
}: {
  watch?: () => Record<string, unknown>;
  watchAll?: () => Record<string, unknown>;
} = {}) {
  const notWatching = !watch && !watchAll;
  if (notWatching) {
    const mongo_instance: MongoMemoryServer = (global as any).__MONGOD__;
    await clearDatabase();
    await closeConnection();
    await mongo_instance.stop();
  }
};
