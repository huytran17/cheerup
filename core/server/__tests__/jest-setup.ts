import Storage from "./jest-storage";
import { initializeMailer } from "./jest-mailer";
import Redis from "./jest-redis";
import { initializeMongod, connectDatabase } from "./jest-mongo";

module.exports = async function () {
  const mongo_not_initialized = !(global as any).__MONGOD__;

  if (mongo_not_initialized) {
    await initializeMongod();
  }

  connectDatabase().then(() => {
    new Storage();
    new Redis();
    initializeMailer();
  });
};
