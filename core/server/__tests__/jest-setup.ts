import { initializeMailer } from "./jest-mailer";
import { connectDatabase, initializeMongod } from "./jest-mongo";
import Redis from "./jest-redis";
import Storage from "./jest-storage";

module.exports = async function () {
  const mongo_not_initialized = !(global as any).__MONGOD__;

  mongo_not_initialized && (await initializeMongod());

  connectDatabase().then(() => {
    console.log("Successfully connected to Mongo Database");

    Storage.getS3();
    Redis.getInstance();
    initializeMailer();
  });
};
