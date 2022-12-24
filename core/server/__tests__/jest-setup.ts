import Storage from "./jest-storage";
import { initializeMailer } from "./jest-mailer";
import Redis from "./jest-redis";
import { mongod, connectDatabase } from "./jest-mongo";

module.exports = async function () {
  const mongoNotInitialized = (global as any).__MONGOD__;

  if (mongoNotInitialized) {
    connectDatabase().then(() => {
      new Storage();
      new Redis();
      initializeMailer();
    });
  }

  (global as any).__MONGOD__ = mongod;
};
