import { MongoMemoryServer } from "mongodb-memory-server-core";
import { clearDatabase, closeConnection } from "../__tests__/jest-mongo";
import { redis } from "../__tests__/jest-redis";

export async function closeDatabaseConnection() {
  const mongod: MongoMemoryServer = (global as any).__MONGOD__;

  await clearDatabase();
  await closeConnection();
  await mongod.stop();
}

module.exports = async function ({
  watch,
  watchAll,
}: {
  watch?: () => Record<string, unknown>;
  watchAll?: () => Record<string, unknown>;
} = {}) {
  const is_not_watching = !watch && !watchAll;
  is_not_watching &&
    (await Promise.all([closeDatabaseConnection(), redis.disconnect()]));
};
