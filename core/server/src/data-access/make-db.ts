import mongoose from "mongoose";
import _ from "lodash";

async function makeDb() {
  const DATABASE_URL = makeDatabaseURL();
  const DATABASE_OPTIONS = makeDatabaseOptions();

  const is_not_connected = mongoose.connection.readyState == 0;
  if (is_not_connected) {
    await mongoose.connect(DATABASE_URL, DATABASE_OPTIONS);
    console.log("Successfully connected to DB");
  }

  return mongoose;
}

export function makeDatabaseURL(): string {
  const {
    MONGO_INITDB_ROOT_USERNAME = "admin",
    MONGO_INITDB_ROOT_PASSWORD = "Passw0rd",
    MONGO_INITDB_HOSTNAME = "localhost",
    MONGO_INITDB_PORT = 27017,
    MONGO_INITDB_DATABASE = "blog",
  } = process.env;
  const DATABASE_URL = `mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@${MONGO_INITDB_HOSTNAME}:${MONGO_INITDB_PORT}/${MONGO_INITDB_DATABASE}?authSource=blog`;

  return DATABASE_URL;
}

export function makeLogsDatabaseURL(): string {
  const DATABASE_URL = process.env.MONGO_INITDB_LOGS_DATABASE_URL;

  return DATABASE_URL || makeDatabaseURL();
}

export function makeDatabaseOptions() {
  const options = {
    connectTimeoutMS: 10000,
  };

  return options;
}

export default makeDb;
