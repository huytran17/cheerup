import Storage from "./jest-storage";
import { initializeMailer } from "./jest-mailer";
import Redis from "./jest-redis";
import { mongod, connectDatabase } from "./jest-mongo";

module.exports = async function () {
  const mongo_not_initialized = (global as any).__MONGOD__;

  if (mongo_not_initialized) {
    connectDatabase().then(() => {
      new Storage();
      new Redis();
      initializeMailer();
    });
  }

  (global as any).__MONGOD__ = mongod;
};
