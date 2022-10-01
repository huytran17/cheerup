import mongoose from "mongoose";
import _ from "lodash";
// import audit from "./db-audit";

async function makeDb() {
  const DATABASE_URL = makeDatabaseURL();
  const DATABASE_OPTIONS = makeDatabaseOptions();

  const is_not_connected = mongoose.connection.readyState == 0;
  if (is_not_connected) {
    console.log("Setting up database...");
    await mongoose.connect(DATABASE_URL, DATABASE_OPTIONS);
    console.log("Successfully connected to DB");
  }
  // mongoose.set("debug", audit)

  return mongoose;
}

export function makeDatabaseURL(): string {
  const {
    MONGO_USERNAME = "admin",
    MONGO_PASSWORD = "Passw0rd",
    MONGO_HOSTNAME = "localhost",
    MONGO_PORT = 27017,
    MONGO_DB = "blog",
  } = process.env;
  const DATABASE_URL =
    process.env.MONGO_URL ||
    `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

  return DATABASE_URL;
}

export function makeLogsDatabaseURL(): string {
  const DATABASE_URL = process.env.LOGS_DATABASE_URL;

  return DATABASE_URL || makeDatabaseURL();
}

export function makeDatabaseOptions() {
  const options = {
    useNewUrlParser: true,
    connectTimeoutMS: 10000,
    useUnifiedTopology: true,
    // useFindAndModify: false,
    // useCreateIndex: true,
  };

  return options;
}

export default makeDb;
